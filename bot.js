require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const axios = require("axios");
const Parser = require("rss-parser");

const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
    GEMINI_API_KEY
} = process.env;

const twitterClient = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
});

const parser = new Parser();


const RSS_FEED_URL = "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml";

async function fetchNews() {
    try {
        const feed = await parser.parseURL(RSS_FEED_URL);
        if (!feed.items || feed.items.length === 0) {
            return "No news available at the moment!";
        }
        const randomArticle = feed.items[Math.floor(Math.random() * feed.items.length)];
        return `${randomArticle.title} - ${randomArticle.link}`;
    } catch (error) {
        console.error("Error fetching news:", error.message);
        return "Tech is evolving fast! Stay updated. 🚀";
    }
}

async function generateTweet(newsText) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: `Summarize this for Twitter. Do this in crisp and human tone. add hastag according to trend so that it come in trend: ${newsText}` }] }]
            }
        );
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || newsText;
    } catch (error) {
        console.error("Error generating tweet:", error.response?.data || error.message);
        return newsText;
    }
}

async function postTweet() {
    try {
        const news = await fetchNews();
        const tweet = await generateTweet(news);
        await twitterClient.v2.tweet(tweet);
        console.log("Tweet posted:", tweet);
    } catch (error) {
        console.error("Error posting tweet:", error);
    }
}

setInterval(postTweet, 6 * 60 * 60 * 1000);
postTweet();
