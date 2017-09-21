const telegramBot = require("node-telegram-bot-api");
const request = require("request");

const token = "400586811:AAG92fW0FYoyvZXB_pftmjT3VRHTvFQeu0E";
const bot = new telegramBot(token, { polling: true });

const receiver = 243120788;
const trackCode = "CF320820609DE";
var lastUpdateDate = null;

const trackLoop = setInterval(() => {
  request(
    "https://www.pochta.ru/tracking?p_p_id=trackingPortlet_WAR_portalportlet&p_p_lifecycle=2&p_p_resource_id=getList&barcodeList=" +
      trackCode,
    function(error, response, body) {
      let lastStatus = JSON.parse(body).list[0].trackingItem
        .trackingHistoryItemList[0];
      if (lastUpdateDate != lastStatus.date) {
        lastUpdateDate = lastStatus.date;
        bot.sendMessage(
          receiver,
          lastStatus.humanStatus +
            "\n" +
            lastStatus.description +
            "\n<i>" +
            lastStatus.date +
            "</i>",
          { parse_mode: "html" }
        );
      }
    }
  );
}, 600000);
