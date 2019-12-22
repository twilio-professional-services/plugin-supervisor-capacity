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

export default class WorkerChannelPanel extends React.Component {
  constructor(props) {
    super(props);
    // window.log(this.state, this.props)
    this.state = {
      capacity: this.props.workerChannel.configuredCapacity,
      workerChannel: this.props.workerChannel,
      saving: false,
    }
  }

  componentDidMount() {
    this.props.addResetFunction(this.reset.bind(this));
    this.props.addSaveFunction(this.save.bind(this));
  }

  handleChange(newCapacity) {
    this.setState({capacity: newCapacity}, () => {
      this.props.setWorkerChannelChanged(this.state.workerChannel.sid, this.state.workerChannel.configuredCapacity !== this.state.capacity )
    })
  }

  onCapacityChange(event) {
    if (event.target.value === "") {
      this.handleChange(null)
    } else if (!isNaN(event.target.value)) {
      this.handleChange(parseInt(event.target.value))
    }
  }

  onCapacityBlur(event) {
    if (event.target.value === "" || event.target.value === null || event.target.value < 0) {
      this.handleChange(0);
    } else if (event.target.value > 50) {
      this.handleChange(50);
    }
  }

  reset() {
    this.handleChange(this.state.workerChannel.configuredCapacity);
  }

  async save() {
    if (this.state.workerChannel.configuredCapacity !== this.state.capacity) {
      try {
        let axiosBody = {
          workerSid: this.state.workerChannel.workerSid,
          workerChannelSid: this.state.workerChannel.sid,
          capacity: this.state.capacity
        }
        let axiosOptions = {
          params: {
            Token: this.props.token,
          },
          headers: {
              'Content-Type': 'application/json',
          }
        }
        let url = Url.resolve(this.props.runtimeDomain, 'setWorkerChannelCapacity')
        await this.setState({saving: true})
        let response = await Axios.post(url, axiosBody, axiosOptions);
        await this.setState({saving: false});

        if (!response || !response.data) {
          throw new Error("No response from server")
        } else if(!response.data.workerChannel) {
          throw new Error("Worker has no WorkerChannels")
        }

        await this.setState({workerChannel: response.data.workerChannel})
        await this.props.setWorkerChannelChanged(this.state.workerChannel.sid, this.state.workerChannel.configuredCapacity !== this.state.capacity )
      } catch(e) {
        window.err("Error Saving Worker Channel: ", e)
      }

    }
  }

  render() {
    return <Row>
      <Name>{this.state.workerChannel.taskChannelUniqueName}</Name>
      <Capacity><input disabled={this.state.saving} type="text" value={this.state.capacity} onBlur={this.onCapacityBlur.bind(this)} onChange={this.onCapacityChange.bind(this)} /></Capacity>
      {(() => {
        if (this.state.workerChannel.configuredCapacity !== this.state.capacity) {
          return <Reset onClick={this.reset.bind(this)}>
            <ReloadIcon />
          </Reset>
        } else {
          return <Reset />
        }
      })()}
    </Row>
  }
}