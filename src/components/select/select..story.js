import React from 'react'
import { storiesOf } from "@storybook/react"
import Select from './index'

storiesOf("Select", module).add("Default", () => (
  <Select
    onChange={(item) => console.log(item)}
    options={[
      { text: 'One', value: 1, disabled: true },
      { text: 'Two', value: 2 },
      { text: 'Three', value: 3 }
    ]}
  />
))