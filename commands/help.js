module.exports = {
  name: "help",
  description: "Show all commands",
  execute(api, event) {
    const helpText = "🧠 Commands:\n- hi\n- help\n- echo <text>";
    api.sendMessage(helpText, event.threadID);
  }
};