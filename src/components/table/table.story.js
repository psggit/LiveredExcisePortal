import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from '@auth0/cosmos' 
import { AvatarBlock } from "@auth0/cosmos"
// import Table from './index'
// import Icon from './../icon'

{/* <HBTable
          items={[
            {
              permit_id: 'TS-347783627771',
              issued_date: '2018.12.01',
              issued_time: '18:30 PM',
              dso_name: 'Swiggy',
              retailer_name: 'Tonique',
              city: 'Hyderabad',
              order_amount: 'Rs. 1500',
              permit_status: 'Active'
            },
            {
              permit_id: 'TS-347783627771',
              issued_date: '2018.12.01',
              issued_time: '18:30 PM',
              dso_name: 'Swiggy',
              retailer_name: 'Tonique',
              city: 'Hyderabad',
              order_amount: 'Rs. 1500',
              permit_status: 'Active' 
            },
            {
              permit_id: 'TS-347783627771',
              issued_date: '2018.12.01',
              issued_time: '18:30 PM',
              dso_name: 'Swiggy',
              retailer_name: 'Tonique',
              city: 'Hyderabad',
              order_amount: 'Rs. 1500',
              permit_status: 'Active' 
            }
          ]}
          onRowClick={(evt, item) => alert(`${item.name} was clicked!`)}
        >
          <HBTable.Column field="permit_id" title="Permit ID">
            {
              (item) => (
                <span style={{ color: '#3d70b2', fontWeight: 'bold' }}>{item.permit_id}</span>
              )
            }
          </HBTable.Column>
          <HBTable.Column field="issued_date" title="Date issued" />
          <HBTable.Column field="issued_time" title="Time issued" />
          <HBTable.Column field="dso_name" title="DSO" />
          <HBTable.Column field="retailer_name" title="Retailer" />
          <HBTable.Column field="city" title="City/Town" />
          <HBTable.Column field="order_amount" title="Order Amount" />
          <HBTable.Column field="permit_status" title="Permit Status">
            {
              (item) => (
                <div>
                  <Icon name="active-indicator" />
                  <span style={{ marginLeft: '5px' }}>{ item.permit_status }</span>
                </div>
              )
            }
          </HBTable.Column>
        </HBTable> */}

// storiesOf('Table', module).add('default', () => (
//   <Table
//   items={[
//     {
//       name: 'Harry Kane',
//       goals: 6,
//       assists: 0,
//       country: '🇬🇧',
//       image: 'https://twitter-avatar.now.sh/HKane'
//     },
//     {
//       name: 'Romelu Lukaku',
//       goals: 4,
//       assists: 1,
//       country: '🇧🇪',
//       image: 'https://twitter-avatar.now.sh/Romelu_lukaku9'
//     },
//     {
//       name: 'Antoine Griezmann',
//       goals: 4,
//       assists: 2,
//       country: '🇫🇷',
//       image: 'https://twitter-avatar.now.sh/AntoGriezmann'
//     },
//     {
//       name: 'Ivan Perišić',
//       goals: 3,
//       assists: 1,
//       country: '🇭🇷',
//       image: 'https://twitter-avatar.now.sh/ivanperisic44'
//     }
//   ]}
//   onRowClick={(evt, item) => alert(`${item.name} was clicked!`)}
// >
//   <Table.Column field="name" title="Name" width="30%">
//     {item => <AvatarBlock type="user" image={item.image} title={item.name} size="compact" />}
//   </Table.Column>
//   <Table.Column field="country" title="Country" />
//   <Table.Column field="goals" title="Goals" />
//   <Table.Column field="assists" title="Assists" />
// </Table>
// ))