# **🚀 AI-Powered Twitter Bot**  

This is an AI-powered **Twitter bot** that automatically tweets about **AI, programming, JavaScript, new frameworks, tech platforms, and trending topics** using **Google's Gemini API**.  

---

## **✨ Features**  
✅ **Auto-generates AI tweets** using Gemini API.  
✅ **Posts tweets automatically** at scheduled intervals.  
✅ **Covers trending topics** like AI, JavaScript, new frameworks, and tech updates.  
✅ **Fully customizable tweet topics and hashtags**.  

---

## **📌 Prerequisites**  
Make sure you have:  
- **Node.js v18+** installed.  
- A **Twitter Developer Account** with API keys.  
- A **Google Gemini API Key**.  

---

## **⚙️ Installation & Setup**  

### **1️⃣ Clone the Repo**  
```sh
git clone [https://github.com/your-username/twitter-bot.git](https://github.com/Harshitj-2005/Twitter_Ai-agent.git)
cd twitter-bot
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Configure Environment Variables**  
Create a `.env` file in the root directory:  

```env
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## **🚀 Running the Bot**  
To manually start the bot, run:  
```sh
node index.js
```
This will generate and post a tweet.

---

## **⏰ Automating the Bot**  

To schedule tweets at specific intervals, modify the `setInterval` function in `index.js`:  
```js
setInterval(postTweet, 6 * 60 * 60 * 1000); // Runs every 6 hours
```
You can adjust the interval as needed.

---

## **🛠️ Troubleshooting**  

### **❌ "Cannot find module 'twitter-api-v2'"**  
Run:  
```sh
npm install twitter-api-v2
```

### **❌ "Too Many Requests (429)"**  
- You are hitting Twitter’s rate limit.  
- Reduce API calls or **upgrade Twitter API access**.  

---

---

### **🎯 Enjoy Tweeting with AI! 🚀**
