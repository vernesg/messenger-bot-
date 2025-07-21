const login = require("ws3-fca");
const fs = require("fs");
const path = require("path");

const appState = require("./appstate.json");
const commandDir = path.join(__dirname, "commands");

// Load all command modules
const commands = new Map();
fs.readdirSync(commandDir).forEach(file => {
  if (file.endsWith(".js")) {
    const command = require(path.join(commandDir, file));
    commands.set(command.name, command);
  }
});

login({ appState }, (err, api) => {
  if (err) return console.error("Login failed:", err);

  api.setOptions({ listenEvents: true, selfListen: false });
  console.log("🤖 Bot is running...");

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    if (event.type !== "message" || !event.body) return;

    const args = event.body.trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();

    if (commands.has(cmd)) {
      try {
        commands.get(cmd).execute(api, event, args);
      } catch (e) {
        console.error("Error executing command:", e);
      }
    }
  });
});