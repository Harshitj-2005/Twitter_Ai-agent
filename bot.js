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

const trendingTopics = [
  // 💻 Web Development & JavaScript  
  "Next.js vs. Remix: Which one is the future?",
  "The rise of AI-powered frontend development",
  "React Server Components: The next big thing?",
  "Why Astro is the future of static sites",
  "WebAssembly: The secret weapon for faster web apps",
  "Bun vs. Node.js: The JavaScript runtime battle",
  "JavaScript frameworks that will dominate 2025",
  "The decline of jQuery: End of an era?",
  "HTMX: The hidden gem in modern web dev",
  "Why developers are moving from Tailwind CSS to other solutions",
  "State management in 2025: The future after Redux?",
  "Turbopack vs. Vite: The fastest dev server showdown",
  "Why JavaScript fatigue is real & how to handle it",
  
  // 🚀 New Frameworks & Platforms  
  "Meta’s new AI coding assistant: A game-changer?",
  "Why Devs are switching to Tauri instead of Electron",
  "Supabase vs. Firebase: The backend battle",
  "Deno vs. Node.js: The rise of a new JavaScript runtime",
  "Cloudflare Workers: The future of serverless?",
  "The rise of Rust in web development",
  "Why GoLang is becoming the favorite backend language",
  "Flutter vs. React Native: What’s winning in 2025?",
  "Will Solid.js replace React in the future?",
  "Why developers are loving Qwik.js",

  "AI in web development",
  "Latest advancements in quantum computing",
  "Breakthroughs in generative AI",
  "AI-powered cybersecurity",
  "How AI is transforming healthcare",
  "AI-generated music, code, and art",
  "The rise of humanoid robots",
  "AI-driven fake news detection",
  "AI-powered virtual assistants",
  "Neural networks vs. classical algorithms",
  "The role of AI in climate change solutions",
  "AI and the future of space exploration",
  
  // 🔧 DevOps, Tools & Automation  
  "The rise of AI-powered DevOps",
  "GitHub Copilot X: The future of coding?",
  "Docker vs. Podman: The future of containerization",
  "Why Cloudflare is taking over the web",
  "Vercel vs. Netlify: The ultimate frontend hosting battle",
  "AI agents in DevOps: Automated debugging & deployments",
  "How Web3 is transforming cloud computing",
  "New CI/CD tools that are making DevOps easier",
  "Google Cloud Run vs. AWS Lambda: Which one wins?",
  
  // 📱 Mobile & Emerging Tech  
  "The future of cross-platform mobile development",
  "AI-generated apps: No code, no problem?",
  "Progressive Web Apps (PWA) vs. Native Apps",
  "WebGPU: The future of high-performance web graphics",
  "The rise of spatial computing with Apple Vision Pro",
  "Why developers are excited about OpenAI’s GPT-5",
  "Apple vs. Meta: The race for AR/VR dominance"
];

const dynamicPrompt = `Generate an engaging tweet about ${trendingTopics[Math.floor(Math.random() * trendingTopics.length)]}. Keep it short, fresh, and impactful and write tweet in human tone. tweet should be based on latest news of market`;

async function generateTweet() {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { role: "user", parts: [{ text: dynamicPrompt }] }
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
