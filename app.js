const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const login = require("ws3-fca");

const app = express();
const PORT = process.env.PORT || 3000;
const commands = new Map();
const commandDir = path.join(__dirname, "commands");

app.use(express.static("public"));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

fs.readdirSync(commandDir).forEach(file => {
  if (file.endsWith(".js")) {
    const command = require(path.join(commandDir, file));
    commands.set(command.name, command);
  }
});

function startBot(appState) {
  login({ appState }, (err, api) => {
    if (err) return console.error("Login error:", err);

    api.setOptions({ listenEvents: true, selfListen: true });
    console.log("🤖 Bot is live");

    api.listenMqtt((err, event) => {
      if (err) return console.error(err);
      if (event.type !== "message" || !event.body) return;

      const args = event.body.trim().split(/\s+/);
      const commandName = args.shift().toLowerCase();
      if (commands.has(commandName)) {
        try {
          commands.get(commandName).execute(api, event, args);
        } catch (e) {
          console.error("Command error:", e);
        }
      }
    });
  });
}

app.post("/upload", upload.single("appstate"), (req, res) => {
  const content = fs.readFileSync(req.file.path, "utf8");
  try {
    const appState = JSON.parse(content);
    fs.writeFileSync("appstate.json", JSON.stringify(appState, null, 2));
    startBot(appState);
    res.send("✅ Login successful. Bot started.");
  } catch (err) {
    res.status(400).send("❌ Invalid appstate file.");
  }
});

app.get("/commands", (req, res) => {
  const cmds = Array.from(commands.values()).map(c => ({
    name: c.name,
    description: c.description
  }));
  res.json(cmds);
});

app.listen(PORT, () => console.log(`🌍 UI on http://localhost:${PORT}`));