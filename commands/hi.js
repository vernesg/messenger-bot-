module.exports = {
  name: "hi",
  description: "Greets the user",
  execute(api, event, args) {
    api.sendMessage("👋 Hello! How can I assist you?", event.threadID);
  }
};