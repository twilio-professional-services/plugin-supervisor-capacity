import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Axios from 'axios';
import React from 'react';

export default class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null
    }
    this.getPhoneNumber()
  }

  async getPhoneNumber() {
    try {
      let axiosOptions = {
        headers: 
        {
          "X-Flex-JWE": this.props.token,
        }
      }
      let response = await Axios.get("https://flex.twilio.com/sessions", axiosOptions);
      if (response.data && response.data.demoPhoneNumber) {
        this.setState({number: response.data.demoPhoneNumber});
      } else {
        window.err("Error: couldn't parse phone number from", response)
      }
    } catch(e) {
      window.err("Error fetching phone number: ", e)
    }

  }

  render() {
    let style = {
      fontSize: "30px",
    }
    let formattedNumber = ""
    if (this.state.number) {
      let parsedNumber = this.state.number ? parsePhoneNumberFromString(this.state.number) : "";
      formattedNumber = parsedNumber.formatInternational().split(" ").join(" · ")
    }
    return <div style={style}>{formattedNumber}</div>
  }
}