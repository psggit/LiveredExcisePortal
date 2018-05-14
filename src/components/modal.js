import React from 'react'
import styled from 'styled-components'
import Button from './button'
import ButtonGroup from './button-group'

const ModalBoxFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 20px;
`

const ModalBoxTitleBar = styled.div`
  display: flex;
  font-weight: 600;
  border-bottom: 1px solid #DDD;
  padding: 20px;
`

const ModalBoxBody = styled.div`
  padding: 20px;
  color: #333;
  border-bottom: 1px solid #DDD;
`

const ModalBox = props => (
  <ModalBoxElement>
    <ModalBoxTitleBar>
      <h3>{props.title}</h3>
    </ModalBoxTitleBar>
    <ModalBoxBody>{props.children}</ModalBoxBody>
    <ModalBoxFooter>
      <ButtonGroup>
        <Button appearance="primary">ok</Button>
        <Button>cancel</Button>
      </ButtonGroup>
    </ModalBoxFooter>
  </ModalBoxElement>
)

const ModalBoxElement = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  border: 1px solid #DDD;
  font-family: 'Roboto', sans-serif;
  h3 {
    font-family: 'Montserrat', sans-serif;
  }
`

export default ModalBox
