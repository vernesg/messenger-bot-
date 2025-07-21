const login = require("ws3-fca");

const appState = require("./appstate.json");

login({ appState }, (err, api) => {
  if (err) return console.error("Login failed:", err);

  api.setOptions({ listenEvents: true, selfListen: false });

  console.log("🤖 Bot is running...");

  const listen = api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    if (event.type === "message" && event.body) {
      const message = event.body.toLowerCase();

      if (message === "hi" || message === "hello") {
        api.sendMessage("👋 Hello! I'm your bot.", event.threadID);
      } else if (message === "help") {
        api.sendMessage("📖 Available commands:\n- hi\n- help", event.threadID);
      } else {
        api.sendMessage(`You said: ${event.body}`, event.threadID);
      }
    }
  });
});