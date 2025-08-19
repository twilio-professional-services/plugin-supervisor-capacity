# Notice - Legacy Code

**This plugin is no longer maintained and has been migrated to the [Flex Plugin Library](https://www.twilio.com/docs/flex/developer/plugins/plugin-library) where it is available as an out-of-box feature. The plugin is also available as part of the customizable [Flex Project Template](https://github.com/twilio-professional-services/flex-project-template), where it is an optional feature.**

# Flex Supervisor Capacity Plugin

This plugin implements a *Channel Capacity* panel in the [Twilio Flex](https://www.twilio.com/flex) [Supervisor View](https://www.twilio.com/docs/flex/monitor-agent-activity). It includes code for [Twilio Functions](https://www.twilio.com/docs/runtime/functions) as well as frontend UI code in the form of a [Flex plugin](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin).

![Plugin Demo](https://github.com/twilio-professional-services/plugin-supervisor-capacity/blob/media/supervisor-capacity-recording.gif)

**For the unmaintained Flex UI 2.x version of this plugin, see [the flex-ui-v2 branch](https://github.com/twilio-professional-services/plugin-supervisor-capacity/tree/flex-ui-v2).**

## Setup

### Prerequisites
Before beginning with this Flex plugin, you'll want to make sure that:
- You have a working [Twilio Flex](https://www.twilio.com/flex) account
- You have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed
  - `npm` generally gets installed along with Node.js, but make sure you have it anyway
- You have the latest [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) installed
- Your Twilio CLI is running the latest [Serverless Plugin](https://github.com/twilio-labs/plugin-serverless) 

### Configuration
Over the course of the configuration process, you'll need several values from your Twilio account. The first three can be found right now in the Twilio Console, but the last one will require you to deploy your Twilio Functions to find (Don't worry, we'll cover that!)

- Account SID
  - Found on the [Twilio Console Homepage](https://www.twilio.com/console)
  - String starting with "AC..."
- Auth Token
  - Found on the [Twilio Console Homepage](https://www.twilio.com/console)
  - Secure string of 32 characters that we'll call "blah..." for the sake of communication
- Workspace ID
  - Found in your [TaskRouter Dashboard](https://www.twilio.com/console/taskrouter/dashboard)
  - String starting with "WS..."
- Serverless Runtime Domain
  - We'll grab this after we've deployed our Twilio Functions
  - A web domain that looks something like "foobar-xxx-dev.twilio.io"
  
We'll be entering these values into three files, some of which don't exist yet:
- public/appConfig.js
- src/Functions/.env
- src/config.js

#### public/appConfig.js
To kick things off, rename the example app configuration file to remove `.example`, then open it in your editor of choice

```bash
mv public/appConfig.example.js public/appConfig.js

vim public/appConfig.js
```

You'll notice that this file has a temporary string variable for your Account Sid. Replace that string with your actual value.

```javascript
# Before:
var accountSid = 'accountSid';

# After
var accountSid = 'AC...';
```
#### src/Functions/.env
Next, we'll need to configure the environment variables for the Twilio Functions. Start by renaming the environment file to remove `.example` and opening it with your editor:

```bash
mv src/Functions/.env.example src/Functions/.env

vim src/Functions/.env
```

Now, just like before, replace the temporary strings with your actual values

```
# Before
ACCOUNT_SID=accountSid
AUTH_TOKEN=authToken
TWILIO_WORKSPACE_SID=workspaceSid

# After
ACCOUNT_SID=AC...
AUTH_TOKEN=blah...
TWILIO_WORKSPACE_SID=WS...
```

#### Deploying Functions

Before we can configure the last file, we'll need to deploy our Twilio Functions and grab the Runtime Domain. To do so, we'll be using the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) and the [Serverless Plugin](https://github.com/twilio-labs/plugin-serverless) that you installed as a prerequisiste.

First off, make sure that you have authenticated according to the [Twilio CLI documentation](https://www.twilio.com/docs/twilio-cli/quickstart#login-to-your-twilio-account).

Then cd into the Functions directory and deploy them:

```bash
cd src/Functions
twilio serverless:deploy
```

Once everything gets deployed, your response should look something like this:

```bash
Deployment Details
Domain: foobar-xxx-dev.twilio.io
Service:
   plugin-supervisor-capacity-functions (ZS...)
Environment:
   dev (ZE...)
Build SID:
   ZB...
View Live Logs:
   Open the Twilio Console
Functions:
   https://foobar-xxx-dev.twilio.io/getWorkerChannels
   https://foobar-xxx-dev.twilio.io/setWorkerChannelCapacity
Assets:
```

The value we're looking for comes after `Domain:` – that's your Runtime Domain.

#### config.js

Now open `src/config.js` in your text editor. Notice the runtime domain set to a default value? Let's change that:

```javascript
# Before:
export default {
    runtimeDomain: "http://localhost:3000"
}

# After:
export default {
    runtimeDomain: "https://foobar-xxx-dev.twilio.io"
}

```

And now your plugin is fully configured! You can now run it locally to test and customize it, or build it into a package and upload it to your Twilio Assets for hosted use.

## Local Development/Deployment

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm install
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it in order to deploy it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example, `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.

## Disclaimer
This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.
