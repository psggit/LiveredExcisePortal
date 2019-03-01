import React from "react"
import "./filteredParams.scss"

const FilteredParams = ({data}) => {
  const textStyle={
    fontSize: '12px', 
    color: '#5a6872'
  }
  return (
    <div style={{display: 'flex', margin: '9px 0px', alignItems: 'center'}}>
      <p style={textStyle}>Filtered results</p>
      {
        data.map((item, i) => {
          return (
            <div key={i}>
              <span style={{margin: '0px 10px', fontSize: '12px'}}>|</span>
              {
                item.filterby !== "Order Amount" && 
                <span style={textStyle}>{item.value}</span>
              }
              {
                item.filterby === "Order Amount" && 
                <span style={textStyle}>₹ {item.lowerrange} - ₹ {item.upperrange}</span>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default FilteredParams