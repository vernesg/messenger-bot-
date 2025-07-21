module.exports = {
  name: "echo",
  description: "Repeats what you say",
  execute(api, event, args) {
    if (!args.length) return api.sendMessage("❗ Usage: echo <text>", event.threadID);
    api.sendMessage(args.join(" "), event.threadID);
  }
};