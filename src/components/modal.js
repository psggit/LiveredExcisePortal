import React from 'react'
import styled from 'styled-components'
import Button from './button'
import ButtonGroup from './button-group'
import PropTypes from 'prop-types'
import Overlay from './overlay'

const ModalBoxFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  button {
    margin: 0 5px;
  }
`

const ModalBoxTitleBar = styled.div`
  display: flex;
  font-weight: 600;
  justify-content: center;
  padding: 20px;
  padding-bottom: 0;
`

const ModalBoxBody = styled.div`
  padding: 20px;
  color: #333;
  border-bottom: 1px solid #DDD;
`

const ModalBox = props => (
  <Overlay {...props}>
    <ModalBoxElement>
      <ModalBoxTitleBar>
        <h4>{props.title}</h4>
      </ModalBoxTitleBar>
      <ModalBoxBody>{props.children}</ModalBoxBody>
      <ModalBoxFooter>
        <ButtonGroup>
          <Button size="small" appearance="primary">ok</Button>
          <Button size="small">cancel</Button>
        </ButtonGroup>
      </ModalBoxFooter>
    </ModalBoxElement>
  </Overlay>
)

const ModalBoxElement = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 400px;
  border-radius: 4px;
  background: #fff;
  font-family: 'Roboto', sans-serif;
  h4 {
    font-family: 'Montserrat', sans-serif;
  }
`

ModalBox.propTypes = {
  title: PropTypes.string.isRequired
}

export default ModalBox
