import requests
from bs4 import BeautifulSoup
import json
import logging
import os
from datetime import datetime

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def scrape_ssc():
    logging.info("Scraping SSC...")
    url = "https://ssc.gov.in/"
    jobs = []
    try:
        # SSC often uses JS but let's check for basic links/notices
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        # This is a placeholder as SSC.gov.in structure varies and often uses dynamic loading
        # We will search for notice links
        for link in soup.find_all('a', href=True):
            if 'Notice' in link.text or 'Exam' in link.text:
                    link_href = link['href']
                    if isinstance(link_href, list): link_href = link_href[0]
                    jobs.append({
                        "title": link.text.strip()[:100],
                        "organization": "SSC",
                        "link": f"https://ssc.gov.in{link_href}" if link_href.startswith('/') else link_href,
                        "date": datetime.now().strftime("%Y-%m-%d"),
                        "qualification": "Grad/12th/10th",
                        "type": "General"
                    })
        return jobs[:5]
    except Exception as e:
        logging.error(f"SSC Error: {e}")
        return []

def scrape_upsc():
    logging.info("Scraping UPSC...")
    url = "https://www.upsc.gov.in/examinations/active-exams"
    jobs = []
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table')
        if table:
            for row in table.find_all('tr')[1:]:
                cols = row.find_all('td')
                if len(cols) >= 2:
                    title = cols[0].get_text(strip=True)
                    link_tag = cols[0].find('a')
                    link = f"https://www.upsc.gov.in{link_tag['href']}" if link_tag else url
                    jobs.append({
                        "title": title,
                        "organization": "UPSC",
                        "link": link,
                        "date": datetime.now().strftime("%Y-%m-%d"),
                        "qualification": "Graduate/Post Graduate",
                        "type": "Civil Services"
                    })
        return jobs[:5]
    except Exception as e:
        logging.error(f"UPSC Error: {e}")
        return []

def scrape_rrb():
    logging.info("Scraping RRB...")
    url = "https://www.rrbcdg.gov.in/"
    jobs = []
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        # RRB Chandigarh site usually has notices in a table or list
        for link in soup.find_all('a', href=True):
            if 'CEN' in link.text or 'Recruitment' in link.text:
                link_href = link['href']
                if isinstance(link_href, list): link_href = link_href[0]
                jobs.append({
                    "title": link.text.strip()[:100],
                    "organization": "RRB",
                    "link": f"https://www.rrbcdg.gov.in/{link_href}" if link_href.startswith('/') else link_href,
                    "date": datetime.now().strftime("%Y-%m-%d"),
                    "qualification": "ITI/Diploma/Degree",
                    "type": "Railways"
                })
        return jobs[:5]
    except Exception as e:
        logging.error(f"RRB Error: {e}")
        return []

def scrape_ibps():
    logging.info("Scraping IBPS...")
    url = "https://www.ibps.in/"
    jobs = []
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        # IBPS had SSL issues in test, using verify=False for now with caution
        response = requests.get(url, headers=headers, timeout=15, verify=False)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Target the scrolling notices or link items
        for link in soup.find_all('a', href=True):
            if 'CRP' in link.text or 'Career' in link.text:
                jobs.append({
                    "title": link.text.strip()[:100],
                    "organization": "IBPS",
                    "link": link['href'],
                    "date": datetime.now().strftime("%Y-%m-%d"),
                    "qualification": "Graduate",
                    "type": "Banking"
                })
        return jobs[:5]
    except Exception as e:
        logging.error(f"IBPS Error: {e}")
        return []

def run_extended_scrapers():
    all_jobs = []
    all_jobs.extend(scrape_ssc())
    all_jobs.extend(scrape_upsc())
    all_jobs.extend(scrape_rrb())
    all_jobs.extend(scrape_ibps())
    
    # Import existing engine scrapers if needed or just replace engine.py
    # For now, let's create a combined results file
    
    if not all_jobs:
        all_jobs.append({
            "title": "Stay Tuned: New Govt Job Notifications Arriving Soon",
            "organization": "Central/State Govts",
            "link": "https://www.sarkarisync.com",
            "date": datetime.now().strftime("%Y-%m-%d"),
            "qualification": "Check Notification",
            "type": "Information"
        })

    output_file = "/home/ubuntu/sarkarisync/notifications.json"
    public_file = "/home/ubuntu/sarkarisync/public/notifications.json"
    
    with open(output_file, 'w') as f:
        json.dump(all_jobs, f, indent=4)
    
    # Ensure public directory exists
    os.makedirs(os.path.dirname(public_file), exist_ok=True)
    os.system(f"cp {output_file} {public_file}")
    
    logging.info(f"Extended Sync Complete: {len(all_jobs)} jobs found.")

if __name__ == "__main__":
    run_extended_scrapers()
