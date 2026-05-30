import subprocess
import time
import os

TASKS = [
    "Refactor the entire Next.js app (/home/ubuntu/sarkarisync) to have world-class animations (framer-motion), a 'Save Jobs' feature, and a theme switcher (Dark/Light). Make it look like a premium SaaS product.",
    "Implement comprehensive scrapers in 'scrapers/engine.py' for SSC, UPSC, RRB, IBPS, and state-level jobs. Add robust error handling and proxy rotation placeholders.",
    "Upgrade 'bot.py' to V3 with /latest, /trending, /preferences, /help, and automated broadcast logic for new jobs found in 'notifications.json'.",
    "Write a full suite of automated tests for the scrapers and the frontend components. Ensure 90% coverage.",
    "Perform a 'Production Audit': optimize images, minify code, add SEO meta tags to every page, and set up a status dashboard at '/status'.",
    "Final Polishing: Review all code for DRY principles, add detailed JSDoc/Docstrings, and create a professional 'README.md' for the project."
]

def run_perpetual_sprint():
    print("Starting Perpetual Sprint Engine...")
    for i, task in enumerate(TASKS):
        print(f"\n[ORCHESTRATOR] Starting Phase {i+1}: {task[:50]}...")
        # Use a high timeout per segment
        try:
            cmd = ["claude", "-p", task]
            # We run this and wait for it to finish before starting the next
            process = subprocess.run(cmd, capture_output=True, text=True)
            with open("/home/ubuntu/sarkarisync/sprint_history.log", "a") as log:
                log.write(f"\n--- PHASE {i+1} COMPLETE ---\n")
                log.write(process.stdout)
                if process.stderr:
                    log.write(f"\nERRORS:\n{process.stderr}")
        except Exception as e:
            print(f"Error in Phase {i+1}: {e}")
        
        print(f"[ORCHESTRATOR] Phase {i+1} completed. Moving to next task...")
        time.sleep(5) # Brief pause between strikes

    print("All initial phases complete. Entering 'Continuous Polish' mode...")
    while True:
        # Final loop to just keep looking for improvements
        cmd = ["claude", "-p", "Analyze the entire codebase in /home/ubuntu/sarkarisync and identify any small bugs, UI inconsistencies, or performance bottlenecks. Fix them immediately. If everything is perfect, write a 'System Status' report to status.txt."]
        subprocess.run(cmd)
        time.sleep(1800) # Check every 30 minutes for new improvements

if __name__ == "__main__":
    run_perpetual_sprint()
