module.exports = {
  name: "help",
  description: "Lists all available commands",
  execute(api, event, args) {
    const helpText = "📖 Available commands:\n- hi\n- help\n- echo <text>";
    api.sendMessage(helpText, event.threadID);
  }
};