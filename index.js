const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const moment = require("moment");

const TOKEN = "7844968599:AAHWKTt_7dpPggP_HOqOSJJvsQALbnNiRY4"; // Thay bằng token bot của bạn
const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

const startTime = moment(); // Lưu thời gian bot bắt đầu chạy

// Hàm tính uptime
function getUptime() {
    const now = moment();
    const duration = moment.duration(now.diff(startTime));
    return `Bot đã hoạt động: ${duration.hours()} giờ, ${duration.minutes()} phút, ${duration.seconds()} giây.`;
}

// Phản hồi khi nhận tin nhắn
bot.on("message", (msg) => {
    if (msg.text.toLowerCase() === "/uptime") {
        bot.sendMessage(msg.chat.id, getUptime());
    } else {
        bot.sendMessage(msg.chat.id, `Bot đang hoạt động! Bạn đã gửi: ${msg.text}`);
    }
});

// Route để kiểm tra uptime từ web
app.get("/", (req, res) => {
    res.send(`Bot Telegram đang chạy!<br>${getUptime()}`);
});

// Lắng nghe server trên cổng 3000
app.listen(3000, () => {
    console.log("Server đang chạy trên cổng 3000");
});
