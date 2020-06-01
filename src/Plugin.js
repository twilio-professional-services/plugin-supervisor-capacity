// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FlexPlugin } from 'flex-plugin';
import PluginConfig from './config'

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
    const getToken = () => {
      return manager.store.getState().flex.session.ssoTokenPayload.token;
    }

    flex.WorkerCanvas.Content.add( < SupervisorCapacity key = "supervisor-capacity"
      runtimeDomain = { PluginConfig.runtimeDomain }
      token = { getToken }
      />)

    }

  }