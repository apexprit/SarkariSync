import requests
from bs4 import BeautifulSoup

def test_urls():
    urls = {
        "SSC": "https://ssc.gov.in/",
        "UPSC": "https://www.upsc.gov.in/examinations/active-exams",
        "IBPS": "https://www.ibps.in/",
        "RRB": "https://www.rrbcdg.gov.in/"
    }
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    
    for name, url in urls.items():
        try:
            response = requests.get(url, headers=headers, timeout=10)
            print(f"{name}: {response.status_code} - Length: {len(response.text)}")
        except Exception as e:
            print(f"{name} Error: {e}")

if __name__ == "__main__":
    test_urls()
