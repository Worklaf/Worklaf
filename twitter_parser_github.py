import os
import sys
import subprocess
import json
import time
import re
import traceback
import requests
from datetime import datetime, timezone
from bs4 import BeautifulSoup

# Библиотеки Selenium
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ===========================
# НАСТРОЙКИ
# ===========================

# Ссылка на ваш сайт и JSON (для проверки дублей)
YOUR_WEBSITE_URL = "https://worklaf.github.io/Worklaf/TestNet_Hub/Arc_Testnet_by_Circle.html"
YOUR_JSON_URL = "https://raw.githubusercontent.com/Worklaf/Worklaf/refs/heads/main/TestNet_Hub/data/arc_shared_items.json"

# Путь к репозиторию GitHub.
# Если скрипт лежит ВНУТРИ папки репозитория, оставьте '.' (текущая папка).
# Если отдельно - укажите полный путь, например: '/home/user/TestNet_Hub'
GITHUB_REPO_PATH = os.getcwd() 

# Список доменов для монитора
MINT_DOMAINS = [
    'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
    'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz',
    'nfts2me', 'omnihub.xyz', 'nft.arc.market', 'arc.market'
]

TWITTER_MONITOR_CONFIG = {
    '_morkie': {
        'triggerText': 'Mint Free NFT On Arc Testnet',
        'searchKeywords': 'Mint Free NFT On Arc Testnet'
    },
    'clarachainxyz': {
        'triggerText': 'Free Mint NFT on Arc Testnet',
        'searchKeywords': 'Free Mint NFT on Arc Testnet'
    },
    'OKUXYZ': {
        'triggerText': 'NFT On Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'MintAura': {
        'triggerText': 'Mint Free Nft on Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    '0xarkle': {
        'triggerText': 'NFT On Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'DrazeLab': {
        'triggerText': 'NFT On Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    },
    'casetnetwork': {
        'triggerText': 'Mint Free NFT On ARC Testnet',
        'searchKeywords': 'Mint Free NFT On ARC Testnet'
    },
    '0xAlze': {
        'triggerText': 'NFT on Arc Testnet',
        'searchKeywords': 'NFT On Arc Testnet'
    }
}

SCROLL_PAUSE = 3
MAX_SCROLLS = 1
LOGIN_TIMEOUT = 120 # Секунд на ожидание входа (если профиль пустой)

# ===========================
# ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
# ===========================

def normalize_url(url):
    if not url: return ''
    url = re.sub(r'^https?://', '', url.lower())
    url = re.sub(r'^www\.', '', url)
    url = re.sub(r'[\?#].*$', '', url)
    url = url.rstrip('/')
    return url

def load_existing_nfts():
    mint_links = set()
    print("[1/2] Загрузка существующих NFT с HTML сайта...")
    try:
        resp = requests.get(YOUR_WEBSITE_URL, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        nft_section = soup.find('div', {'data-section-zone': 'nfts'}) or soup
        for a in nft_section.find_all('a', href=True):
            href = a['href']
            norm = normalize_url(href)
            if norm and any(d in norm for d in MINT_DOMAINS):
                mint_links.add(norm)
        print(f"      ✅ HTML: {len(mint_links)} ссылок")
    except Exception as e:
        print(f"      ⚠️  Ошибка HTML: {e}")

    print("[2/2] Загрузка ссылок из JSON файла...")
    try:
        resp = requests.get(YOUR_JSON_URL, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        
        def extract(val):
            if isinstance(val, str):
                norm = normalize_url(val)
                if norm and any(d in norm for d in MINT_DOMAINS):
                    mint_links.add(norm)
            elif isinstance(val, list):
                for x in val: extract(x)
            elif isinstance(val, dict):
                for x in val.values(): extract(x)
        
        extract(data)
        print(f"      ✅ JSON: всего добавлено (включая HTML): {len(mint_links)}")
    except Exception as e:
        print(f"      ⚠️  Ошибка JSON: {e}")

    return mint_links

def expand_tco(url, timeout=5):
    try:
        # Используем HEAD запрос, чтобы не скачивать весь контент
        resp = requests.head(url, allow_redirects=True, timeout=timeout)
        return resp.url
    except:
        return url

# ===========================
# SELENIUM ФУНКЦИИ
# ===========================

def setup_driver(headless=True):
    options = Options()
    if headless:
        options.add_argument("--headless=new") # Новый headless режим
    
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    # Стабильность
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    # Сохраняем сессию в папке './edge_profile'
    # Если профиль есть и залогинен, скрипт войдет сам.
    profile_path = os.path.join(os.getcwd(), "edge_profile")
    if not os.path.exists(profile_path):
        os.makedirs(profile_path)
    
    options.add_argument(f"user-data-dir={profile_path}")

    driver = webdriver.Edge(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver

def login_check(driver, timeout=60):
    print("🔐 Проверка авторизации...")
    try:
        driver.get("https://twitter.com/home")
        time.sleep(5)
        
        # Если нашли кнопку "Твитнуть", значит мы уже залогинены
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="SideNav_NewTweet_Button"]'))
            )
            print("   ✅ Уже авторизованы!")
            return True
        except:
            print("   ⚠️  Требуется ввод данных для входа...")
            if "--headless" in sys.argv:
                print("   ❌ Вы запустили в headless режиме, войти не получится.")
                print("   💡 Совет: Запустите один раз БЕЗ headless (найдите в коде setup_driver(False))")
                return False
            
            print(f"   ⏳ Ожидание входа ({timeout} сек)...")            
            start = time.time()
            while time.time() - start < timeout:
                try:
                    driver.find_element(By.CSS_SELECTOR, '[data-testid="SideNav_NewTweet_Button"]')
                    print("   ✅ Успешный вход!")
                    time.sleep(2)
                    return True
                except:
                    time.sleep(2)
                    pass
            return False
    except Exception as e:
        print(f"   ❌ Ошибка проверки логина: {e}")
        return False

def search_tweets(driver, username, config, existing_nfts):
    print(f"🔍 Поиск твитов от @{username}...")
    query = f"from:{username} {config['searchKeywords']}"
    url = f"https://twitter.com/search?q={urllib.parse.quote(query)}&f=live"
    driver.get(url)
    time.sleep(5)

    new_nfts = []
    seen_urls = set()
    scrolls = 0

    while scrolls < MAX_SCROLLS:
        tweets = driver.find_elements(By.CSS_SELECTOR, 'article[data-testid="tweet"]')
        print(f"   📄 Скролл {scrolls+1}: твитов на странице {len(tweets)}")

        for tweet in tweets:
            try:
                # Получаем URL твита для идентификации
                time_elem = tweet.find_element(By.TAG_NAME, "time")
                tweet_url = time_elem.find_element(By.XPATH, "./ancestor::a").get_attribute("href")
                if tweet_url in seen_urls: continue
                seen_urls.add(tweet_url)

                # Текст
                text_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
                tweet_text = text_elem.text
                trigger = config['triggerText'].lower()

                if trigger not in tweet_text.lower():
                    continue

                # Ссылки
                links_elem = tweet.find_elements(By.CSS_SELECTOR, 'a[href]')
                found_new_link = False
                mint_links_found = []

                for link in links_elem:
                    href = link.get_attribute("href")
                    current_link = href
                    
                    if 't.co' in href:
                        expanded = expand_tco(href)
                        current_link = expanded
                    
                    norm = normalize_url(current_link)
                    if norm and any(d in norm for d in MINT_DOMAINS):
                        if norm not in existing_nfts:
                            found_new_link = True
                            mint_links_found.append(norm)
                        else:
                            # Если нашли дубль - прерываем этот твит, если нужно
                            pass
                
                # Доп. проверка по тексту (regex fallback)
                if not found_new_link:
                    # Простейшая проверка на домены в тексте
                    for domain in MINT_DOMAINS:
                        if domain in tweet_text.lower():
                            # Если домен есть, но ссылка не парсится как новая, это сложно.
                            # Упростим: считаем, что если есть подходящий домен в тексте, но мы не нашли НОВУЮ ссылку в href, то пропускаем.
                            pass

                if found_new_link:
                    # Парсим время
                    try:
                        dt_str = time_elem.get_attribute("datetime")
                        dt_obj = datetime.fromisoformat(dt_str.replace('Z', '+00:00'))
                        diff = datetime.now(timezone.utc) - dt_obj
                        days = diff.days
                        hours = diff.seconds // 3600
                        mins = (diff.seconds % 3600) // 60
                        time_str = f"{days}d" if days > 0 else f"{hours}h" if hours > 0 else f"{mins}m"
                    except:
                        time_str = "Unknown"

                    new_nfts.append({
                        "project": username,
                        "twitter": username,
                        "zone": "nft_auto", # Упрощенная зона
                        "text": tweet_text,
                        "url": tweet_url,
                        "mint_links": mint_links_found,
                        "time_ago": time_str,
                        "datetime": dt_str if 'dt_str' in locals() else ""
                    })
                    print(f"   ✅ НАЙДЕН: {mint_links_found[0][:50]}...")

            except Exception as e:
                # Игнорируем ошибки при парсинге отдельных твитов
                continue

        scrolls += 1
        if scrolls < MAX_SCROLLS:
            driver.execute_script("window.scrollBy(0, 3000);")
            time.sleep(SCROLL_PAUSE)

    return new_nfts

# ===========================
# GIT ФУНКЦИИ (Упрощенные)
# ===========================

def run_git(cmd):
    try:
        result = subprocess.run(cmd, cwd=GITHUB_REPO_PATH, capture_output=True, text=True, timeout=30)
        return result
    except Exception as e:
        print(f"Git Error: {e}")
        return None

def upload_results(nfts):
    if not nfts:
        print("📤 Нет новых NFT для загрузки.")
        return

    result_data = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total": len(nfts),
        "nfts": nfts
    }
    
    outfile = os.path.join(GITHUB_REPO_PATH, "twitter_results.json")
    try:
        with open(outfile, 'w', encoding='utf-8') as f:
            json.dump(result_data, f, indent=2, ensure_ascii=False)
        print(f"💾 Файл сохранен: {outfile}")
    except Exception as e:
        print(f"❌ Ошибка сохранения: {e}")
        return

    # Git команды
    print("🛠️  Отправка в GitHub...")
    run_git(["git", "pull", "origin", "main"])
    run_git(["git", "add", "twitter_results.json"])
    commit_msg = f"Update NFT {datetime.now().strftime('%d.%m %H:%M)}"
    run_git(["git", "commit", "-m", commit_msg])
    run_git(["git", "push", "origin", "main"])
    print("✅ Готово!")

# ===========================
# MAIN
# ===========================

import urllib.parse # Импорт здесь, чтобы не потерялся

def main():
    print("🚀 Запуск Twitter NFT Parser")

    # 1. Загрузка существующих
    existing_nfts = load_existing_nfts()
    
    # 2. Настройка драйвера
    # Если впервые запускаете или слетела авторизация, 
    # измените на headless=False, увидите окно, войдете, потом верните True.
    is_headless = True 
    driver = setup_driver(headless=is_headless)

    if not login_check(driver):
        driver.quit()
        return

    all_nfts = []
    
    # 3. Цикл по аккаунтам
    try:
        for username, cfg in TWITTER_MONITOR_CONFIG.items():
            try:
                found = search_tweets(driver, username, cfg, existing_nfts)
                all_nfts.extend(found)
                # Обновляем сет существующих, чтобы не искать один и тот же линк в разных аккаунтах
                for n in found:
                    for l in n.get('mint_links', []):
                        existing_nfts.add(normalize_url(l))
                time.sleep(2)
            except Exception as e:
                print(f"❌ Ошибка обработки @{username}: {e}")
                traceback.print_exc()
                continue
    finally:
        print("🔒 Завершение работы...")
        driver.quit()

    # 4. Сохранение и пуш
    if all_nfts:
        upload_results(all_nfts)
    else:
        print("📭 В этом цикле ничего нового не найдено.")

if __name__ == "__main__":
    main()
