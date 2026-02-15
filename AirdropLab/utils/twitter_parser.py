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
    'morkie': {
        'username': '_morkie',
        'zone': 'nft_morkie',
        'triggerText': 'Mint Free NFT On Arc Testnet',
        'searchKeywords': 'Mint Free NFT On Arc Testnet'
    },
    'clara': {
        'username': 'clarachainxyz',
        'zone': 'nft_clara',
        'triggerText': 'Free Mint NFT on Arc Testnet',
        'searchKeywords': 'Free Mint NFT on Arc Testnet'
    },
    'oku': {
        'username': 'OKUXYZ',
        'zone': 'nft_oku',
        'triggerText': 'NFT On Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'mintaura': {
        'username': 'MintAura',
        'zone': 'nft_mintaura',
        'triggerText': 'Mint Free Nft on Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'arkle': {
        'username': '0xarkle',
        'zone': 'nft_arkle',
        'triggerText': 'NFT On Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'draze': {
        'username': 'DrazeLab',
        'zone': 'nft_draze',
        'triggerText': 'NFT On Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'caset': {
        'username': 'casetnetwork',
        'zone': 'nft_caset',
        'triggerText': 'Mint Free NFT On ARC Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'alze': {
        'username': '0xAlze',
        'zone': 'nft_alze',
        'triggerText': 'NFT on Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    }
}

GITHUB_REPO_PATH = r"C:\Users\mykol\Worklaf\TestNet_Hub"
YOUR_WEBSITE_URL = "https://worklaf.github.io/Worklaf/TestNet_Hub/Arc_Testnet_by_Circle.html"
SCROLL_PAUSE = 5
MAX_SCROLLS = 1
LOGIN_TIMEOUT = 90

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
    """Загрузка существующих NFT с сайта"""
    try:
        print("\n" + "="*60)
        print("🔍 Загрузка существующих NFT с сайта")
        print("="*60)
        print(f"🌐 URL: {YOUR_WEBSITE_URL}")

        response = requests.get(YOUR_WEBSITE_URL, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Fallback: если секция не найдена, парсим весь HTML
        nft_section = soup.find('div', {'data-section-zone': 'nfts'}) or soup
        mint_links = set()

        # Ищем все ссылки, попадающие под наши домены
        for a in nft_section.find_all('a', href=True):
            href = a['href']
            if not href:
                continue
            normalized = normalize_url(href)
            if normalized and any(domain in normalized for domain in [
                'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
                'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
                'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
            ]):
                mint_links.add(normalized)

        print(f"✅ Найдено существующих NFT: {len(mint_links)}")
        if mint_links:
            print("📝 Примеры:")
            for link in list(mint_links)[:5]:
                print(f"   - {link}")
            if len(mint_links) > 5:
                print(f"   ... и ещё {len(mint_links) - 5}")
        return mint_links

    except Exception as e:
        print(f"⚠️ Не удалось загрузить существующие NFT: {e}")
        return set()

def expand_tco(url, timeout=5):
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
    found_duplicates = 0

    # Парсинг ссылок из <a href>
    try:
        links = tweet_element.find_elements(By.CSS_SELECTOR, 'a[href]')
        for link in links:
            href = link.get_attribute('href')
            if href and 't.co' in href:
                expanded = expand_tco(href)
                normalized = normalize_url(expanded)
                if normalized and any(domain in normalized for domain in [
                    'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
                    'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
                    'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
                ]):
                    mint_links.add(normalized)
            elif href and any(domain in href for domain in [ # Добавляем прямые ссылки
                    'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
                    'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
                    'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
                ]):
                mint_links.add(normalize_url(href))
    except Exception as e:
        print(f"   ❌ Ошибка парсинга ссылок: {e}")

    # Парсинг ссылок из текста твита (fallback)
    try:
        text_elem = tweet_element.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
        text = text_elem.text.lower()
        patterns = [
            r'(alze\.xyz/?)([a-zA-Z0-9\-_/]+)',
            r'(caset\.network/?)([a-zA-Z0-9\-_/]+)',
            r'(draze\.io/?)([a-zA-Z0-9\-_/]+)',
            r'(arklelab\.xyz/?)([a-zA-Z0-9\-_/]+)',
            r'(mintaura\.io/?)([a-zA-Z0-9\-_/]+)',
            r'(oku\.xyz/?)([a-zA-Z0-9\-_/]+)',
            r'(clarachain\.net/?)([a-zA-Z0-9\-_/]+)',
            r'(morkie\.xyz/?)([a-zA-Z0-9\-_/]+)',
            r'(nfts2?me\.com?/?.*)',
            r'(omnihub\.xyz/collection/arc-testnet/[a-zA-Z0-9\-_/]+)',
            r'(nft\.arc\.market/mint/[^\s\)\]]+)',
            r'(arc\.market/mint/[^\s\)\]]+)',
            r'(0x[a-fA-F0-9]{40})',
        ]
        for pattern in patterns:
            matches = re.findall(pattern, text)
            for match in matches:
                path = match[1] if isinstance(match, tuple) and len(match) > 1 else match[0]
                normalized = normalize_url(f"https://{path}")
                if normalized and any(domain in normalized for domain in [
                    'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
                    'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
                    'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
                ]):
                    mint_links.add(normalized)
    except Exception as e:
        print(f"   ❌ Ошибка парсинга текста: {e}")

    # Фильтрация: только новые ссылки
    for link in mint_links:
        if link not in existing_nfts_set:
            new_links.add(link)
        else:
            found_duplicates += 1
            # print(f"   ⚠️ Дубликат найден: {link} — пропускаем ссылку") # Отключено, чтобы не загромождать вывод
            
    if len(mint_links) > 0:
        print(f"   ℹ️  Найдено всего ссылок: {len(mint_links)}, из них новых: {len(new_links)}, дубликатов: {found_duplicates}")

    return list(new_links), len(new_links) > 0

def get_all_links_from_tweet_text(text):
    """Извлекает все ссылки из текста твита для проверки дубликатов."""
    links = []
    # Обновленный regex для более полного захвата ссылок, включая домены без http/https
    patterns = [
        r'(https?://[^\s\)\]]+)',  # http/https ссылки
        r'((?:www\.)?(?:alze\.xyz|caset\.network|draze\.io|arklelab\.xyz|mintaura\.io|oku\.xyz|clarachain\.net|morkie\.xyz|nfts2me\.com|omnihub\.xyz|nft\.arc\.market|arc\.market)(?:/[^\s\)\]]*)?)', # Домены
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple): # Если regex возвращает группы, берем полную ссылку
                link = match[0] if match[0] else match[1]
            else:
                link = match
            
            # Добавляем протокол, если его нет (для корректной нормализации)
            if not link.startswith('http'):
                link = 'https://' + link
            links.append(link)
            
    return links

# ===========================
# ОСНОВНЫЕ ФУНКЦИИ
# ===========================

def setup_driver():
    """Настройка Edge WebDriver"""
    print("🚀 Настройка Edge...\n")

    options = Options()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    user_data_dir = os.path.join(os.getcwd(), "edge_profile")
    options.add_argument(f"user-data-dir={user_data_dir}")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")

    driver = webdriver.Edge(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_cdp_cmd('Network.setUserAgentOverride', {
        "userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    })

    return driver

def login_to_twitter(driver):
    """Проверка авторизации"""
    print("\n" + "="*60)
    print("🔐 Проверка авторизации в Twitter")
    print("="*60)

    try:
        driver.get("https://twitter.com/home")
        time.sleep(4)

        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="SideNav_NewTweet_Button"]'))
            )
            print("✅ Уже залогинен!")
            return True
        except:
            print("⏳ Требуется логин...")
            print(f"👉 Войди в Twitter (таймаут: {LOGIN_TIMEOUT} сек)\n")

            start_time = time.time()
            while time.time() - start_time < LOGIN_TIMEOUT:
                try:
                    driver.find_element(By.CSS_SELECTOR, '[data-testid="SideNav_NewTweet_Button"]')
                    print("\n✅ Успешно вошли!")
                    time.sleep(2)
                    return True
                except:
                    remaining = int(LOGIN_TIMEOUT - (time.time() - start_time))
                    print(f"⏳ Осталось: {remaining} сек...", end='\r')
                    time.sleep(2)

            print("\n❌ Таймаут логина!")
            return False

    except Exception as e:
        print(f"❌ Ошибка при попытке логина: {e}")
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
# 🔥 ПАРСЕР ТВИТОВ
# ===========================

def search_tweets_by_user(driver, project_key, config, existing_nfts_set):
    username = config['username']
    trigger_text = config['triggerText'].lower()
    search_keywords = config.get('searchKeywords', 'Free Mint NFT on Arc Testnet')
    zone = config['zone']

    print(f"\n{'='*60}")
    print(f"🔍 Поиск: @{username}")
    print(f"🎯 Ключевые слова: {search_keywords}")
    print(f"✅ Триггер: '{config['triggerText']}'")
    print(f"{'='*60}")

    search_query = f"from:{username} {search_keywords}"
    encoded_query = urllib.parse.quote(search_query)
    search_url = f"https://twitter.com/search?q={encoded_query}&f=live"
    print(f"🌐 URL: {search_url}")
    driver.get(search_url)
    time.sleep(5)

    nfts = []
    seen_tweet_urls = set()
    skipped_no_new_links = 0
    scrolls = 0

    time.sleep(3) # Дополнительная задержка для загрузки контента

    while scrolls < MAX_SCROLLS:
        print(f"📄 Прокрутка {scrolls + 1}/{MAX_SCROLLS}")

        tweets = []
        for attempt in range(3): # Повторные попытки найти твиты
            try:
                tweets = driver.find_elements(By.CSS_SELECTOR, 'article[data-testid="tweet"]')
                if tweets:
                    print(f"   Найдено твитов: {len(tweets)}")
                    break
                else:
                    time.sleep(1)
            except Exception as e:
                print(f"   Ошибка при поиске твитов: {e}")
                time.sleep(1)

        if not tweets:
            print("   ❌ Твиты не найдены, прерываем.")
            break

        found_duplicate_for_user = False # Флаг, указывающий, что найден дубликат для ЭТОГО пользователя

        for idx, tweet in enumerate(tweets):
            try:
                # Извлекаем URL твита (ссылка на сам твит)
                time_elem = tweet.find_element(By.TAG_NAME, "time")
                link_elem = time_elem.find_element(By.XPATH, "./ancestor::a")
                tweet_url = link_elem.get_attribute("href")
                if tweet_url in seen_tweet_urls:
                    continue # Пропускаем уже обработанные твиты
                seen_tweet_urls.add(tweet_url)

                # Читаем текст твита
                try:
                    text_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
                    tweet_text = text_elem.text
                except:
                    continue
                if trigger_text not in tweet_text.lower():
                    continue # Пропускаем, если нет триггерного текста

                # Проверка автора твита
                try:
                    author_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="User-Name"] a[role="link"]')
                    author_handle = author_elem.get_attribute("href").split('/')[-1]
                    if author_handle.lower() != username.lower():
                        continue # Пропускаем, если автор не совпадает
                except:
                    continue

                # Извлекаем ссылки NFT и проверяем их на дубликаты
                mint_links, has_new_links = extract_mint_links_from_tweet(tweet, existing_nfts_set)

                # 🔴 КЛЮЧЕВОЙ ШАГ: если в твите есть хотя бы один ДУБЛИКАТ — прекращаем обработку
                if not has_new_links:
                    # Проверяем, есть ли в этом твите *какие-либо* ссылки, которые уже существуют
                    all_tweet_links = get_all_links_from_tweet_text(tweet_text)
                    is_full_duplicate = False
                    for link in all_tweet_links:
                        normalized = normalize_url(link)
                        if normalized in existing_nfts_set:
                            print(f"   ⚠️ **ПЕРВЫЙ ДУБЛИКАТ НАЙДЕН:** {normalized} — прекращаем обработку @{username}")
                            found_duplicate_for_user = True
                            is_full_duplicate = True
                            break
                    
                    if is_full_duplicate:
                        break # Выйти из цикла по твитам, т.к. найден дубликат
                    else:
                        skipped_no_new_links += 1
                        print(f"   ⏭️ Пропускаем твит #{idx+1} (нет НОВЫХ ссылок)")
                        continue # Продолжить к следующему твиту, если нет НОВЫХ, но и не является полным дубликатом

                # Если найден дубликат для этого пользователя — прерываем обработку всех твитов для него
                if found_duplicate_for_user:
                    break

                # 👉 СОХРАНЯЕМ НОВЫЙ NFT
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
                
                # ✅ ФОРМАТИРУЕМ ВАШ ТРЕБУЕМЫЙ ФОРМАТ
                # Важно: mint_links здесь - это только НОВЫЕ ссылки, 
                # но в выходном JSON мы хотим видеть все найденные ссылки, 
                # если твит не был пропущен как дубликат.
                # Для этого используем get_all_links_from_tweet_text
                all_found_mint_links_in_tweet = [normalize_url(link) for link in get_all_links_from_tweet_text(tweet_text) if any(domain in normalize_url(link) for domain in [
                    'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
                    'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
                    'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
                ])]


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
                    "mint_links": all_found_mint_links_in_tweet # Добавляем все подходящие ссылки из твита
                }
                nfts.append(nft_data)
                print(f"   ✅ [{idx+1}] НАЙДЕН НОВЫЙ NFT: {all_found_mint_links_in_tweet[0][:60]}... | {time_ago} | ❤️ {likes} | 🔁 {retweets}")
                print(f"      📝 Текст: {tweet_text[:80]}...")

            except Exception as e:
                print(f"   ❌ Ошибка обработки твита #{idx+1}: {e}")
                # traceback.print_exc() # Отключено, чтобы не загромождать вывод
                continue

        # 🚫 Если найден дубликат — прекращаем скролл и обработку для текущего пользователя
        if found_duplicate_for_user:
            print(f"   🔴 **Обработка @{username} прекращена по первому дубликату.**")
            break

        scrolls += 1
        if scrolls < MAX_SCROLLS:
            print(f"   ⬇️  Скроллим вниз...")
            driver.execute_script("window.scrollBy(0, 5000);")
            time.sleep(SCROLL_PAUSE)
            driver.execute_script("window.scrollBy(0, -200);")
            time.sleep(1)

    print(f"✅ Найдено НОВЫХ для @{username}: {len(nfts)} | Пропущено дубликатов: {skipped_no_new_links}")
    return nfts, skipped_no_new_links

# ===========================
# ✅ СОХРАНЕНИЕ В ОЖИДАЕМОМ ФОРМАТЕ
# ===========================

def save_results(nfts, filename):
    """Сохраняет NFT в JSON в формате, который вы указали"""
    result = {
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"), # Время сохранения
        "total": len(nfts),
        "nfts": nfts
    }
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"\n💾 Сохранено: {filename}")
    except Exception as e:
        print(f"❌ Ошибка при сохранении файла {filename}: {e}")
        traceback.print_exc()

# ===========================
# 🔧 GIT УПРАВЛЕНИЕ (без изменений)
# ===========================

def run_git_command(cmd_list, cwd=None, timeout=30, capture_output=True):
    try:
        result = subprocess.run(cmd_list, cwd=cwd, timeout=timeout,
                                capture_output=capture_output,
                                text=True, encoding='utf-8', errors='replace')
        return result
    except subprocess.TimeoutExpired:
        print(f"❌ Таймаут для команды: {' '.join(cmd_list)}")
        return subprocess.CompletedProcess(cmd_list, 1, stdout='', stderr='Timeout')
    except Exception as e:
        print(f"❌ Ошибка запуска: {e}")
        return subprocess.CompletedProcess(cmd_list, 1, stdout='', stderr=str(e))

def upload_to_github():
    if not os.path.exists(GITHUB_REPO_PATH):
        print(f"❌ GitHub папка не найдена: {GITHUB_REPO_PATH}")
        return False

    try:
        import shutil

        # Копируем локальный twitter_results.json в папку Git репозитория
        local_results_file = "twitter_results.json"
        if not os.path.exists(local_results_file):
            print(f"❌ Локальный файл {local_results_file} не найден. Пропуск загрузки на GitHub.")
            return False

        target = os.path.join(GITHUB_REPO_PATH, "twitter_results.json")
        shutil.copy2(local_results_file, target)
        print(f"✅ Скопировано в: {target}")

        os.chdir(GITHUB_REPO_PATH)

        print("🔍 git status...")
        result = run_git_command(["git", "status", "--porcelain"])
        if result.stdout:
            print(f"   Изменённые файлы:\n{result.stdout}")
        else:
            print("   Нет unstaged изменений.")

        # Шаг 1: Если есть изменения в рабочей копии, сохраняем их во временном stash
        if result.stdout.strip(): # Если status --porcelain что-то вернул, значит есть изменения
            print("🛡️ Stash unstaged changes...")
            stash_result = run_git_command(["git", "stash", "push", "-m", "Temp stash before pull"])
            if stash_result.returncode != 0 and "No local changes to save" not in stash_result.stderr:
                print(f"⚠️ Stash warning: {stash_result.stderr}")
        else:
            stash_result = None

        # Шаг 2: Pull последних изменений с autostash
        print("⬇️ git pull --autostash...")
        pull_result = run_git_command(["git", "pull", "--autostash", "origin", "main"])
        if pull_result.returncode != 0:
            print(f"⚠️ Pull error: {pull_result.stderr}")
            # Fallback: pull без rebase/autostash
            print("⬇️ Пробую простой git pull...")
            pull_result = run_git_command(["git", "pull", "origin", "main"])
            if pull_result.returncode != 0:
                print(f"❌ Pull failed: {pull_result.stderr}")
                if stash_result and stash_result.returncode == 0:
                    print("📥 Pop stash (clean up)...")
                    run_git_command(["git", "stash", "pop"], timeout=10)
                return False
        
        # Шаг 3: Если был stash, применяем его обратно
        if stash_result and stash_result.returncode == 0:
            print("📥 Pop stash...")
            pop_result = run_git_command(["git", "stash", "pop"], timeout=10)
            if pop_result.returncode != 0:
                print(f"⚠️ Stash pop warning: {pop_result.stderr}")

        print("📦 git add...")
        add_result = run_git_command(["git", "add", "twitter_results.json"])
        if add_result.returncode != 0:
            print(f"❌ Add failed: {add_result.stderr}")
            return False

        print("💬 git commit...")
        commit_msg = f"🐦 Twitter NFT update {datetime.now().strftime('%d.%m %H:%M')}"
        commit_result = run_git_command(["git", "commit", "-m", commit_msg])
        if commit_result.returncode != 0:
            if "nothing to commit" in commit_result.stdout or "nothing to commit" in commit_result.stderr:
                print("ℹ️  Нет изменений для коммита")
                return True
            else:
                print(f"⚠️ Commit error: {commit_result.stderr}")
                return False
        else:
            if commit_result.stdout:
                print(f"✅ Commit: {commit_result.stdout.strip()}")

        print("⬆️ git push...")
        push_result = run_git_command(["git", "push", "origin", "main"])
        if push_result.returncode == 0:
            print("✅ Загружено на GitHub!")
            print("🌐 Сайт обновится через 1-2 минуты")
            return True
        else:
            print(f"❌ Git push failed!")
            print(f"📋 STDOUT:\n{push_result.stdout}")
            print(f"📋 STDERR:\n{push_result.stderr}")

            if "rejected" in push_result.stderr or "non-fast-forward" in push_result.stderr:
                print("\n💡 РЕШЕНИЕ: Remote ушёл вперёд. Попробуй:")
                print("   cd", GITHUB_REPO_PATH)
                print("   git pull --rebase origin main")
                print("   git push origin main")
            elif "Permission denied" in push_result.stderr or "authentication" in push_result.stderr.lower():
                print("\n💡 РЕШЕНИЕ: Проблема с доступом:")
                print("   1. Проверь SSH ключи: ssh -T git@github.com")
                print("   2. Или используй Personal Access Token")
            return False

    except Exception as e:
        print(f"❌ Неожиданная ошибка в upload_to_github: {e}")
        traceback.print_exc()
        return False

# ===========================
# 🔥 ГЛАВНАЯ ФУНКЦИЯ (ИСПРАВЛЕНА!)
# ===========================

def main():
    print("\n" + "="*80)
    print("🚀 Twitter NFT Search Parser for Arc Testnet")
    print("🔍 Метод: Twitter Search + Улучшенная фильтрация дубликатов")
    print("="*80)

    existing_nfts = load_existing_nfts()
    total_skipped = 0
    driver = None # Инициализируем driver как None
    all_nfts = []

    try:
        driver = setup_driver()

        if not login_to_twitter(driver):
            print("\n❌ Не удалось войти в Twitter")
            return

        total_projects = len(TWITTER_MONITOR_CONFIG)
        for idx, (project_key, config) in enumerate(TWITTER_MONITOR_CONFIG.items(), 1):
            print(f"\n[{idx}/{total_projects}] Обрабатываю {project_key}...")
            try:
                nfts, skipped = search_tweets_by_user(driver, project_key, config, existing_nfts)
                all_nfts.extend(nfts)
                total_skipped += skipped

                # Обновляем existing_nfts новыми ссылками, чтобы избежать дубликатов в рамках одного запуска
                for nft_item in nfts:
                    for link in nft_item.get('mint_links', []):
                        normalized = normalize_url(link)
                        if normalized:
                            existing_nfts.add(normalized)

                time.sleep(3)
            except Exception as e:
                print(f"❌ Ошибка при обработке проекта {project_key}: {e}")
                traceback.print_exc()
                continue

        all_nfts.sort(key=lambda x: x.get('datetime', ''), reverse=True)

        # ✅ СОХРАНЯЕМ В ФАЙЛ twitter_results.json (перезаписываем)
        output_filename = "twitter_results.json"
        save_results(all_nfts, output_filename)

        print("\n" + "="*80)
        print("📤 Загрузка на GitHub")
        print("="*80)
        upload_to_github()

        print("\n" + "="*80)
        print(f"✅ ГОТОВО!")
        print(f"🆕 Найдено НОВЫХ NFT: {len(all_nfts)}")
        print(f"⏭️  Пропущено (дубликаты/существующие): {total_skipped}")
        print("="*80)

    except KeyboardInterrupt:
        print("\n⚠️  Прервано пользователем")
    except Exception as e:
        print(f"\n❌ Критическая ошибка в главной функции: {e}")
        traceback.print_exc()
    finally:
        if driver: # Закрываем драйвер только если он был успешно инициализирован
            print("\n🔒 Закрываю браузер...")
            time.sleep(2)
            driver.quit()
        input("\n✅ Нажми Enter для выхода...")

if __name__ == "__main__":
    main()
