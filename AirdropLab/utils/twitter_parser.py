from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timezone
import time
import json
import os
import subprocess
import traceback
import urllib.parse
import re
import requests
from bs4 import BeautifulSoup

# ===========================
# НАСТРОЙКИ
# ===========================

TWITTER_MONITOR_CONFIG = {
    'alze': {
        'username': '0xAlze',
        'zone': 'nft_alze',
        'triggerText': 'NFT on Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    }
}

GITHUB_REPO_PATH = r"C:\Users\mykol\Worklaf\AirdropLab"
YOUR_WEBSITE_URL = "https://worklaf.github.io/Worklaf/AirdropLab/guides/Arc/Arc_Testnet_by_Circle.html"
YOUR_JSON_URL = "https://raw.githubusercontent.com/Worklaf/Worklaf/refs/heads/main/AirdropLab/guides/Arc/arc_shared_items.json"

# ⚡ УСКОРЕННЫЕ НАСТРОЙКИ
SCROLL_PAUSE = 2
MAX_SCROLLS = 3
LOGIN_TIMEOUT = 90
CONSECUTIVE_DUPES_THRESHOLD = 1  # 🆕 Останавливаемся после 1 дубликата

MINT_DOMAINS = [
    'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
    'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
    'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
]

# ===========================
# 🎨 ЛОГОТИП
# ===========================

def show_logo():
    logo = """
    ╔═══════════════════════════════════════════════════════════════════════════╗
    ║                                                                           ║
    ║      🐦 Twitter NFT Parser for Arc Testnet                               ║
    ║      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                               ║
    ║      ⚡ Быстрый режим | 🔍 Smart фильтрация | 🚀 Auto GitHub            ║
    ║                                                                           ║
    ╚═══════════════════════════════════════════════════════════════════════════╝
    """
    print(logo)

def normalize_url(url):
    """Нормализация URL для проверки дубликатов: lowercase, без протокола/www/слэшей/query."""
    if not url:
        return ''
    url = re.sub(r'^https?://', '', url.lower())
    url = re.sub(r'^www\.', '', url)
    url = re.sub(r'[\?#].*$', '', url)
    url = url.rstrip('/')
    return url

def load_existing_nfts():
    """
    Загрузка существующих NFT из двух источников:
    1. HTML-страница сайта (YOUR_WEBSITE_URL)
    2. JSON-файл с shared items (YOUR_JSON_URL)
    """
    mint_links = set()

    print("\n🔍 Загрузка существующих NFT...")

    # ─── Источник 1: HTML-страница ───────────────────────────────
    try:
        response = requests.get(YOUR_WEBSITE_URL, timeout=8)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        nft_section = soup.find('div', {'data-section-zone': 'nfts'}) or soup

        for a in nft_section.find_all('a', href=True):
            href = a['href']
            if not href:
                continue
            normalized = normalize_url(href)
            if normalized and any(domain in normalized for domain in MINT_DOMAINS):
                mint_links.add(normalized)

    except Exception as e:
        print(f"⚠️ HTML загрузка: {e}")

    # ─── Источник 2: JSON-файл (arc_shared_items.json) ──────────
    try:
        response = requests.get(YOUR_JSON_URL, timeout=8)
        response.raise_for_status()
        data = response.json()
        
        def extract_links_from_value(value):
            if isinstance(value, str):
                normalized = normalize_url(value)
                if normalized and any(domain in normalized for domain in MINT_DOMAINS):
                    mint_links.add(normalized)
            elif isinstance(value, (list, dict)):
                for v in value.values() if isinstance(value, dict) else value:
                    extract_links_from_value(v)

        extract_links_from_value(data)

    except Exception as e:
        print(f"⚠️ JSON загрузка: {e}")

    print(f"✅ Загружено {len(mint_links)} существующих NFT\n")
    return mint_links

def expand_tco(url, timeout=3):
    """Разворачиваем t.co ссылку через HEAD-запрос."""
    try:
        resp = requests.head(url, allow_redirects=True, timeout=timeout)
        return resp.url
    except:
        return url

def extract_mint_links_from_tweet(tweet_element, existing_nfts_set):
    """Извлекает уникальные (новые) ссылки из твита, учитывая дубликаты."""
    mint_links = set()
    new_links = set()

    # Парсинг ссылок из <a href>
    try:
        links = tweet_element.find_elements(By.CSS_SELECTOR, 'a[href]')
        for link in links:
            href = link.get_attribute('href')
            if href and 't.co' in href:
                expanded = expand_tco(href)
                normalized = normalize_url(expanded)
                if normalized and any(domain in normalized for domain in MINT_DOMAINS):
                    mint_links.add(normalized)
            elif href and any(domain in href for domain in MINT_DOMAINS):
                mint_links.add(normalize_url(href))
    except:
        pass

    # Парсинг ссылок из текста твита (fallback)
    try:
        text_elem = tweet_element.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
        tweet_text = text_elem.text.lower()

        patterns = [
            r'(https?://(?:alze\.xyz|caset\.network|draze\.io|arklelab\.xyz|mintaura\.io|oku\.xyz|clarachain\.net|morkie\.xyz|nfts2me\.com|omnihub\.xyz|nft\.arc\.market|arc\.market)(?:/[^\s\)\]]*)?)',
            r'(0x[a-fA-F0-9]{40})',
        ]

        for pattern in patterns:
            matches = re.findall(pattern, tweet_text)
            for match in matches:
                if isinstance(match, tuple):
                    link = match[0]
                else:
                    link = match

                normalized = normalize_url(link)
                if normalized and any(domain in normalized for domain in MINT_DOMAINS):
                    mint_links.add(normalized)
    except:
        pass

    # Фильтрация: только новые ссылки
    for link in mint_links:
        if link not in existing_nfts_set:
            new_links.add(link)

    return list(new_links), len(new_links) > 0

def get_all_links_from_tweet_text(text):
    """Извлекает все ссылки из текста твита для проверки дубликатов."""
    links = []
    patterns = [
        r'(https?://[^\s\)\]]+)',
        r'((?:www\.)?(?:alze\.xyz|caset\.network|draze\.io|arklelab\.xyz|mintaura\.io|oku\.xyz|clarachain\.net|morkie\.xyz|nfts2me\.com|omnihub\.xyz|nft\.arc\.market|arc\.market)(?:/[^\s\)\]]*)?)',
    ]

    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple):
                link = match[0] if match[0] else match[1]
            else:
                link = match

            if not link.startswith('http'):
                link = 'https://' + link
            links.append(link)

    return links

# ===========================
# ОСНОВНЫЕ ФУНКЦИИ
# ===========================

def setup_driver():
    """Настройка Edge WebDriver"""
    print("🚀 Настройка Edge...")

    options = Options()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    user_data_dir = os.path.join(os.getcwd(), "edge_profile")
    options.add_argument(f"user-data-dir={user_data_dir}")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    
    # 🖼️ ЯВНО ВКЛЮЧАЕМ ИЗОБРАЖЕНИЯ
    prefs = {
        "profile.managed_default_content_settings.images": 0,  # 0 = разрешено, 2 = блокировать
        "profile.default_content_setting_values.media_stream": 0,
        "profile.default_content_setting_values.notifications": 2,
    }
    options.add_experimental_option("prefs", prefs)

    driver = webdriver.Edge(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_cdp_cmd('Network.setUserAgentOverride', {
        "userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    })

    return driver

def login_to_twitter(driver):
    """Проверка авторизации"""
    print("\n🔐 Проверка Twitter...")

    try:
        driver.get("https://twitter.com/home")
        time.sleep(2)

        try:
            WebDriverWait(driver, 3).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="SideNav_NewTweet_Button"]'))
            )
            print("✅ Залогинен!\n")
            return True
        except:
            print(f"⏳ Требуется логин (таймаут: {LOGIN_TIMEOUT} сек)\n")

            start_time = time.time()
            while time.time() - start_time < LOGIN_TIMEOUT:
                try:
                    driver.find_element(By.CSS_SELECTOR, '[data-testid="SideNav_NewTweet_Button"]')
                    print("\n✅ Вход выполнен!\n")
                    time.sleep(1)
                    return True
                except:
                    remaining = int(LOGIN_TIMEOUT - (time.time() - start_time))
                    print(f"⏳ {remaining} сек...", end='\r')
                    time.sleep(2)

            print("\n❌ Таймаут логина!")
            return False

    except Exception as e:
        print(f"❌ Ошибка логина: {e}")
        return False

def parse_tweet_time(datetime_str):
    """Конвертация времени в формат '4d', '12h', '30m'"""
    try:
        tweet_time = datetime.fromisoformat(datetime_str.replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        diff = now - tweet_time

        days = diff.days
        hours = diff.seconds // 3600
        minutes = (diff.seconds % 3600) // 60

        if days > 0:
            return f"{days}d"
        elif hours > 0:
            return f"{hours}h"
        else:
            return f"{minutes}m" if minutes > 0 else "just now"
    except:
        return "Unknown"

# ===========================
# 🔥 ПАРСЕР ТВИТОВ (МИНИМАЛИСТИЧНЫЙ)
# ===========================

def search_tweets_by_user(driver, project_key, config, existing_nfts_set):
    username = config['username']
    trigger_text = config['triggerText'].lower()
    search_keywords = config.get('searchKeywords', 'Free Mint NFT on Arc Testnet')
    zone = config['zone']

    print(f"🔍 Поиск: @{username} | '{search_keywords}'")

    search_query = f"from:{username} {search_keywords}"
    encoded_query = urllib.parse.quote(search_query)
    search_url = f"https://twitter.com/search?q={encoded_query}&f=live"
    driver.get(search_url)
    time.sleep(2)

    nfts = []
    seen_tweet_urls = set()
    skipped_no_new_links = 0
    consecutive_duplicates = 0
    scrolls = 0

    while scrolls < MAX_SCROLLS:
        tweets = []
        try:
            tweets = driver.find_elements(By.CSS_SELECTOR, 'article[data-testid="tweet"]')
        except:
            pass

        if not tweets:
            break

        for idx, tweet in enumerate(tweets):
            try:
                time_elem = tweet.find_element(By.TAG_NAME, "time")
                link_elem = time_elem.find_element(By.XPATH, "./ancestor::a")
                tweet_url = link_elem.get_attribute("href")
                if tweet_url in seen_tweet_urls:
                    continue
                seen_tweet_urls.add(tweet_url)

                try:
                    text_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
                    tweet_text = text_elem.text
                except:
                    continue

                if trigger_text not in tweet_text.lower():
                    continue

                try:
                    author_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="User-Name"] a[role="link"]')
                    author_handle = author_elem.get_attribute("href").split('/')[-1]
                    if author_handle.lower() != username.lower():
                        continue
                except:
                    continue

                mint_links, has_new_links = extract_mint_links_from_tweet(tweet, existing_nfts_set)

                if not has_new_links:
                    skipped_no_new_links += 1
                    consecutive_duplicates += 1
                    
                    # 🆕 ОСТАНАВЛИВАЕМСЯ ПОСЛЕ ПЕРВОГО ДУБЛИКАТА
                    if consecutive_duplicates >= CONSECUTIVE_DUPES_THRESHOLD:
                        print(f"⏭️  Найден дубликат. Переход к следующему проекту.")
                        return nfts, skipped_no_new_links
                    
                    continue
                
                consecutive_duplicates = 0

                try:
                    datetime_str = time_elem.get_attribute("datetime")
                    time_ago = parse_tweet_time(datetime_str)
                except:
                    time_ago, datetime_str = "Unknown", ""

                likes = 0
                try:
                    likes_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="like"]')
                    likes_label = likes_elem.get_attribute("aria-label") or ""
                    likes = int(''.join(filter(str.isdigit, likes_label))) if likes_label else 0
                except:
                    pass

                retweets = 0
                try:
                    rt_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="retweet"]')
                    rt_label = rt_elem.get_attribute("aria-label") or ""
                    retweets = int(''.join(filter(str.isdigit, rt_label))) if rt_label else 0
                except:
                    pass

                all_found_mint_links_in_tweet = [
                    normalize_url(link)
                    for link in get_all_links_from_tweet_text(tweet_text)
                    if any(domain in normalize_url(link) for domain in MINT_DOMAINS)
                ]

                nft_data = {
                    "project": project_key,
                    "twitter": username,
                    "zone": zone,
                    "text": tweet_text,
                    "url": tweet_url,
                    "time_ago": time_ago,
                    "datetime": datetime_str,
                    "likes": likes,
                    "retweets": retweets,
                    "triggerText": config['triggerText'],
                    "mint_links": all_found_mint_links_in_tweet
                }
                nfts.append(nft_data)
                print(f"   ✅ НОВЫЙ NFT: {all_found_mint_links_in_tweet[0][:60]}... | {time_ago} | ❤️ {likes} | 🔁 {retweets}")

            except:
                continue

        scrolls += 1
        if scrolls < MAX_SCROLLS:
            driver.execute_script("window.scrollBy(0, 4000);")
            time.sleep(SCROLL_PAUSE)

    if nfts:
        print(f"✅ Найдено НОВЫХ: {len(nfts)}")
    else:
        print(f"⏭️  Новых NFT не найдено")
    
    return nfts, skipped_no_new_links

# ===========================
# ✅ СОХРАНЕНИЕ
# ===========================

def save_results(nfts, filename):
    """Сохраняет NFT в JSON"""
    result = {
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "total": len(nfts),
        "nfts": nfts
    }
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Сохранено: {filename}")
    except Exception as e:
        print(f"❌ Ошибка сохранения: {e}")

# ===========================
# 🔧 GIT УПРАВЛЕНИЕ
# ===========================

def run_git_command(cmd_list, cwd=None, timeout=30, capture_output=True):
    try:
        result = subprocess.run(cmd_list, cwd=cwd, timeout=timeout,
                                capture_output=capture_output,
                                text=True, encoding='utf-8', errors='replace')
        return result
    except subprocess.TimeoutExpired:
        return subprocess.CompletedProcess(cmd_list, 1, stdout='', stderr='Timeout')
    except Exception as e:
        return subprocess.CompletedProcess(cmd_list, 1, stdout='', stderr=str(e))

def upload_to_github():
    if not os.path.exists(GITHUB_REPO_PATH):
        print(f"❌ GitHub папка не найдена")
        return False

    try:
        import shutil

        original_dir = os.getcwd()
        local_results_file = os.path.join(original_dir, "twitter_results.json")
        
        if not os.path.exists(local_results_file):
            print(f"❌ Файл не найден")
            return False

        target = os.path.join(GITHUB_REPO_PATH, "guides", "Arc", "twitter_results.json")
        os.chdir(GITHUB_REPO_PATH)

        status_result = run_git_command(["git", "status", "--porcelain"])
        if "AA" in status_result.stdout or "UU" in status_result.stdout:
            run_git_command(["git", "merge", "--abort"], timeout=10)

        run_git_command(["git", "reset", "--hard", "HEAD"], timeout=10)
        
        pull_result = run_git_command(["git", "pull", "origin", "main"], timeout=30)
        if pull_result.returncode != 0:
            run_git_command(["git", "fetch", "origin", "main"], timeout=30)
            run_git_command(["git", "reset", "--hard", "origin/main"], timeout=10)

        shutil.copy2(local_results_file, target)

        result = run_git_command(["git", "status", "--porcelain", "guides/Arc/twitter_results.json"])
        if not result.stdout:
            print("   ℹ️  Нет изменений")
            os.chdir(original_dir)
            return True

        run_git_command(["git", "add", "guides/Arc/twitter_results.json"])

        commit_msg = f"🐦 NFT update {datetime.now().strftime('%d.%m %H:%M')}"
        commit_result = run_git_command(["git", "commit", "-m", commit_msg])
        
        if commit_result.returncode != 0:
            if "nothing to commit" in (commit_result.stdout + commit_result.stderr):
                os.chdir(original_dir)
                return True

        push_result = run_git_command(["git", "push", "origin", "main"])
        os.chdir(original_dir)
        
        if push_result.returncode == 0:
            print("✅ Загружено на GitHub!")
            return True
        else:
            print(f"❌ Push failed")
            return False

    except Exception as e:
        print(f"❌ Ошибка GitHub: {e}")
        try:
            os.chdir(original_dir)
        except:
            pass
        return False

# ===========================
# 🔥 ГЛАВНАЯ ФУНКЦИЯ
# ===========================

def main():
    show_logo()

    existing_nfts = load_existing_nfts()
    total_skipped = 0
    driver = None
    all_nfts = []

    try:
        driver = setup_driver()

        if not login_to_twitter(driver):
            print("\n❌ Не удалось войти в Twitter")
            return

        total_projects = len(TWITTER_MONITOR_CONFIG)
        for idx, (project_key, config) in enumerate(TWITTER_MONITOR_CONFIG.items(), 1):
            print(f"\n[{idx}/{total_projects}] {project_key}")
            try:
                nfts, skipped = search_tweets_by_user(driver, project_key, config, existing_nfts)
                all_nfts.extend(nfts)
                total_skipped += skipped

                for nft_item in nfts:
                    for link in nft_item.get('mint_links', []):
                        normalized = normalize_url(link)
                        if normalized:
                            existing_nfts.add(normalized)

                time.sleep(0.5)

            except Exception as e:
                print(f"❌ Ошибка: {e}")
                continue

        all_nfts.sort(key=lambda x: x.get('datetime', ''), reverse=True)

        output_filename = "twitter_results.json"
        save_results(all_nfts, output_filename)

        print("\n📤 Загрузка на GitHub...")
        upload_to_github()

        print(f"\n✅ ГОТОВО! Найдено: {len(all_nfts)} NFT")

    except KeyboardInterrupt:
        print("\n⚠️  Прервано")
    except Exception as e:
        print(f"\n❌ Ошибка: {e}")
    finally:
        if driver:
            driver.quit()
        input("\n✅ Enter для выхода...")

if __name__ == "__main__":
    main()
