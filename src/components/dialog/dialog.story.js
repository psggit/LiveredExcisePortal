import React from 'react'
import { storiesOf } from '@storybook/react'
import Dialog from './index';
import OtpInput from './../otp-input'
import Button from './../button'

storiesOf('Dialog', module).add('Default', () => {
  return (
    <Dialog
      actions={[
        (
          <Button
            onClick={() => {
              alert('No is clicked')
            }}
            secondary
          >
          No
          </Button>
        ),
        (
          <Button
            onClick={() => {
              alert('Yes is clicked')
            }}
            primary
          >
          Yes
          </Button>
        )
      ]}
    >
      <p>
      Please enter the OTP sent to your registered phone number to confirm that you have made changes on the Rule Engine.
      </p>
      <div style={{ marginTop: '30px'  }}>
        <OtpInput />
      </div>
    </Dialog>
  )
})