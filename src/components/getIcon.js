import React from 'react'

function getIcon(name) {
  switch (name) {
    case 'down-arrow':
      return (
        <svg fill="#49587D" width="10px" height="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        	 viewBox="0 0 488.076 488.076" xmlSpace="preserve">
          <g>
          	<g>
          		<path d="M0,49.017c0-13.824,11.207-25.03,25.03-25.03h438.017c13.824,0,25.029,11.207,25.029,25.03L262.81,455.745
          			c0,0-18.772,18.773-37.545,0C206.494,436.973,0,49.017,0,49.017z"/>
          	</g>
          </g>
        </svg>
      )
    case 'calendar':
      return (
        <svg width="15px" height="16px" viewBox="0 0 15 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Excise-DB---V0.2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="01-Excise---Order-History-V3---Filter-Expanded" transform="translate(-253.000000, -181.000000)" fill="#6B7891" fillRule="nonzero">
                    <g id="Filter-Box" transform="translate(21.000000, 82.000000)">
                        <g id="Filter-Fields" transform="translate(15.000000, 54.000000)">
                            <g id="Text-Box" transform="translate(0.000000, 11.000000)">
                                <path d="M230.523784,39.6978378 L217.480541,39.6978378 C217.274595,39.6978378 217,39.9724323 217,40.1783783 L217,47.9356755 C217,48.6221619 217.617838,49.2399998 218.304324,49.2399998 L229.7,49.2399998 C230.386486,49.2399998 231.004324,48.6221619 231.004324,47.9356755 L231.004324,40.1783783 C231.004324,39.9724323 230.72973,39.6978378 230.523784,39.6978378 Z M221.805405,46.6999998 C221.805405,46.9059458 221.668108,46.9745944 221.462162,46.9745944 L220.226486,46.9745944 C220.02054,46.9745944 219.883243,46.9059458 219.883243,46.6999998 L219.883243,45.3956755 C219.883243,45.2583782 220.02054,45.1210809 220.226486,45.1210809 L221.462162,45.1210809 C221.668108,45.1210809 221.805405,45.2583782 221.805405,45.3956755 L221.805405,46.6999998 Z M221.805405,43.542162 C221.805405,43.6794593 221.668108,43.8167566 221.462162,43.8167566 L220.226486,43.8167566 C220.02054,43.8167566 219.883243,43.6794593 219.883243,43.542162 L219.883243,42.2378377 C219.883243,42.0318918 220.02054,41.9632431 220.226486,41.9632431 L221.462162,41.9632431 C221.668108,41.9632431 221.805405,42.0318918 221.805405,42.2378377 L221.805405,43.542162 Z M224.963243,46.6999998 C224.963243,46.9059458 224.825946,46.9745944 224.62,46.9745944 L223.384324,46.9745944 C223.178378,46.9745944 223.041081,46.9059458 223.041081,46.6999998 L223.041081,45.3956755 C223.041081,45.2583782 223.178378,45.1210809 223.384324,45.1210809 L224.62,45.1210809 C224.825946,45.1210809 224.963243,45.2583782 224.963243,45.3956755 L224.963243,46.6999998 Z M224.963243,43.542162 C224.963243,43.6794593 224.825946,43.8167566 224.62,43.8167566 L223.384324,43.8167566 C223.178378,43.8167566 223.041081,43.6794593 223.041081,43.542162 L223.041081,42.2378377 C223.041081,42.0318918 223.178378,41.9632431 223.384324,41.9632431 L224.62,41.9632431 C224.825946,41.9632431 224.963243,42.0318918 224.963243,42.2378377 L224.963243,43.542162 Z M228.121081,46.6999998 C228.121081,46.9059458 227.983784,46.9745944 227.777838,46.9745944 L226.542162,46.9745944 C226.336216,46.9745944 226.198919,46.9059458 226.198919,46.6999998 L226.198919,45.3956755 C226.198919,45.2583782 226.336216,45.1210809 226.542162,45.1210809 L227.777838,45.1210809 C227.983784,45.1210809 228.121081,45.2583782 228.121081,45.3956755 L228.121081,46.6999998 Z M228.121081,43.542162 C228.121081,43.6794593 227.983784,43.8167566 227.777838,43.8167566 L226.542162,43.8167566 C226.336216,43.8167566 226.198919,43.6794593 226.198919,43.542162 L226.198919,42.2378377 C226.198919,42.0318918 226.336216,41.9632431 226.542162,41.9632431 L227.777838,41.9632431 C227.983784,41.9632431 228.121081,42.0318918 228.121081,42.2378377 L228.121081,43.542162 Z M229.7,35.5789189 L228.121081,35.5789189 L228.121081,34.9610811 C228.121081,34.4805405 227.709189,34 227.16,34 C226.679459,34 226.198919,34.4118919 226.198919,34.9610811 L226.198919,35.5789189 L221.805405,35.5789189 L221.805405,34.9610811 C221.805405,34.4805405 221.393513,34 220.844324,34 C220.295135,34 219.883243,34.4118919 219.883243,34.9610811 L219.883243,35.5789189 L218.304324,35.5789189 C217.617838,35.5789189 217,36.1967567 217,36.8832432 L217,37.6383783 C217,37.9129729 217.274595,38.1189189 217.480541,38.1189189 L230.523784,38.1189189 C230.72973,38.1189189 231.004324,37.9129729 231.004324,37.6383783 L231.004324,36.8832432 C231.004324,36.1967567 230.386486,35.5789189 229.7,35.5789189 Z" id="DateRange"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    default:
  }
}

export default getIcon