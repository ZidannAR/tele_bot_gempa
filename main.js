const TelegramBot = require("node-telegram-bot-api");

const token = "7935035213:AAFIsLqr3pbjy6l1fn5ogMNiH_X3rH30_6o";

const options = {
  polling: true,
};

const cuybot = new TelegramBot(token, options);

// cuybot.on("message", (callback) => {
//        const id = callback.from.id
//        cuybot.sendMessage(id ,"hello pak siap hati hati")
// })

const prefix = ".";

const sayHi = new RegExp(`^${prefix}halo$`);

const gempa = new RegExp(`^${prefix}gempa$`);

cuybot.onText(sayHi, (callback) => {
  cuybot.sendMessage(callback.from.id, "halo juga!");
});

cuybot.onText(gempa, async (callback) => {
  const BMKG = "https://data.bmkg.go.id/DataMKG/TEWS/";

  const apicall = await fetch(BMKG + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap },
    },
  } = await apicall.json();
  const BMKG_image = BMKG + Shakemap;
  const resultText = `
       Waktu: ${Tanggal} | ${Jam}
       Besaran: ${Magnitude} SR
       Wilayah: ${Wilayah}
       Potensi: ${Potensi}
       Kedalaman: ${Kedalaman}
       `;

  cuybot.sendPhoto(callback.from.id, BMKG_image, {
    caption: resultText,
  });
});
