import React from 'react'
import Card from '@components/card'

function DSOBasicInfo({ name }) {
  return (
    <Card title="Basic Applicant Information">
      <div>
        <p>Name of applicant</p>
        <b><p>{ name }</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>PAN card number</p>
        <b><p>AHDJE3929F</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Is this applicant firm or company</p>
        <b><p>Company</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>If company, is it private limited or public limited?</p>
        <b><p>Private limited</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Addess of registered office / principal offices</p>
        <b><p>6/1, promenade road, near coles park, frazer town, pulikeshi nagar, bengaluru, karnataka 560005</p></b>
      </div>
    </Card>
  )
}

export default DSOBasicInfo
