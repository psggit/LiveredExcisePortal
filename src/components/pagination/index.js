import React from "react"
import Icon from '@components/icon'

class Pagination extends React.Component {
  constructor() {
    super()
    this.state = {
      pager: {},
      activePageSize: this.props && this.props.pageSize 
        ? this.pageSizeOptions.find(item => item.text === this.props.pageSize.toString()).value 
        : 1
    }

    this.pageSizeOptions = [
      {
        text: "10",
        value: "1"
      },
      {
        text: "9",
        value: "2"
      },
      {
        text: "8",
        value: "3"
      },
      {
        text: "7",
        value: "4"
      },
      {
        text: "6",
        value: "5"
      },
      {
        text: "5",
        value: "6"
      },
      {
        text: "4",
        value: "7"
      },
      {
        text: "3",
        value: "8"
      },
      {
        text: "2",
        value: "9"
      },
      {
        text: "1",
        value: "10"
      }
    ]

    this.updateActivePage = this.updateActivePage.bind(this)
    this.updatePageSize = this.updatePageSize.bind(this)
  }

  componentDidMount() {
    const { pageSize, totalItemsCount, activePage } = this.props
    if (activePage) {
      this.setState({
        pager: { 
          activePage,
          totalItemsCount,
          pageSize
        },
        activePageSize: this.pageSizeOptions.find(item => item.text === pageSize.toString()).value
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageSize, totalItemsCount, activePage } = this.props;
    if (this.props.activePage !== prevProps.activePage || this.props.totalItemsCount !== prevProps.totalItemsCount) {
      this.setState({
        pager: { 
          activePage,
          totalItemsCount,
          pageSize
        },
        activePageSize: this.pageSizeOptions.find(item => item.text === pageSize.toString()).value
      })
    }
  }

  updateActivePage(activePage) {
    const { pageSize, totalItemsCount } = this.props

    if (Number.isInteger(totalItemsCount / pageSize)) {
      if (activePage < 1 || activePage > ((totalItemsCount / pageSize))) {
        return
      }
    } else {
      if (activePage < 1 || activePage > ((totalItemsCount / pageSize) + 1)) {
        return
      }
    }
  
    let newPager = { ...this.state.pager } 
    newPager.activePage = activePage                       
    this.setState({
      pager: newPager,
      activePageSize: this.pageSizeOptions.find(item => item.text === pageSize.toString()).value
    },
    () => {
      this.props.onChangePage(this.state.pager)
    })
  }

  updatePageSize(e) {
    const selectedValue = this.pageSizeOptions.find(item => item.value === e.target.value).text
    const { totalItemsCount, activePage } = this.props
    if (activePage < 1) {
      return
    }
    let newPager = { ...this.state.pager }
    newPager.pageSize =  parseInt(selectedValue)
    newPager.activePage =  1                           
    this.setState({ pager: newPager, activePageSize: e.target.value }, () => {
      this.props.onChangePage(this.state.pager)
    })
  }

  render() {
    const { activePage, pageSize, totalItemsCount } = this.state.pager
    return (
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}
      >   
        <div>
          <div style={{ display: 'inline-block', marginRight: '10px' }}>
            <select 
              onChange={e => this.updatePageSize(e)}
              value={this.state.activePageSize}
              style={{ 
                height: '24px',
                border: 'none', 
                width: '60px', 
                color: '#152935',
                fontSize: '14px',
                lineHeight: '1.29',
                padding: '0 5px',
                backgroundColor: 'rgba(61, 112, 178, 0.1)'
              }}
            >
              {
                this.pageSizeOptions.map((item, i) => {
                  return <option key={i} value={item.value}>{item.text}</option>
                })
              }
            </select>
          </div>
          <div style={{display: 'inline-block'}}>
            <span
              style={{
                fontSize: '12px',
                lineHeight: '1.25',
                color: '#5a6872'
              }}
            >
              Items per page | {pageSize * activePage > totalItemsCount ? totalItemsCount - ((totalItemsCount % pageSize) - 1) : ((pageSize * activePage) - (pageSize - 1))} - {pageSize * activePage > totalItemsCount ? totalItemsCount : pageSize * activePage} of {totalItemsCount} items
            </span>
          </div>
        </div>
       
        <div >
          <span style={{
            marginRight: '20px',
            fontSize: '12px',
            lineHeight: '1.25',
            color: '#5a6872'
          }}
          > 
            {activePage} of {Math.ceil(totalItemsCount/pageSize)} pages 
          </span>

          <span  
            onClick={() => this.updateActivePage(parseInt(activePage)-1)}
            style={{cursor: 'pointer'}}
          >
            <Icon name="leftArrow"/>
          </span>

          <span 
            style={{
              margin: '30px',
              // width: '26px',
              height: '24px',
              padding: '3px 10px',
              fontSize: '14px',
              color: '#152935',
              backgroundColor: 'rgba(61, 112, 178, 0.1)'
            }}
          > 
            {activePage} 
          </span>

          <span  
            onClick={() => this.updateActivePage(parseInt(activePage)+1)}
            style={{cursor: 'pointer'}}
          >
            <Icon name="rightArrow"/>
          </span>

        </div>
      </div>
    )
  }
}

export default Pagination