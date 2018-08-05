import React from 'react'
import Card from '@components/card'

function DSOOtherInfo() {
  return (
    <Card title="Other Information">
      <div>
        <p>Name of website / mobile application proposed to be used</p>
        <b><p>Drizzly</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Date of incorporation of applicant, if it's a company</p>
        <b><p>20/10/2010</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Date of commenement of business</p>
        <b><p>22/10/2010</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Name and address of each of its directors / partners / managers / principal officers:</p>
        <b>
          <p>
            Karthik Pasagada, Millers road, vasanth nagar, near bhagwan mahaveer jain hospital, kaverappa layout,
            bengaluru, karnataka 560052
          </p>
        </b>

        <b>
          <p style={{ marginTop: '20px' }}>
            Aravind Kumar, Millers road, vasanth nagar, near bhagwan mahaveer jain hospital, kaverappa layout,
            bengaluru, karnataka 560052
          </p>
        </b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Main business of applicant company / firm / other entity</p>
        <b><p>Food &amp; beverages</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Office address in karnataka</p>
        <b><p>6/1, promenade road, near coles park, frazer town, pulikeshi nagar, bengaluru, karnataka 560005</p></b>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>Contact details of chief executive officer with address, mobile number and email</p>
        <b>
          <p>
            Karthik Pasagada, Millers road, vasanth nagar, near bhagwan mahaveer jain hospital, kaverappa layout,
            bengaluru, karnataka 560052
          </p>
        </b>
        <b>
          <p style={{ marginTop: '20px' }}>k.pasagada@gmail.com, +919876543210</p>
        </b>
      </div>
    </Card>
  )
}

export default DSOOtherInfo
