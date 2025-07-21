module.exports = {
  name: "echo",
  description: "Repeats what the user says",
  execute(api, event, args) {
    if (args.length === 0) return api.sendMessage("❗ Usage: echo <text>", event.threadID);
    api.sendMessage(args.join(" "), event.threadID);
  }
};