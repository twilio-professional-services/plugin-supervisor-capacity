import { styled } from '@twilio/flex-ui';

export const Row = styled('div')`
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-flex: 0;
  flex-grow: 0;
  flex-shrink: 1;
  flex-direction: row;
  padding-bottom: 10px;
  margin-bottom: 10px;
  align-items: center;
  border-bottom: 1px dashed #ddd;
`

export const Name = styled('div')`
  display: inline-flex;
  margin-right: 16px;
  overflow-x: hidden;
  flex: 1 1 auto;
  align-items: center;
`

export const Capacity = styled('div')`
  display: flex;
  flex-wrap: nowrap;
  -webkit-box-flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: row;

  input {
      width: 56px;
  }
`

export const Reset = styled('div')`
  display: flex;
  margin-left: 12px;
  flex: 0 0 28px;
  cursor: pointer;
  &:hover {
    fill: green;
  }
`