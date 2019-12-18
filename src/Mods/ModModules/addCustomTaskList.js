// eslint-disable-next-line no-unused-vars
import React from "react"

import CustomTaskListContainer from '../Components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from '../States';

export default {
  default: true,

  apply: (flex, manager) => {
    manager.store.addReducer(namespace, reducers);

    const options = { sortOrder: -1 };
    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<CustomTaskListContainer key="demo-component" />, options);
  }
}