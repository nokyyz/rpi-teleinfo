var teleinfo;
if (process.env.DEV==="true") {
  teleinfo = require("./fake-teleinfo");
} else {
  teleinfo = require("teleinfo");
}

var trameEvents = teleinfo("/dev/ttyAMA0");

var Stomp = require('stomp-client');

var destination = '/topic/electricity/metrics';
var user = process.env.ACTIVEMQ_USER;
var pass = process.env.ACTIVEMQ_PASSWORD;
var port = 61613;

var client = new Stomp('mq', port, user, pass);

client.connect(function(sessionId) {
  trameEvents.on("tramedecodee", function(data) {
    var metrics = { watts: data.PAPP, amperes: data.IINST, offpeak_hours_index: data.HCHC, peak_hours_index: data.HCHP, pricing_period: data.PTEC, date: new Date() };
    client.publish(destination, JSON.stringify(metrics));
  });
});
