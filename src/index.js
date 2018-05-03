// import _ from 'lodash'
// import printMe from './print'
import './style.scss'
import { cube } from './math.js'
// import imgSrc from './../images/bg.jpg'

function component() {
  // var element = document.createElement('div');
  // var btn = document.createElement('button')
var element = document.createElement('pre')
  // Lodash, currently included via a script, is required for this line to work
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = ['Hello webpack', '5 cubed is equal to ' + cube(5)].join('\n\n')
  // element.classList.add('hello')
  // btn.onclick = printMe
  // element.appendChild(btn)
  return element;
}

// if (module.hot) {
//   module.hot.accept('./print.js', () => {
//     console.log('Accepting the updated printMe module')
//     printMe()
//   })
// }

document.body.appendChild(component())
