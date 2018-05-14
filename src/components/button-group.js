import React from 'react'
import Button from './button'
import styled from 'styled-components'

const ButtonGroup = props => (
  <ButtonGroupElement {...props}>
    { props.children }
  </ButtonGroupElement>
)

const ButtonGroupElement = styled.div`
  display: flex;
`

export default ButtonGroup
