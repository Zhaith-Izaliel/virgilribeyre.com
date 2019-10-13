module.exports = {
  port: 4567,
  emailTransporter: process.env.EMAIL_SENDER || "wertak25@orange.fr",
  emailPassword: process.env.EMAIL_PASSWORD || "",
  emailHost: process.env.EMAIL_HOST || "smtp.orange.fr",
  emailPort: process.env.EMAIL_PORT || 465,
}
