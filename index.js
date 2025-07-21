const express = require("express");
const login = require("ws3-fca");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => res.send("🤖 Messenger bot is running..."));
app.listen(PORT, () => console.log("🌐 Web server running on port", PORT));

const appState = require("./appstate.json");
const commandDir = path.join(__dirname, "commands");

const commands = new Map();
fs.readdirSync(commandDir).forEach(file => {
  if (file.endsWith(".js")) {
    const command = require(path.join(commandDir, file));
    commands.set(command.name, command);
  }
});

login({ appState }, (err, api) => {
  if (err) return console.error("❌ Login failed:", err);

  api.setOptions({ listenEvents: true, selfListen: true });
  console.log("🤖 Messenger bot is online...");

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    if (event.type !== "message" || !event.body) return;

    const args = event.body.trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    if (commands.has(commandName)) {
      try {
        commands.get(commandName).execute(api, event, args);
      } catch (e) {
        console.error("⚠️ Command error:", e);
      }
    }
  });
});