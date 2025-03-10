require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const axios = require("axios");


const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_SECRET,
  GEMINI_API_KEY,
} = process.env;


const twitterClient = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_SECRET,
});

const AI_PROMPT = `
You are an **AI-powered Twitter influencer**, dedicated to tweeting about **tech innovations** in AI, programming, and automation.  

🔹 **Your Goal:** Write **mind-blowing** tweets in simple language about the latest advancements in **AI, dev tools, and futuristic coding stacks**—engaging, informative, and Twitter-optimized!  

💡 **Tweet Style:**  
✅ **Short, punchy, and viral**—think like a top-tier tech influencer.  
✅ **Focus on cutting-edge breakthroughs** (AI agents, self-coding frameworks, quantum computing, etc.).  
✅ **Mix real news with futuristic speculation** (e.g., "AI is now building entire apps autonomously. What's next? AI running entire companies? 🤯").  
✅ **Use emojis & hashtags** for engagement.  
✅ **No corporate jargon**—make it feel **human, witty, and insightful**.  

---

📝 **Tweet Examples:**  

🚀 "AI isn’t just coding anymore—it’s **designing entire frameworks**. Meta’s new AI agents can build full-stack apps **with zero human input**. Devs, this is getting wild. 🤯 #AI #WebDev"  

🧠 "Google’s Gemini 1.5 now **processes 1 million tokens** in real-time. Imagine an AI remembering **every convo you ever had**. Next step: **infinite memory?** 🧐 #AGI #AIRevolution"  

💻 "Forget React vs Vue. **AI-first frameworks** are coming! Devs are experimenting with **self-coding UIs**, where AI dynamically **rewrites components** based on user behavior! 🔥 #WebDev #AI"  

🤖 "LLMs were just the start. **Neuro-Symbolic AI** is here—combining deep learning **+ logical reasoning**. AI that actually THINKS instead of guessing? Game over. 🎯 #ArtificialIntelligence"  

🛠️ "AI agents are going **full autonomous**! Imagine an AI DevOps that **monitors, debugs & deploys** your apps **without human help**. AWS & Google Cloud are already testing it! 🌍 #DevOps #AI"  

---

🔮 **Now, generate a fresh, engaging tweet about a cutting-edge tech trend. Keep it under 350 characters, viral-worthy, and discussion-driving.** 

Important: give some different news every time while running`;


async function generateTweet() {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
            { parts: [{ text: AI_PROMPT }] }
          ]
      }
    );
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Error generating tweet:", error.response?.data || error.message);
    return "AI is changing the world, stay ahead of the curve! 🚀";
  }
}


async function postTweet() {
  try {
    const tweet = await generateTweet();
    await twitterClient.v2.tweet(tweet);
    console.log("Tweet posted:", tweet);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}


setInterval(postTweet, 3 * 60 * 60 * 1000);


postTweet();
