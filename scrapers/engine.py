import requests
from bs4 import BeautifulSoup
import json
import logging
from datetime import datetime
import os

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def scrape_isro():
    logging.info("Scraping ISRO...")
    url = "https://www.isro.gov.in/Careers.html"
    jobs = []
    try:
        response = requests.get(url, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Target the main careers table
        table = soup.find('table')
        if table:
            for row in table.find_all('tr')[1:]: # Skip header
                cols = row.find_all('td')
                if len(cols) >= 2:
                    title = cols[0].get_text(strip=True).replace("Read More", "")
                    link_tag = cols[0].find('a')
                    link = link_tag['href'] if link_tag else url
                    date = cols[-1].get_text(strip=True)
                    jobs.append({
                        "title": title,
                        "organization": "ISRO",
                        "link": f"https://www.isro.gov.in{link}" if link.startswith('/') else link,
                        "date": date if date else "Active",
                        "qualification": "Graduate/Technical",
                        "type": "Technical"
                    })
    except Exception as e: logging.error(f"ISRO: {e}")
    return jobs

def scrape_drdo():
    logging.info("Scraping DRDO...")
    url = "https://www.drdo.gov.in/careers"
    jobs = []
    try:
        response = requests.get(url, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Target based on actual DRDO careers page HTML structure
        for item in soup.find_all('div', class_='views-row'):
            link_tag = item.find('a', href=True)
            if link_tag:
                title = link_tag.get_text(strip=True)
                link = link_tag['href']
                jobs.append({
                    "title": title,
                    "organization": "DRDO",
                    "link": f"https://www.drdo.gov.in{link}" if link.startswith('/') else link,
                    "date": "Check Site",
                    "qualification": "Graduate/Technical",
                    "type": "Technical"
                })
    except Exception as e: logging.error(f"DRDO: {e}")
    return jobs

def scrape_ssc():
    logging.info("Scraping SSC...")
    url = "https://ssc.gov.in/"
    jobs = []
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.text, 'html.parser')
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
        response = requests.get(url, headers=headers, timeout=15, verify=False)
        soup = BeautifulSoup(response.text, 'html.parser')
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

def run_all_scrapers():
    all_jobs = []
    all_jobs.extend(scrape_isro())
    all_jobs.extend(scrape_drdo())
    all_jobs.extend(scrape_ssc())
    all_jobs.extend(scrape_upsc())
    all_jobs.extend(scrape_rrb())
    all_jobs.extend(scrape_ibps())
    
    # If scrapers return nothing (site changes), add a fallback active link
    if not all_jobs:
        all_jobs.append({
            "title": "Ongoing Recruitment Notifications 2026",
            "organization": "Various Departments",
            "link": "https://www.sarkariresult.com/",
            "date": "Daily Updates",
            "qualification": "10th/12th/Grad",
            "type": "General"
        })

    with open("/home/ubuntu/sarkarisync/notifications.json", 'w') as f:
        json.dump(all_jobs, f, indent=4)
    
    os.system("cp /home/ubuntu/sarkarisync/notifications.json /home/ubuntu/sarkarisync/public/notifications.json")
    logging.info(f"Sync Complete: {len(all_jobs)} jobs found.")

if __name__ == "__main__":
    run_all_scrapers()
