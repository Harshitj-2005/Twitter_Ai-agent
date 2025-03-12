require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const axios = require("axios");
const { response } = require("express");


const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
    GEMINI_API_KEY,
    GNEWS_API_KEY,
} = process.env;


const twitterClient = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
});

async function generateNews() {
    try {
        const news = await axios.get(
            `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=${GNEWS_API_KEY}`
        );
        const articles = news.data.articles;

        if (!articles || articles.length === 0) {
            return "Tech is evolving, stay updated! 🚀";
        }
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        return randomArticle.description || randomArticle.title;
    }
    catch (error) {
        console.error("Error fetching news:", error.message);
        return "Stay updated with the latest tech trends! 🚀";
    }
}



async function generateTweet() {
    try {
        const newsdetail = await generateNews()
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    { parts: [{ text: newsdetail }] }
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


setInterval(postTweet, 6 * 60 * 60 * 1000);


postTweet();
