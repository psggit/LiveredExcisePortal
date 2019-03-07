import React from "react"
import { Line } from "react-chartjs-2"

class LineChartGraph extends React.Component {
  constructor(){
    super() 
  }

  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          fill: false,
          label: this.props.tooltipText,
          data: this.props.values,
          borderColor: "#473793",
          backgroundColor: "#473793",
          pointRadius: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: "#473793",
          pointHoverBackgroundColor: "#fff",
          lineTension: 0
        }
      ]
    };

    const options = {
      tooltips: {
        displayColors: false,
        backgroundColor: "#fff",
        bodyFontColor: "#000",
        titleFontColor: "#5a6872",
        yPadding: 5,
        xPadding: 15
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.props.yLabel,
              fontSize: 10
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.props.xLabel,
              fontSize: 10
            }
          }
        ]
      }
    }
    return(
      <Line ref="chart" data={data} options={options} />
    )
  }
}

export default LineChartGraph