import { styled } from '@twilio/flex-ui';
import { keyframes } from '@emotion/react';

export const SectionHeader = styled('div')`
  flex: 0 0 auto;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  margin: 1.25rem 1rem 0.5rem;
  padding: 0.5rem 0px;
  border-bottom: 1px solid rgb(202, 205, 216);
  color: rgb(18, 28, 45);
`;


export const Container = styled('div')`
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

let PulsateCSS = keyframes`
  0% { 
    opacity: 0;
  }
  50% { 
    opacity: 1.0;
  }
  100% { 
    opacity: 0;
  }
`

export const WorkerChannelsContainer = styled('div')`
  margin: 0.5rem 1rem;
  position: relative;
  .pulsate {
    animation: ${PulsateCSS} 1s ease infinite;
  }
`
