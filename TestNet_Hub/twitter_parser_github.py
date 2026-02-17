from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime, timezone
import time
import json
import os
import traceback
import urllib.parse
import re
import requests
from bs4 import BeautifulSoup

# ===========================
# НАСТРОЙКИ ДЛЯ GITHUB ACTIONS
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

YOUR_WEBSITE_URL = "https://worklaf.github.io/Worklaf/TestNet_Hub/Arc_Testnet_by_Circle.html"
SCROLL_PAUSE = 3
MAX_SCROLLS = 1

def setup_headless_chrome():
    """🔥 Настройка headless Chrome для GitHub Actions"""
    print("🚀 Настройка headless Chrome для GitHub Actions...")
    
    chrome_options = Options()
    
    # 🔥 Обязательные параметры для GitHub Actions
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox") 
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-extensions")
    chrome_options.add_argument("--disable-logging")
    chrome_options.add_argument("--disable-background-timer-throttling")
    chrome_options.add_argument("--disable-backgrounding-occluded-windows")
    chrome_options.add_argument("--disable-renderer-backgrounding")
    chrome_options.add_argument("--disable-features=TranslateUI")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # 🔥 User-Agent для избежания блокировки
    chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    # 🔥 Экспериментальные настройки
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    # 🔥 Автоматическая установка ChromeDriver
    service = Service(ChromeDriverManager().install())
    
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    # 🔥 Скрытие webdriver флага
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    
    return driver

# 🔥 ОСТАЛЬНЫЕ ФУНКЦИИ БЕЗ ИЗМЕНЕНИЙ (normalize_url, load_existing_nfts, expand_tco и т.д.)
def normalize_url(url):
    """Нормализация URL для проверки дубликатов"""
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
        print(f"🔍 Загрузка существующих NFT: {YOUR_WEBSITE_URL}")
        response = requests.get(YOUR_WEBSITE_URL, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        nft_section = soup.find('div', {'data-section-zone': 'nfts'}) or soup
        mint_links = set()

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
        return mint_links

    except Exception as e:
        print(f"⚠️ Не удалось загрузить существующие NFT: {e}")
        return set()

def expand_tco(url, timeout=3):
    """Разворачиваем t.co ссылку"""
    try:
        resp = requests.head(url, allow_redirects=True, timeout=timeout)
        return resp.url
    except:
        return url

# 🔥 АДАПТИРОВАННЫЙ LOGIN БЕЗ ИНТЕРАКТИВНОСТИ
def check_twitter_access(driver):
    """Проверка доступа к Twitter (без логина)"""
    print("🔍 Проверка доступа к Twitter...")
    
    try:
        # Пытаемся открыть публичную страницу поиска
        driver.get("https://twitter.com/search?q=test")
        time.sleep(3)
        
        # Проверяем, не заблокированы ли мы
        if "login" in driver.current_url.lower():
            print("⚠️ Twitter требует логин - работаем в ограниченном режиме")
            return False
        
        print("✅ Доступ к Twitter получен")
        return True
        
    except Exception as e:
        print(f"❌ Ошибка доступа к Twitter: {e}")
        return False

# 🔥 ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ КОПИРУЙТЕ КАК ЕСТЬ, НО ЗАМЕНИТЕ main()
def parse_tweet_time(datetime_str):
    """Конвертация времени"""
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

# 🔥 АДАПТИРУЙТЕ SEARCH_TWEETS_BY_USER (убрав сложные элементы для headless)
def search_tweets_by_user(driver, project_key, config, existing_nfts_set):
    """Поиск твитов (адаптировано для headless)"""
    username = config['username']
    trigger_text = config['triggerText'].lower()
    search_keywords = config.get('searchKeywords', 'Free Mint NFT on Arc Testnet')
    
    print(f"🔍 Поиск: @{username}")
    print(f"🎯 Ключевые слова: {search_keywords}")
    
    search_query = f"from:{username} {search_keywords}"
    encoded_query = urllib.parse.quote(search_query)
    search_url = f"https://twitter.com/search?q={encoded_query}&f=live"
    
    print(f"🌐 URL: {search_url}")
    
    try:
        driver.get(search_url)
        time.sleep(5)
        
        # 🔥 Ищем твиты с упрощенной логикой для headless
        tweets = []
        for attempt in range(3):
            try:
                tweet_elements = driver.find_elements(By.CSS_SELECTOR, 'article[data-testid="tweet"]')
                if tweet_elements:
                    print(f"   Найдено твитов: {len(tweet_elements)}")
                    tweets = tweet_elements[:5]  # Берем первые 5
                    break
                time.sleep(2)
            except Exception as e:
                print(f"   Попытка {attempt+1}: {e}")
                time.sleep(1)
        
        if not tweets:
            print("   ❌ Твиты не найдены")
            return [], 0
        
        nfts = []
        for idx, tweet in enumerate(tweets):
            try:
                # 🔥 Упрощенная обработка для headless режима
                text_elem = tweet.find_element(By.CSS_SELECTOR, '[data-testid="tweetText"]')
                tweet_text = text_elem.text
                
                if trigger_text not in tweet_text.lower():
                    continue
                
                # Получаем ссылку на твит
                time_elem = tweet.find_element(By.TAG_NAME, "time")
                link_elem = time_elem.find_element(By.XPATH, "./ancestor::a")
                tweet_url = link_elem.get_attribute("href")
                
                # Извлекаем время
                datetime_str = time_elem.get_attribute("datetime")
                time_ago = parse_tweet_time(datetime_str)
                
                # 🔥 Простая проверка на новые ссылки
                mint_links = []
                for link in re.findall(r'https?://[^\s]+', tweet_text):
                    normalized = normalize_url(link)
                    if normalized and any(domain in normalized for domain in [
                        'alze.xyz', 'caset.network', 'draze.io', 'arklelab.xyz',
                        'mintaura.io', 'oku.xyz', 'clarachain.net', 'morkie.xyz'
                    ]) and normalized not in existing_nfts_set:
                        mint_links.append(normalized)
                
                if mint_links:
                    nft_data = {
                        "project": project_key,
                        "twitter": username,
                        "zone": config['zone'],
                        "text": tweet_text,
                        "url": tweet_url,
                        "time_ago": time_ago,
                        "datetime": datetime_str,
                        "likes": 0,  # 🔥 Упростили для headless
                        "retweets": 0,
                        "triggerText": config['triggerText'],
                        "mint_links": mint_links
                    }
                    nfts.append(nft_data)
                    print(f"   ✅ [{idx+1}] Найден NFT: {mint_links[0][:60]}...")
                
            except Exception as e:
                print(f"   ⚠️ Ошибка обработки твита {idx+1}: {e}")
                continue
        
        print(f"✅ Найдено НОВЫХ для @{username}: {len(nfts)}")
        return nfts, 0
        
    except Exception as e:
        print(f"❌ Критическая ошибка поиска для @{username}: {e}")
        return [], 0

def save_results(nfts, filename):
    """Сохранение результатов"""
    result = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total": len(nfts),
        "nfts": nfts
    }
    
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"💾 Сохранено: {filename}")
    except Exception as e:
        print(f"❌ Ошибка сохранения: {e}")

# 🔥 НОВАЯ MAIN ФУНКЦИЯ ДЛЯ GITHUB ACTIONS
def main():
    print("\n" + "="*80)
    print("🚀 Twitter NFT Parser для GitHub Actions")
    print("🔍 Режим: Headless Chrome + Автоматизация")
    print("="*80)
    
    existing_nfts = load_existing_nfts()
    driver = None
    all_nfts = []
    
    try:
        driver = setup_headless_chrome()
        
        # 🔥 Без интерактивного логина
        check_twitter_access(driver)
        
        total_projects = len(TWITTER_MONITOR_CONFIG)
        for idx, (project_key, config) in enumerate(TWITTER_MONITOR_CONFIG.items(), 1):
            print(f"\n[{idx}/{total_projects}] Обрабатываю {project_key}...")
            try:
                nfts, _ = search_tweets_by_user(driver, project_key, config, existing_nfts)
                all_nfts.extend(nfts)
                
                # Обновляем existing_nfts для избежания дубликатов
                for nft_item in nfts:
                    for link in nft_item.get('mint_links', []):
                        normalized = normalize_url(link)
                        if normalized:
                            existing_nfts.add(normalized)
                
                time.sleep(2)  # Shorter delay for automation
                
            except Exception as e:
                print(f"❌ Ошибка при обработке {project_key}: {e}")
                continue
        
        # Сортировка по времени
        all_nfts.sort(key=lambda x: x.get('datetime', ''), reverse=True)
        
        # 🔥 Сохранение в JSON
        save_results(all_nfts, "twitter_results.json")
        
        print("\n" + "="*80)
        print(f"✅ ГОТОВО! Найдено НОВЫХ NFT: {len(all_nfts)}")
        print("📤 Файл готов для автоматического коммита")
        print("="*80)
        
    except Exception as e:
        print(f"❌ Критическая ошибка: {e}")
        traceback.print_exc()
        
        # 🔥 Сохраняем хотя бы пустой результат
        save_results([], "twitter_results.json")
        
    finally:
        if driver:
            print("🔒 Закрытие браузера...")
            driver.quit()

if __name__ == "__main__":
    main()
