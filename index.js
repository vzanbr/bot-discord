import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { google } from "googleapis";

config();

const Client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
})

const youtubeClient = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_API_KEY
})

let lastVideoId = ''
