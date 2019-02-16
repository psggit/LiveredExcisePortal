import React from "react"
import Icon from '@components/icon'

class Pagination extends React.Component {
  constructor() {
    super()

    this.state = {
      pager: {}
    }

    //this.setPage = this.setPage.bind(this)
    this.updateActivePage = this.updateActivePage.bind(this)
    this.updatePageSize = this.updatePageSize.bind(this)
  }

  componentWillMount() {
    const { pageSize, totalItemsCount, activePage } = this.props;

    if (activePage) {
      //this.setPage(activePage)
      this.setState({
        pager: { 
          activePage: activePage,
          totalItemsCount: totalItemsCount,
          pageSize: pageSize
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageSize, totalItemsCount, activePage } = this.props;
    if (this.props.activePage !== prevProps.activePage) {
      this.setState({
        pager: { 
          activePage: activePage,
          totalItemsCount: totalItemsCount,
          pageSize: pageSize
        }
      });
    }
  }

  // setPage(page) {
  //   //console.log("activePage", page)
  //   var { pageSize, totalItemsCount, activePage } = this.props;
   
  //   if (page < 1 || page > (totalItemsCount/pageSize)) {
  //     return;
  //   }
  //   let newPager = { ...this.state.pager };    
  //   newPager.activePage = activePage;                       
  //   this.setState({ pager: newPager });

  //   this.props.onChangePage(this.state.pager);
  // }

  updateActivePage(activePage) {
    const { pageSize, totalItemsCount } = this.props;
    console.log("active page", activePage)
  
    if (activePage < 1 || activePage > ((totalItemsCount / pageSize) + 1)) {
      return;
    }
  
    let newPager = { ...this.state.pager };    
    newPager.activePage = activePage;                       
    this.setState({ pager: newPager }, () => {
      this.props.onChangePage(this.state.pager)
    });
  }

  updatePageSize(e) {
    const { totalItemsCount, activePage } = this.props
    if (activePage < 1 || e.target.value > totalItemsCount) {
      return;
    }
    let newPager = { ...this.state.pager };    
    newPager.pageSize =  parseInt(e.target.value);
    newPager.activePage =  1;                              
    //this.setState({ pager: newPager });
    this.setState({ pager: newPager }, () => {
      this.props.onChangePage(this.state.pager)
    });
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
          <div style={{'display': 'inline-block', marginRight: '10px'}}>
            <select 
              onChange={(e) => this.updatePageSize(e) }
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
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((item) => {
                  return <option value={item}>{item}</option>
                })
              }
            </select>
          </div>
          <div style={{'display': 'inline-block'}}>
            <span
              style={{
                fontSize: '12px',
                lineHeight: '1.25',
                color: '#5a6872'
              }}
            >
              Items per page | {pageSize*activePage > totalItemsCount ? totalItemsCount - ((totalItemsCount % pageSize) - 1) : ((pageSize*activePage) - (pageSize - 1))} - {pageSize*activePage > totalItemsCount ? totalItemsCount : pageSize*activePage} of {totalItemsCount} items
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
            onClick={() => this.updateActivePage(activePage-1)}
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
            onClick={() => this.updateActivePage(activePage+1)}
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