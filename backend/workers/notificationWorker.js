const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const mongoose = require("mongoose");
const Notification = require("../models/notification");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "notificationQueue",
  async (job) => {
    const { notificationId } = job.data;
    const noti = await Notification.findById(notificationId).populate("user");

    if (noti) {
      console.log(
        `Sending notification to user: ${noti.user.username} - ${noti.message}`
      );

      io.to(noti.user._id.toString().emit("notification", {
        id: noti._id,
        message: noti.message,
        type: noti.type,
        createAt: noti.createAt,
      }));
    } else {
      console.log(`Notification not found: ${notificationId}`);
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} complated`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id}`);
});
