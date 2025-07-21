module.exports = {
  name: "echo",
  description: "Echo your message",
  execute(api, event, args) {
    if (!args.length) {
      return api.sendMessage("❗ Usage: echo <message>", event.threadID);
    }
    api.sendMessage(args.join(" "), event.threadID);
  }
};