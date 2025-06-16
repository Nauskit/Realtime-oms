const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const mongoose = require("mongoose");
const Notification = require("../models/notification");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

const connection = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_POST || 6379,
});

const worker = new Worker("notificationQueue", async (job) => {
  const { notificationId } = job.data;
});
