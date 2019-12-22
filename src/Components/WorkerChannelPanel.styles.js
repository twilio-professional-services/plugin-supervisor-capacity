import styled from 'react-emotion';

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
      color: #222222;
      border: 1px solid #C6CAD7;
      font-size: 12px;
      box-shadow: none;
      box-sizing: border-box;
      line-height: 16px;
      padding-top: 7px;
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 7px;
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