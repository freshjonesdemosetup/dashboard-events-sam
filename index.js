var ApiBuilder = require('claudia-api-builder');
const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");

api = new ApiBuilder();

module.exports = api;

api.post('/api/event', function (request) {
  const client = new EventBridgeClient({ region: "us-east-1" });

  const events = [
      {
          Source: "spaces.dashboard.events",
          DetailType: "SpacesDashboardEvent",
          Detail: JSON.stringify(request.body)
      }
  ];

  const putEventsCommand = new PutEventsCommand({ Entries: events });

  return client
    .send(putEventsCommand)
    .then(function (data) {
      return data
    }).catch(function (error) {
      return error;
    });

});