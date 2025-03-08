const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = (to, body) => {
  client.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE_NUMBER
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.log(error));
};

module.exports = sendSms;