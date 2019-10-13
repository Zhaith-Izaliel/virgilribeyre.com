module.exports = {
  port: 4567,
  emailTransporter: process.env.EMAIL_SENDER || "wertak25@orange.fr",
  emailPassword: process.env.EMAIL_PASSWORD || "",
}
