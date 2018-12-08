// import React from 'react'
// import styled from 'styled-components'

// const appearances = {
//   default: {
//     color: '#333',
//     background: '#eaeaea',
//     border: '#eaeaea',
//     hoverColor: '#333',
//     hoverBackground: '#ddd'
//   },

//   primary: {
//     color: '#fff',
//     background: '#2F526A',
//     border: '#2F526A',
//     hoverColor: '#fff',
//     hoverBackground: '#2F526A'
//   }
// }

// const sizes = {
//   default: {
//     width: '132px',
//     height: '42px'
//   },

//   small: {
//     width: '100px',
//     height: '36px'
//   }
// }

// const getAttributes = (props) => {
//   const appearanceStyle = appearances[props.appearance] || appearances.default
//   const sizeStyle = sizes[props.size] || sizes.default
//   const styles = { ...appearanceStyle, ...sizeStyle }

//   return styles
// }

// const Button = ({ children, ...props }) => {
//   return <Button.Element {...props}>{children}</Button.Element>
// }

// Button.Element = styled.button`
//   cursor: pointer;
//   border-radius: 2px;
//   text-transform: uppercase;
//   border: 1px solid;
//   letter-spacing: 1px;
//   font-weight: bold;
//   border-color: ${props => getAttributes(props).border};
//   width: ${props => getAttributes(props).width};
//   height: ${props => getAttributes(props).height};
//   color: ${props => getAttributes(props).color};
//   background: ${props => getAttributes(props).background};

//   &:hover {
//     color: ${props => getAttributes(props).hoverColor};
//     background: ${props => getAttributes(props).hoverBackground};
//   }
//   &:focus {
//     outline: unset;
//   }
// `

// Button.defaultProps = {
//   size: 'default',
//   appearance: 'default',
//   icon: null,
//   disabled: false
// }

// export default Button
