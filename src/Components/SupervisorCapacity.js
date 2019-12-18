// eslint-disable-next-line no-unused-vars
import React from 'react';
import WorkerChannel from './WorkerChannel';
// const TaskRouter = require('twilio-taskrouter');
import { Worker } from 'twilio-taskrouter'

export default class SupervisorCapacity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workerChannels: []
    }

    console.log(WorkerChannel)


    this.getWorkerChannels();

    window.log("this.state", this.state)
    window.log("this.props", this.props)
  }

  async getWorkerChannels() {
    window.log("TaskRouterWorker", Worker)
    // let twilioClient = Twilio(this.props.accountSid, this.props.authToken)
    // window.log(twilioClient.taskrouter.workspaces(this.props.workspace).workers(this.props.worker.sid).workerChannels.list())
  }

  render() {
    let containerStyle = { 
      paddingTop: '20px'
    }

    let headerStyle = {
      fontSize: "10px",
      fontWeight: "bold",
      letterSpacing: "2px",
      paddingLeft: "11px",
      alignItems: "center",
      height: "24px",
      textTransform: "uppercase",
      color: "rgb(34, 34, 34)",
      flex: "0 0 auto",
      borderStyle: "solid",
      borderWidth: "0px 0px 1px",
      borderColor: "rgb(198, 202, 215)",
    }

    let bodyStyle = {
      padding: "12px 12px 12px 12px",
      position: "relative",
      overflowX: "hidden",
      display: "flex",
      flexWrap: "nowrap",
      flexGrow: 0,
      flexShrink: 0,
      flexDirection: "column",
    }

    return <div style={containerStyle}>
      <div class="Twilio-WorkerCanvas-SectionHeader" style={headerStyle}>
        Channel Capacity
      </div>

      <div style={bodyStyle}>
        
      </div>
    </div>
  }
}