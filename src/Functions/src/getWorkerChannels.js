const TokenValidator = require('twilio-flex-token-validator').functionValidator;

//  ============================================================================
//  = getWorkerChannels                                                        =
//  = -----------------                                                        =
//  = Gets all WorkerChannels for a given Worker                               =
//  ============================================================================
exports.handler = TokenValidator(async function(context, event, callback) {
  let response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS GET');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Make sure that required API values are sent
  if (!event.workerSid) {
    response.setStatusCode(400)
    response.setBody({ success: false, error: "Required fields not sent." });
    return callback(null, response);
  }

  // Make sure that this user is allowed to perform this action
  if (!(event.TokenResult.roles.includes('supervisor') || event.TokenResult.roles.includes('admin'))) {
    response.setStatusCode(403)
    response.setBody({ success: false, error: "User does not have the permissions to perform this action." });
    return callback(null, response);
  }

  let client = context.getTwilioClient();

  let workerChannels = await client
    .taskrouter
    .workspaces(context.TWILIO_WORKSPACE_SID)
    .workers(event.workerSid)
    .workerChannels
    .list();

  response.setBody({ success: true, workerChannels: workerChannels });
  return callback(null, response);
});