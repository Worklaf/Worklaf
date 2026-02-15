from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import os
from datetime import datetime

# ============================================================
#  НАСТРОЙКИ
# ============================================================

PROJECTS = [
    {"name": "Morkie", "twitter": "_morkie", "zone": "nft_morkie"},
    {"name": "Clara", "twitter": "clarachainxyz", "zone": "nft_clara"},
    {"name": "Oku", "twitter": "OKUXYZ", "zone": "nft_oku"},
    {"name": "MintAura", "twitter": "MintAura", "zone": "nft_mintaura"},
    {"name": "Arkle", "twitter": "0xarkle", "zone": "nft_arkle"},
    {"name": "Draze", "twitter": "DrazeLab", "zone": "nft_draze"},
    {"name": "Caset", "twitter": "casetnetwork", "zone": "nft_caset"},
    {"name": "Alze", "twitter": "0xAlze", "zone": "nft_alze"}
]

KEYWORDS_NFT = ["mint", "nft", "drop", "whitelist", "airdrop", "claim", "free mint"]
MAX_TWEETS_PER_PROJECT = 5
LOGIN_WAIT_TIME = 30  # Секунд на логин

# ============================================================
#  ФУНКЦИИ
# ============================================================

def setup_driver():
    """Настройка Edge драйвера"""
    print("🚀 Настройка Edge...")
    
    edge_options = Options()
    edge_options.binary_location = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    edge_options.add_argument('--disable-blink-features=AutomationControlled')
    edge_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    edge_options.add_experimental_option('useAutomationExtension', False)
    
    service = Service(executable_path="msedgedriver.exe")
    driver = webdriver.Edge(service=service, options=edge_options)
    return driver


def wait_for_login(driver):
    """Ждём ручной логин"""
    print("\n" + "="*80)
    print(f"⏳ ЗАЛОГИНЬСЯ ВРУЧНУЮ! Жди {LOGIN_WAIT_TIME} секунд...")
    print("="*80 + "\n")
    time.sleep(LOGIN_WAIT_TIME)


def parse_project_tweets(driver, project):
    """Парсит твиты одного проекта"""
    print(f"\n🔍 Парсинг @{project['twitter']}...")
    
    # Переходим на страницу пользователя
    url = f"https://twitter.com/{project['twitter']}"
    driver.get(url)
    time.sleep(3)
    
    # Скроллим для загрузки твитов
    for _ in range(2):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
    
    # Ищем твиты
    tweets = driver.find_elements(By.XPATH, '//article[@data-testid="tweet"]')
    
    results = []
    for tweet in tweets[:MAX_TWEETS_PER_PROJECT]:
        try:
            # Текст твита
            text_elem = tweet.find_element(By.XPATH, './/div[@data-testid="tweetText"]')
            text = text_elem.text.lower()
            
            # Проверяем ключевые слова
            if any(keyword in text for keyword in KEYWORDS_NFT):
                # Время публикации
                try:
                    time_elem = tweet.find_element(By.XPATH, './/time')
                    timestamp = time_elem.get_attribute('datetime')
                except:
                    timestamp = datetime.now().isoformat()
                
                # Ссылка на твит
                try:
                    link_elem = tweet.find_element(By.XPATH, './/a[contains(@href, "/status/")]')
                    link = link_elem.get_attribute('href')
                except:
                    link = url
                
                results.append({
                    "project": project['name'],
                    "twitter": project['twitter'],
                    "zone": project['zone'],
                    "text": text_elem.text[:200],  # Полный текст (первые 200 символов)
                    "timestamp": timestamp,
                    "link": link
                })
                
                print(f"  ✅ Найден NFT твит: {text_elem.text[:80]}")
        
        except Exception as e:
            continue
    
    return results


def save_results(all_results):
    """Сохраняем результаты в JSON"""
    output = {
        "last_check": datetime.now().isoformat(),
        "total_found": len(all_results),
        "nfts": all_results
    }
    
    with open('twitter_results.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Сохранено {len(all_results)} NFT в twitter_results.json")


# ============================================================
#  ГЛАВНАЯ ФУНКЦИЯ
# ============================================================

def main():
    driver = None
    try:
        # Запускаем браузер
        driver = setup_driver()
        print("✅ Edge запущен!")
        
        # Логин
        driver.get("https://twitter.com/login")
        time.sleep(3)
        wait_for_login(driver)
        
        # Парсим каждый проект
        all_results = []
        for project in PROJECTS:
            project_results = parse_project_tweets(driver, project)
            all_results.extend(project_results)
            time.sleep(2)  # Пауза между проектами
        
        # Сохраняем результаты
        save_results(all_results)
        
        print("\n" + "="*80)
        print(f"✅ ГОТОВО! Найдено {len(all_results)} NFT объявлений")
        print("="*80)
        
        time.sleep(3)
        
    except Exception as e:
        print(f"❌ ОШИБКА: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        if driver:
            driver.quit()


if __name__ == "__main__":
    main()
