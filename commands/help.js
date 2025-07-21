module.exports = {
  name: "help",
  description: "Show available commands",
  execute(api, event) {
    const helpText = "🧠 Available commands:\n- hi\n- help\n- echo <text>";
    api.sendMessage(helpText, event.threadID);
  }
};