import os
import json
import logging
import asyncio
from telegram import Bot

logging.basicConfig(level=logging.INFO)

async def push_notifications():
    TOKEN = "8478593975:AAHSalVobKzAWwXLt7WOtPNKOn2NPW-RafE"
    bot = Bot(token=TOKEN)
    
    jobs_path = "/home/ubuntu/sarkarisync/notifications.json"
    users_path = "/home/ubuntu/sarkarisync/users.json"
    
    if not os.path.exists(jobs_path) or not os.path.exists(users_path):
        logging.warning("Missing jobs or users file.")
        return

    with open(jobs_path, 'r') as f:
        jobs = json.load(f)
    
    with open(users_path, 'r') as f:
        users = json.load(f)

    for user_id, profile in users.items():
        user_qual = profile.get('qualification', 'All')
        
        # Filter jobs for this user
        matching_jobs = [j for j in jobs if j.get('type') == user_qual or user_qual == 'All']
        
        if matching_jobs:
            message = f"📢 *New Job Alerts for {user_qual}* 📢\n\n"
            for job in matching_jobs[:5]: # Top 5 to avoid spam
                message += f"🔹 *{job['title']}*\n🏢 {job['organization']}\n🗓️ {job['date']}\n🔗 [Apply Now]({job['link']})\n\n"
            
            try:
                await bot.send_message(chat_id=user_id, text=message, parse_mode='Markdown')
                logging.info(f"Pushed alert to {user_id}")
            except Exception as e:
                logging.error(f"Failed to send to {user_id}: {e}")

if __name__ == "__main__":
    asyncio.run(push_notifications())
