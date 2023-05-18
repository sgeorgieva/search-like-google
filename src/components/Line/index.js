import styled from 'styled-components'

export const Line = styled.div`
  &::after {
  position: absolute;
  content: '';
  background-color: #70757a;
  width: 0.2px;
  height: 50%;
  top: 50%;
  left: 85%;
  transform: translate(-85%, -50%);
}`;