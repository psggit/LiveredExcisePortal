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
    // reset page if items array has changed
    const { pageSize, totalItemsCount, activePage } = this.props;
    if (this.props.activePage !== prevProps.activePage) {
      //this.setPage(activePage);
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
  
    if (activePage < 1 || activePage > totalItemsCount / pageSize) {
      return;
    }
  
    let newPager = { ...this.state.pager };    
    newPager.activePage = activePage;                       
    this.setState({ pager: newPager });
  }

  updatePageSize(e) {
    const { totalItemsCount, activePage } = this.props
    if (activePage < 1 || e.target.value > totalItemsCount ) {
      return;
    }
    let newPager = { ...this.state.pager };    
    newPager.pageSize =  parseInt(e.target.value);                       
    this.setState({ pager: newPager });
  }

  render() {
    const { activePage, pageSize, totalItemsCount } = this.state.pager
    return (
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >   
        <div>
          <div style={{'display': 'inline-block', marginRight: '10px'}}>
            <select onChange={(e) => this.updatePageSize(e) }>
              {
                [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((item) => {
                  return <option value={item}>{item}</option>
                })
              }
            </select>
          </div>
          <div style={{'display': 'inline-block'}}>
            <span>Items per page | {activePage} - {pageSize*activePage} of {totalItemsCount} items</span>
          </div>
        </div>
       
        <div>
          <span style={{marginRight: '10px'}}> 
            {activePage} of {Math.ceil(totalItemsCount/pageSize)} pages 
          </span>

          <span  onClick={() => this.updateActivePage(activePage-1)}>
            <Icon name="paginationRight"/>
          </span>

          <span style={{margin: '10px'}}> {activePage} </span>

          <span  onClick={() => this.updateActivePage(activePage+1)}>
            <Icon name="paginationRight"/>
          </span>

        </div>
      </div>
    )
  }
}

export default Pagination