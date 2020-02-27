// eslint-disable-next-line no-unused-vars
import React from 'react';
import Url from 'url'
import Axios from 'axios';

import WorkerChannelPanel from './WorkerChannelPanel';
import {
  SectionHeader,
  Container,
  WorkerChannelsContainer,
  ButtonsContainer,
  SaveButton,
  ResetButton,
} from './SupervisorCapacity.styles'

//  ============================================================================
//  = SupervisorCapacity                                                       =
//  = ------------------                                                       =
//  = The base Component for the Supervisor Capacity plugin. Styling is        =
//  = done via React Emotion                                                   =
//  =                                                                          =
//  = https://www.twilio.com/docs/flex/creating-styling-custom-components      =
//  ============================================================================

export default class SupervisorCapacity extends React.Component {
  constructor(props) {
    super(props);

    // - We're going to store the raw WorkerChannels under State for the initial
    //   Render.
    // - `changed` will be used to enable/disable the save/reset buttons
    // - `loading` will also modify the buttons, as well as graying out the form
    this.state = {
      workerChannels: [],
      changed: false,
      loading: true
    };

    // We want each WorkerChannel subcomponent to handle its own state, but we
    // also want this component's Save/Reset buttons to work. Therefore, we will
    // need to save each subcomponent's save/reset functions in a list here
    this.saveFunctions = [];
    this.resetFunctions = [];

    // Pull this worker's WorkerChannels from the TwilioAPI (once set, this
    // should also trigger a re-render)
    this.getWorkerChannels();
  }

  /**
   * Builtin React Component Method that gets run whenever this component
   * updates. We're using it here to ensure that our workerChannels update
   * whenever a new worker is selected.
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.worker !== this.props.worker) {
      this.getWorkerChannels();
    }
  }

  /**
   * This function gets passed into WorkerChannel subcomponents. Each 
   * subcomponent can then use it to notify this Component of a change
   * 
   * @param {string}  workerChannelSid - the SID of the changed WorkerChannel
   * @param {boolean} changed - True/Fals, whether the WorkerChannel has changed
   */
  setWorkerChannelChanged(workerChannelSid, changed) {
    // The workerChannelChanges dict tracks changes in WorkerChannel
    // subcomponents
    this.workerChannelChanges[workerChannelSid] = changed;
    this.updateChanged();
  }

  /**
   * This function gets passed into WorkerChannel subcompenents. Each 
   * subcomponent can then send its Save functions up to this Component for use
   * by the Save Button
   *
   * Note: EVERY subcomponent's Save function will be called upon a Save. They
   * are expected to be lightweight, idempotent, and only hit the API when a
   * change is detected
   *
   * Why do it like this? 
   *  - Each WorkerChannel subcomponent can handle its own state
   *  - This component does not have to manage a complex system of WorkerChannel
   *    capacities/changes
   *  - The scale of WorkerChannels per Agent is practically limited. While this
   *    approach wouldn't be recommeded in most areas, it should be in an area
   *    with its own implied scaling limits.
   * 
   * @param {function} fn - The subcomponent's Save function
   */
  addSaveFunction(fn) {
    this.saveFunctions.push(fn);
  }

  /**
   * This function gets passed into WorkerChannel subcompenents.  Each 
   * subcomponent can then send its Reset functions up to this Component for use
   * by the Reset Button.
   *
   * Note: EVERY subcomponent's Reset function will be called upon a Reset. They
   * are expected to be lightweight, idempotent and not hit any API
   * 
   * @param {function} fn - The subcomponent's Reset function
   */
  addResetFunction(fn) {
    this.resetFunctions.push(fn);
  }

  /**
   * Determines whether any WorkerChannel subcomponents have changed using the
   * workerChannelChanges dict, then updates the `changed` state boolean
   */
  updateChanged() {
    let changed = Object.values(this.workerChannelChanges).includes(true);

    if (this.state.changed !== changed) {
      return this.setState({
        changed: changed
      });
    }
  }

  /**
   * Pulls this worker's WorkerChannels from the TwilioAPI, then updates this
   * component's State with the new workerChannels
   */
  async getWorkerChannels() {
    await this.setState({ loading: true }); // Start out with a `true` loading state

    try {

      let axiosOptions = {
        params: {
          Token: this.props.token,
          workerSid: this.props.worker.sid
        }
      };
      let url = Url.resolve(this.props.runtimeDomain, 'getWorkerChannels');

      let response = await Axios.get(url, axiosOptions);

      if (!response || !response.data) {
        throw new Error("No response from server");
      } else if (!response.data.workerChannels) {
        throw new Error("Worker has no WorkerChannels");
      }

      // Give us a blanks slate to work from
      await this.setState({ workerChannels: [] }); // Empty out the workerChannels
      this.workerChannelChanges = {}; // Empty out workerChannelChanges
      this.updateChanged(); // Set our changed state based on the above

      await this.setState({ workerChannels: response.data.workerChannels }); // Store our new WorkerChannels


    } catch (e) {
      console.error("Error fetching Worker Channels: ", e);
    } finally {
      await this.setState({ loading: false }); // End up with a `false` loading state

    }
  }

  /**
   * Iterates over all the stored workerChannel Reset functions and runs them
   */
  reset() {
    this.resetFunctions.forEach((resetFunction) => { resetFunction() });
  }

  /**
   * Iterates over all the stored workerChannel Save functions and runs them
   * also setting the `loading` state before and after the functions run
   */
  async save() {
    this.setState({ loading: true }); // Start out with a `true` loading state
    await Promise.all(this.saveFunctions.map((saveFunction) => { return saveFunction() }));
    this.setState({ loading: false }); // End up with a `false` loading state
  }

  /**
   * Render function
   */
  render() {
    if (this.state.workerChannels.length > 0) {
      return <Container>
        <SectionHeader>
        Channel Capacity
        </SectionHeader>

        <WorkerChannelsContainer className = { this.state.loading ? "disabled" : "enabled" } > {
            this.state.workerChannels.map((workerChannel) => {
              return <WorkerChannelPanel
              token = { this.props.token }
              runtimeDomain = { this.props.runtimeDomain }
              addResetFunction = { this.addResetFunction.bind(this) }
              addSaveFunction = { this.addSaveFunction.bind(this) }
              workerChannel = { workerChannel }
              setWorkerChannelChanged = { this.setWorkerChannelChanged.bind(this) }
              />
            })
          }
        </WorkerChannelsContainer>

        <ButtonsContainer>
          <SaveButton 
            className = "Twilio-Button"
            disabled = {!this.state.changed || this.state.loading }
            onClick = { this.save.bind(this) }
          >
            Save
          </SaveButton>
          <ResetButton
            className = "Twilio-Button"
            disabled = {!this.state.changed || this.state.loading }
            onClick = { this.reset.bind(this) }
          >
            Reset
          </ResetButton>
        </ButtonsContainer>
      </Container>
    } else if (this.state.loading) {
      return <Container>
        <SectionHeader>
          Channel Capacity
        </SectionHeader>
        <WorkerChannelsContainer>
          <span className = "pulsate" > ...loading </span>
        </WorkerChannelsContainer>
      </Container>
    } else {
      return <Container>
        <SectionHeader>
          Channel Capacity
        </SectionHeader>
        <WorkerChannelsContainer>
          No Worker Channels available
        </WorkerChannelsContainer>
      </Container >
    }
  }
}