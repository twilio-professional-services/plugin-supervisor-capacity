// eslint-disable-next-line no-unused-vars
import React from "react"

import PhoneNumber from "../Components/PhoneNumber";

export default {
  default: true,

  apply: (flex, manager) => {
    flex.MainHeader.Content.add(<PhoneNumber key="phoneNumber" token={manager.user.token}/>, {
      sortOrder: -1, 
      align: "end"
    });
  }
}