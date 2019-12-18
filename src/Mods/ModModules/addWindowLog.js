// eslint-disable-next-line no-unused-vars
import React from "react"

export default {
  default: true,



  apply: (flex, manager) => {
    if (!window.log || !window.err || !window.logStartTime) {
      window.logStartTime = (new Date()).getTime()
      window.log = (...args) => {
        let diff = (new Date()).getTime() - window.logStartTime;
        console.log('%c▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎ DEVLOG ◀︎◀︎◀︎◀︎◀︎◀︎◀︎◀︎◀︎◀︎\n%c' + diff + 'ms\n', 'text-decoration: underline; background: #222; color: #00ff00', 'background: #222; color: #00ff00', ...args);
      }
      window.err = (...args) => {
        let diff = (new Date()).getTime() - window.logStartTime;
        console.log('%c▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎▶︎ DEVLOG ◀︎◀︎◀︎◀︎◀︎◀︎◀︎◀︎◀︎◀︎\n%c' + diff + 'ms\n', 'text-decoration: underline; background: #222; color: #ff0000', 'background: #222; color: #ff0000', ...args);
      }
    }

    window.log("Flex Version: " + flex.VERSION + "\nReact Version: " + React.version);
  }
}