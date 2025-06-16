const Notification = require("../models/notification");
const notificationQueue = require("../queues/notificationQueue");

exports.createNotification = async (userId, message, type = "system") => {
  const noti = await Notification.create({
    user: userId,
    message,
    type,
  });
  await notificationQueue.add("sendNotification", {
    notificationId: noti._id.toString(),
  });
  return noti;
};
