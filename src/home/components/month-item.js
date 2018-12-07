import React from 'react'

function MonthItem({ name, count }) {
  return (
    <div style={{
      padding: '10px',
      maxWidth: '130px',
      border: '1px solid #dfdfdf',
      borderRadius: '2px',
      fontSize: '14px',
      color: '#4a4a4a',
      marginBottom: '10px',
      marginRight: '10px',
      cursor: 'pointer'
    }}>
      <span>{ name }</span>
      <span
        style={{
        float: 'right',
        marginLeft: '10px',
        border: '1px solid #9b9b9b',
        borderRadius: '50%',
        display: 'inline-block',
        width: '22px',
        height: '22px',
        paddingLeft: '6px',
        color: '#9b9b9b',
        // backgroundColor: '#4a4a4a',
        }}>
        { count }
    </span>
    </div>
  )
}

export default MonthItem
