import styled from 'react-emotion';

export const SectionHeader = styled('div')`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  padding-left: 11px;
  align-items: center;
  height: 24px;
  text-transform: uppercase;
  color: rgb(34, 34, 34);
  flex: 0 0 auto;
  border-style: solid;
  border-width: 0px 0px 1px;
  border-color: rgb(198, 202, 215);
`;


export const Container = styled('div')`
  padding-top: 20px;
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    div {
      cursor: not-allowed;
    }
    input {
      cursor: not-allowed;
    }
  }
`

export const WorkerChannelsContainer = styled('div')`
  margin: 12px 12px 12px 12px;
  position: relative;
`

export const ButtonsContainer = styled('div')`
  margin-top: 32px;
  padding-left: 12px;
  padding-right: 12px;
  overflow-x: hidden;
  overflow-y: auto;
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row;
`

export const SaveButton = styled('button')`
  align-self: center;
  height: 28px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  white-space: nowrap;
  color: rgb(255, 255, 255);
  padding: 0px 16px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  background: linear-gradient(to top, rgb(25, 118, 210), rgb(25, 118, 210));
  outline: none;
  border-radius: 0px;
  text-transform: uppercase;
  margin-left: 6px;
  margin-right: 6px;
  min-width: 100px;
  &:disabled {
    opacity: 0.5;
  }
`

export const ResetButton = styled('button')`
  align-self: center;
  height: 28px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  white-space: nowrap;
  color: rgb(34, 34, 34);
  padding: 0px 16px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  background: linear-gradient(to top, rgb(217, 220, 228), rgb(217, 220, 228));
  outline: none;
  border-radius: 0px;
  text-transform: uppercase;
  margin-left: 6px;
  margin-right: 6px;
  min-width: 100px;
  &:disabled {
    opacity: 0.5;
  }
`