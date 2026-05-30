import logging
import json
import os
from telegram import Update, ReplyKeyboardMarkup, BotCommand
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
from telegram.constants import ParseMode

# Setup logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO,
    filename='/home/ubuntu/sarkarisync/bot.log',
    filemode='a'
)

USERS_FILE = "/home/ubuntu/sarkarisync/users.json"
NOTIFICATIONS_FILE = "/home/ubuntu/sarkarisync/notifications.json"

def load_users():
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, 'r') as f:
                return json.load(f)
        except Exception as e:
            logging.error(f"Error loading users: {e}")
            return {}
    return {}

def save_user(user_id, qualification, username=None):
    users = load_users()
    users[str(user_id)] = {
        "qualification": qualification,
        "username": username
    }
    try:
        with open(USERS_FILE, 'w') as f:
            json.dump(users, f, indent=4)
    except Exception as e:
        logging.error(f"Error saving user {user_id}: {e}")

def load_notifications():
    if os.path.exists(NOTIFICATIONS_FILE):
        try:
            with open(NOTIFICATIONS_FILE, 'r') as f:
                return json.load(f)
        except Exception as e:
            logging.error(f"Error loading notifications: {e}")
            return []
    return []

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message or not update.effective_chat or update.effective_chat.type != 'private':
        return
    
    reply_keyboard = [['10th Pass', '12th Pass'], ['Graduate', 'Technical']]
    await update.message.reply_text(
        "👋 Welcome to *SarkariSync*!\n\nI will send you instant alerts for Indian Government jobs.\n\n"
        "Please select your *highest qualification* to start receiving personalized notifications:",
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True, resize_keyboard=True),
        parse_mode=ParseMode.MARKDOWN
    )

async def set_preferences(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message or not update.effective_chat or update.effective_chat.type != 'private':
        return
        
    reply_keyboard = [['10th Pass', '12th Pass'], ['Graduate', 'Technical']]
    await update.message.reply_text(
        "🔄 *Update Preferences*\n\nChoose your new qualification level:",
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True, resize_keyboard=True),
        parse_mode=ParseMode.MARKDOWN
    )

async def handle_qualification(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message or not update.effective_chat or update.effective_chat.type != 'private':
        return
        
    qual = update.message.text
    user_id = update.message.chat_id
    username = update.effective_user.username if update.effective_user else None
    save_user(user_id, qual, username)
    await update.message.reply_text(
        f"✅ *Preference Saved!*\n\nYou will now receive alerts for *{qual}* level jobs.\n\n"
        "I'll ping you as soon as a new vacancy is found!",
        parse_mode=ParseMode.MARKDOWN
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    help_text = (
        "📖 *SarkariSync Help*\n\n"
        "/start - Start the bot and set preferences\n"
        "/preferences - Change your qualification settings\n"
        "/latest - See the 5 most recent job alerts\n"
        "/trending - See popular job searches\n"
        "/help - Show this message\n\n"
        "🔒 *Privacy*: This bot only works in private chat for your security."
    )
    await update.message.reply_text(help_text, parse_mode=ParseMode.MARKDOWN)

async def latest_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    notifications = load_notifications()
    if not notifications:
        await update.message.reply_text("No recent alerts found.")
        return

    # Get last 5
    latest = notifications[-5:][::-1]
    
    response = "🆕 *Latest Job Alerts:*\n\n"
    for item in latest:
        response += f"📌 *{item.get('title')}*\n"
        response += f"🏢 Org: {item.get('organization')}\n"
        response += f"🎓 Qual: {item.get('qualification')}\n"
        response += f"🔗 [Apply Here]({item.get('link')})\n\n"
    
    await update.message.reply_text(response, parse_mode=ParseMode.MARKDOWN, disable_web_page_preview=True)

async def trending_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message:
        return
    # Mock trending as we don't have analytics yet, but provide useful categories
    trending_text = (
        "🔥 *Trending Job Categories:*\n\n"
        "1. SSC CGL / CHSL\n"
        "2. Banking (IBPS/SBI)\n"
        "3. Railway Recruitment (RRB)\n"
        "4. Defense Services (NDA/CDS)\n"
        "5. State PSC Exams\n\n"
        "Stay tuned for live trending data!"
    )
    await update.message.reply_text(trending_text, parse_mode=ParseMode.MARKDOWN)

async def post_init(application):
    await application.bot.set_my_commands([
        BotCommand("start", "Start the bot"),
        BotCommand("preferences", "Change qualification"),
        BotCommand("latest", "Latest job alerts"),
        BotCommand("trending", "Trending jobs"),
        BotCommand("help", "Help & Info")
    ])

if __name__ == '__main__':
    TOKEN = "8478593975:AAHSalVobKzAWwXLt7WOtPNKOn2NPW-RafE"
    app = ApplicationBuilder().token(TOKEN).post_init(post_init).build()
    
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("preferences", set_preferences))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("latest", latest_command))
    app.add_handler(CommandHandler("trending", trending_command))
    app.add_handler(MessageHandler(filters.Regex('^(10th Pass|12th Pass|Graduate|Technical)$') & filters.ChatType.PRIVATE, handle_qualification))
    
    print("Bot is running...")
    app.run_polling()
