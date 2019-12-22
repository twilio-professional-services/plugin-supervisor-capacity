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

/*
  TODO
  ----

  - COMMENT COMMENT COMMENT
  - Error & edge case handling

*/

export default class SupervisorCapacity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workerChannels: [],
      changed: false,
      loading: true
    }

    this.saveFunctions = [];
    this.resetFunctions = [];

    this.getWorkerChannels();
  }

  setWorkerChannelChanged(workerChannelSid, changed) {
    this.workerChannelChanges[workerChannelSid] = changed;
    this.updateChanged();
  }

  addSaveFunction(fn) {
    this.saveFunctions.push(fn);
  }

  addResetFunction(fn) {
    this.resetFunctions.push(fn);
  }

  updateChanged() {
    let changed = Object.values(this.workerChannelChanges).includes(true);

    if (this.state.changed !== changed) {
      return this.setState({
        changed: changed
      });
    }
  }

  async getWorkerChannels() {
    try {
      let axiosOptions = {
        params: 
        {
          Token: this.props.token,
          workerSid: this.props.worker.sid
        }
      }
      let url = Url.resolve(this.props.runtimeDomain, 'getWorkerChannelCapacity')
      let response = await Axios.get(url, axiosOptions);

      if (!response || !response.data) {
        throw new Error("No response from server")
      } else if(!response.data.workerChannels) {
        throw new Error("Worker has no WorkerChannels")
      }

      await this.setState({workerChannels: []})
      this.workerChannelChanges = {}
      this.updateChanged()
      await this.setState({workerChannels: response.data.workerChannels})
      await this.setState({loading: false});

    } catch(e) {
      window.err("Error fetching Worker Channels: ", e)
    }
  }

  reset() {   
    this.resetFunctions.forEach((resetFunction) => {resetFunction()})
  }

  async save() {
    this.setState({loading: true})
    await Promise.all(this.saveFunctions.map((saveFunction) => {return saveFunction()}))
    this.setState({loading: false})
    // .then(this.getWorkerChannels.bind(this));
  }

  render() {
    if (this.state.workerChannels.length > 0) {
      return <Container>
        <SectionHeader>
          Channel Capacity
        </SectionHeader>

        <WorkerChannelsContainer className={this.state.loading ? "disabled" : "enabled"}>
          {this.state.workerChannels.map((workerChannel) => {
            return <WorkerChannelPanel
              token={this.props.token} 
              runtimeDomain={this.props.runtimeDomain} 
              addResetFunction={this.addResetFunction.bind(this)} 
              addSaveFunction={this.addSaveFunction.bind(this)} 
              workerChannel={workerChannel} 
              setWorkerChannelChanged={this.setWorkerChannelChanged.bind(this)}
            />
          })}
        </WorkerChannelsContainer>

        <ButtonsContainer>
          <SaveButton className="Twilio-Button" disabled={!this.state.changed || this.state.loading} onClick={this.save.bind(this)}>Save</SaveButton>
          <ResetButton className="Twilio-Button" disabled={!this.state.changed || this.state.loading} onClick={this.reset.bind(this)}>Reset</ResetButton>
        </ButtonsContainer>
      </Container>
    } else {
      return <Container>
        <SectionHeader>
          Channel Capacity
        </SectionHeader>
        <WorkerChannelsContainer>
          No Worker Channels available
        </WorkerChannelsContainer>
      </Container>
    }
  }
}