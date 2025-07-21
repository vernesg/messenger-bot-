module.exports = {
  name: "hi",
  description: "Greets the user",
  execute(api, event) {
    api.sendMessage("👋 Hello! How can I help you today?", event.threadID);
  }
};