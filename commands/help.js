module.exports = {
  name: "help",
  description: "Lists all commands",
  execute(api, event) {
    const helpMsg = "🧠 Available commands:\n- hi\n- help\n- echo <message>";
    api.sendMessage(helpMsg, event.threadID);
  }
};