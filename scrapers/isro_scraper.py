import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_isro():
    url = "https://www.isro.gov.in/Careers.html"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.content, 'html.parser')
        jobs = []
        # Basic parsing logic for ISRO
        for link in soup.find_all('a', href=True):
            if 'Career' in link.text or 'Advt' in link.text:
                jobs.append({
                    "title": link.text.strip(),
                    "organization": "ISRO",
                    "link": url if link['href'].startswith('#') else link['href'],
                    "date": "Check Site"
                })
        return jobs[:5]
    except Exception as e:
        print(f"ISRO Error: {e}")
        return []

def scrape_drdo():
    url = "https://www.drdo.gov.in/careers"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.content, 'html.parser')
        jobs = []
        # Basic parsing logic for DRDO
        for row in soup.find_all('tr'):
            cols = row.find_all('td')
            if len(cols) > 1:
                jobs.append({
                    "title": cols[1].text.strip(),
                    "organization": "DRDO",
                    "link": url,
                    "date": cols[0].text.strip() if cols[0].text else "N/A"
                })
        return jobs[:5]
    except Exception as e:
        print(f"DRDO Error: {e}")
        return []

if __name__ == "__main__":
    all_jobs = scrape_isro() + scrape_drdo()
    output_path = "/home/ubuntu/sarkarisync/notifications.json"
    with open(output_path, "w") as f:
        json.dump(all_jobs, f, indent=4)
    print(f"Scraped {len(all_jobs)} jobs to {output_path}")
