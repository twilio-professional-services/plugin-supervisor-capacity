const TokenValidator = require('twilio-flex-token-validator').functionValidator;

//  ============================================================================
//  = setWorkerChannelCapacity                                                 =
//  = ------------------------                                                 =
//  = Takes Sets a Worker's capacity on a given WorkerChannel                  =
//  ============================================================================
exports.handler = TokenValidator(async function(context, event, callback) {
  let response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Make sure that required API values are sent
  if (!event.workerSid || !event.workerChannelSid || isNaN(event.capacity)) {
    response.setBody({success: false, error: "Required fields not sent."});
    return callback(null, response);
  }

  // Make sure that this user is allowed to perform this action
  if (!(event.TokenResult.roles.includes('supervisor') || event.TokenResult.roles.includes('admin'))) {
    response.setStatusCode(403)
    response.setBody({success: false, error: "User does not have the permissions to perform this action."});
    return callback(null, response);
  }

  let client = context.getTwilioClient();

  let apiResponse = await client.taskrouter.workspaces(context.TWILIO_WORKSPACE_SID)
    .workers(event.workerSid)
    .workerChannels(event.workerChannelSid)
    .update({capacity: event.capacity});

  response.setBody({success: true, workerChannel: apiResponse});
  return callback(null, response);
});
