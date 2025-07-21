module.exports = {
  name: "hi",
  description: "Say hello",
  execute(api, event) {
    api.sendMessage("👋 Hello! How can I help you?", event.threadID);
  }
};