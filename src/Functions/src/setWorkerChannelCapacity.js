const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function(context, event, callback) {
  console.log("context", context)
  console.log("event", event)
  let response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!event.workerSid || !event.workerChannelSid || isNaN(event.capacity)) {
    response.setBody({success: false})
    return callback(null, response);
  }

  if ((event.TokenResult.roles.includes('supervisor') || event.TokenResult.roles.includes('admin'))) {
    let client = context.getTwilioClient();

    let apiResponse = await client.taskrouter.workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(event.workerSid)
      .workerChannels(event.workerChannelSid)
      .update({capacity: event.capacity})

    response.setBody(JSON.stringify({success: true, workerChannel: apiResponse}))
  } else {
    response.setStatusCode(403);
    response.setBody("User does not have the permissions to perform this action.")
  }
  return callback(null, response)
});
