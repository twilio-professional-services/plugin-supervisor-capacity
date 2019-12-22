const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function(context, event, callback) {
  console.log(context);
  console.log(event.TokenResult);

  let response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS GET');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (event.TokenResult.roles.includes('supervisor') || event.TokenResult.roles.includes('admin')) {
    let client = context.getTwilioClient();

    let workerChannels = await client
      .taskrouter
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .workers(event.workerSid)
      .workerChannels
      .list()

    workerChannels.forEach((workerChannel) => {
      console.log(workerChannel)
    })

    // console.lopg("wokerCHannels", workerChannels)
    response.setBody({success: true, workerChannels: workerChannels})
  } else {
    response.setStatusCode(403);
    response.setBody("User does not have the permissions to perform this action.")
  }

  return callback(null, response)
});
