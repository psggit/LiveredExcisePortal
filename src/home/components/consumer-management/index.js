import React from "react"
import ConsumerLog from "./consumer-list"
import ConsumerComplaints from "./consumer-complaints"
import PageHeader from '@components/pageheader'
import { getQueryObj, getQueryUri } from "@utils/url-utils"

class Consumer extends React.Component {
  constructor() {
    super()

    this.state = {
      activeTab: "consumer-log"
    }
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
  }

  /**
  * Used to highlight the active tab
  * @param {String} activeTabName - Indicates the active tab name
  */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
    this.props.history.push(`/home/consumers?activeTab=${activeTabName}&activePage=1&limit=10`)
  }

  render() {
    const { activeTab } = this.state
    return (
      <React.Fragment>
        <PageHeader pageName={activeTab === "consumer-log" ? 'Consumer Log' : 'Consumer Complaints'} />
        <div style={{ display: 'flex', marginBottom: '40px', marginTop: '4px' }}>
          <ul className="nav">
            <li
              onClick={() => this.setActiveTab("consumer-log")}
              className={`${activeTab === "consumer-log" ? 'active' : ''}`}
            >
              <a>Consumer Log</a>
            </li>
            <li
              onClick={() => this.setActiveTab("consumer-complaints")}
              className={`${activeTab === "consumer-complaints" ? 'active' : ''}`}
            >
              <a>Consumer Complaints</a>
            </li>
          </ul>
        </div>
        {
          activeTab === "consumer-log" &&
          <ConsumerLog activePage={1} limit={10} />
        }
        {
          activeTab === "consumer-complaints" &&
          <ConsumerComplaints history={this.props.history} activePage={1} limit={10} />
        }
      </React.Fragment>
    )
  }
}

export default Consumer