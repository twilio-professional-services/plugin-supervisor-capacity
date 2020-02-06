// eslint-disable-next-line no-unused-vars
import React from 'react';
import Url from 'url'
import Axios from 'axios';

import {
  Row,
  Name,
  Capacity,
  Reset,
} from './WorkerChannelPanel.styles'

import ReloadIcon from './ReloadIcon'


//  ============================================================================
//  = WorkerChannelPanel                                                       =
//  = ------------------                                                       =
//  = Renders a row for a single WorkerChannel. Styling is                     =
//  = done via React Emotion                                                   =
//  =                                                                          =
//  = https://www.twilio.com/docs/flex/creating-styling-custom-components      =
//  ============================================================================
export default class WorkerChannelPanel extends React.Component {
  constructor(props) {
    super(props);

    // `capacity` is instantiated as the initial capacity and updated via the UI
    // `workerChannel` is this component's raw WorkerChannel
    // `saving` is a boolean to track whether this component is currently saving
    this.state = {
      capacity: this.props.workerChannel.configuredCapacity,
      workerChannel: this.props.workerChannel,
      saving: false,
    };
  }

  /**
   * Send this component's Reset and Save functions to the supercomponent
   */
  componentDidMount() {
    this.props.addResetFunction(this.reset.bind(this));
    this.props.addSaveFunction(this.save.bind(this));
  }

  /**
   * Receives a new capacity value, then updates this component's state and 
   * notifies the supercomponent
   * 
   * @param  {integer} newCapacity - The newly-set Capacity value
   */
  handleChange(newCapacity) {
    this.setState({ capacity: newCapacity }, () => {
      this.props.setWorkerChannelChanged(this.state.workerChannel.sid, this.state.workerChannel.configuredCapacity !== this.state.capacity);
    });
  }

  /**
   * Input change handler. Coerces the value into an int and sends that to
   * handleChange
   * 
   * @param  {event} event - the UI event
   */
  onCapacityChange(event) {
    if (event.target.value === "") {
      this.handleChange(null);
    } else if (!isNaN(event.target.value)) {
      this.handleChange(parseInt(event.target.value));
    }
  }

  /**
   * Input off-focus handler. Forces the Capacity value to the expected range
   * 
   * @param  {event} event - the UI event
   */
  onCapacityBlur(event) {
    if (event.target.value === "" || event.target.value === null || event.target.value < 0) {
      this.handleChange(0); // min value = 0
    } else if (event.target.value > 50) {
      this.handleChange(50); // max value = 50
    }
  }

  /**
   * Sets this Component's capacity to its original value
   */
  reset() {
    this.handleChange(this.state.workerChannel.configuredCapacity);
  }

  /**
   * Stores this component's Capacity in Twilio.
   */
  async save() {
    if (this.state.workerChannel.configuredCapacity !== this.state.capacity) {
      await this.setState({ saving: true }); // Start out with a `true` saving state

      try {
        let axiosBody = {
          workerSid: this.state.workerChannel.workerSid,
          workerChannelSid: this.state.workerChannel.sid,
          capacity: this.state.capacity
        };
        let axiosOptions = {
          params: {
            Token: this.props.token,
          },
          headers: {
            'Content-Type': 'application/json',
          }
        };
        let url = Url.resolve(this.props.runtimeDomain, 'setWorkerChannelCapacity');
        let response = await Axios.post(url, axiosBody, axiosOptions);

        if (!response || !response.data) {
          throw new Error("No response from server");
        } else if (!response.data.workerChannel) {
          throw new Error("Response incomplete");
        }

        await this.setState({ workerChannel: response.data.workerChannel }); // store our newly-recieved workerchannel
        // Notify the Supercomponent of our new Changed state
        await this.props.setWorkerChannelChanged(this.state.workerChannel.sid, this.state.workerChannel.configuredCapacity !== this.state.capacity);
      } catch (e) {
        console.error("Error Saving Worker Channel: ", e);
      } finally {
        await this.setState({ saving: false }); // End up with a `false` saving stateZ
      }

    }
  }

  /**
   * Render function
   */
  render() {
    return <Row >
      <
      Name > { this.state.workerChannel.taskChannelUniqueName } < /Name> <
      Capacity > < input disabled = { this.state.saving }
    type = "text"
    value = { this.state.capacity }
    onBlur = { this.onCapacityBlur.bind(this) }
    onChange = { this.onCapacityChange.bind(this) }
    /></Capacity > {
      (() => {
        if (this.state.workerChannel.configuredCapacity !== this.state.capacity) {
          return <Reset onClick = { this.reset.bind(this) } >
            <
            ReloadIcon / >
            <
            /Reset>
        } else {
          return <Reset / >
        }
      })()
    } <
    /Row>
  }
}