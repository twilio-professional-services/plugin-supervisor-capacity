// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FlexPlugin } from 'flex-plugin';
import * as Mods from './Mods'

import SupervisorCapacity from './Components/SupervisorCapacity';

const PLUGIN_NAME = 'SupervisorCapacityPlugin';

export default class Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    Mods.applyMods(flex, manager, {
      addPhoneNumber: true,
      addWindowLog: true,
      addCustomTaskList: false,
    });

    flex.WorkerCanvas.Content.add(<SupervisorCapacity key="supervisor-capacity" workspace={manager.serviceConfiguration.taskrouter_workspace_sid} accountSid={manager.serviceConfiguration.account_sid} authToken={manager.user.token}/>)
  }

}