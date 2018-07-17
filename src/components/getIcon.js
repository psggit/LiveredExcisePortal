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
    case 'logout':
      return (
        <svg width="15px" height="16px" viewBox="0 0 15 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Excise-DB---V0.2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="01-Excise---In-Progress-Orders-V2---Filter-Expanded" transform="translate(-1354.000000, -24.000000)" fill="#FFFFFF" fillRule="nonzero">
                    <g id="Header">
                        <g id="Logout" transform="translate(1354.000000, 23.000000)">
                            <g transform="translate(0.000000, 1.500000)" id="Shape">
                                <path d="M11.4291723,3.70674209 C11.1480815,3.43111734 10.6921249,3.43107029 10.4109381,3.70669503 C10.1297993,3.98236684 10.1297513,4.42928645 10.4109381,4.70495826 L12.5418714,6.794191 L3.7200072,6.794191 C3.32237122,6.794191 3,7.11023946 3,7.50007647 C3,7.88991349 3.32237122,8.20596194 3.7200072,8.20596194 L12.5417754,8.20596194 L10.4109381,10.2950064 C10.1297513,10.5706783 10.1297513,11.0175979 10.4109381,11.2932697 C10.5515315,11.4311056 10.7358054,11.5 10.9200792,11.5 C11.104353,11.5 11.2886269,11.4311056 11.4291723,11.2932697 L14.7891099,7.99923161 C15.0702967,7.72360687 15.0702967,7.27664019 14.7891099,7.00096839 L11.4291723,3.70674209 Z"></path>
                                <path d="M7.25,15 C7.6642,15 8,14.6947273 8,14.3181818 C8,13.9416364 7.6642,13.6363636 7.25,13.6363636 L1.5,13.6363636 L1.5,1.36363636 L7.25,1.36363636 C7.6642,1.36363636 8,1.05836364 8,0.681818182 C8,0.305272727 7.6642,0 7.25,0 L0.75,0 C0.3358,0 0,0.305272727 0,0.681818182 L0,14.3181818 C0,14.6947273 0.3358,15 0.75,15 L7.25,15 Z"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )

    case 'back':
      return (
        <svg width="18px" height="15px" viewBox="0 0 18 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Excise-DB---V0.2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="03-Excise---In-Progress-Orders-V2---Order-Info" transform="translate(-20.000000, -93.000000)" fill="#687189" fillRule="nonzero">
                    <g id="Info-Header" transform="translate(0.000000, 62.000000)">
                        <g id="Order-#" transform="translate(20.000000, 25.000000)">
                            <path d="M17.7067272,12.7858598 L11.2083357,6.28732195 C11.0228345,6.10182081 10.7755972,6 10.5119749,6 C10.24806,6 10.000969,6.10196711 9.81546789,6.28732195 L9.22546309,6.87747304 C9.04010825,7.06268159 8.93799484,7.31006521 8.93799484,7.57383378 C8.93799484,7.83745606 9.04010825,8.09317844 9.22546309,8.27838699 L13.0165329,12.0777955 L0.972125438,12.0777955 C0.4290811,12.0777955 0,12.5029267 0,13.0461173 L0,13.8804336 C0,14.4236242 0.4290811,14.8916196 0.972125438,14.8916196 L13.0595434,14.8916196 L9.22560938,18.7122408 C9.04025454,18.8977419 8.93814114,19.138396 8.93814114,19.4021646 C8.93814114,19.6656405 9.04025454,19.9098057 9.22560938,20.0951605 L9.81561418,20.6834098 C10.0011153,20.8689109 10.2482063,20.9700003 10.5121212,20.9700003 C10.7757435,20.9700003 11.0229808,20.8675943 11.2084819,20.6820931 L17.7068735,14.1837016 C17.8928135,13.9976153 17.9950732,13.7492076 17.9943418,13.4851464 C17.9949269,13.2202075 17.8928135,12.9716535 17.7067272,12.7858598 Z" id="Back" transform="translate(8.997173, 13.485000) scale(-1, 1) translate(-8.997173, -13.485000) "></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )

    case 'en-route':
      return (
        <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Excise-DB---V0.2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="03-Excise---In-Progress-Orders-V2---Order-Info" transform="translate(-54.000000, -124.000000)" fillRule="nonzero">
                    <g id="Info-Header" transform="translate(0.000000, 62.000000)">
                        <g id="Success" transform="translate(54.000000, 62.000000)">
                            <g id="S">
                                <path d="M15,0 C6.72904949,0 0,6.72794519 0,14.9978872 C0,23.2678292 6.72904949,29.9959309 15,29.9959309 C23.2709505,29.9959309 30,23.2678292 30,14.9978872 C30,6.72794519 23.271107,0 15,0 Z" id="Tick" fill="#006FE1"></path>
                                <g transform="translate(8.249998, 6.000004)" fill="#FCFDFE" id="Shape">
                                    <path d="M6.88983759,12.7324924 C6.04980307,12.7324924 5.3625021,13.4724438 5.3625021,14.3768288 L5.3625021,17.7066099 C5.3625021,18.6109949 6.04980307,19.3509463 6.88983759,19.3509463 C7.72987211,19.3509463 8.41717308,18.6109949 8.41717308,17.7066099 L8.41717308,14.3768288 C8.41717308,13.4724438 7.72990206,12.7324924 6.88983759,12.7324924 Z"></path>
                                    <path d="M12.8713033,2.13749242 L9.66389118,2.13749242 C9.28899885,0.897746817 8.16435453,0 6.83137135,0 C5.49838817,0 4.37374385,0.897746817 3.99885152,2.13749242 L0.833094067,2.13749242 C0.37489233,2.13749242 0,2.52224106 0,2.99248939 C0,3.46273772 0.37489233,3.84748636 0.833094067,3.84748636 L4.04050623,3.84748636 C4.24877974,4.57423378 4.70698148,5.17273166 5.33180203,5.55748029 C3.08244805,6.24147787 1.41625991,8.37897029 1.41625991,10.9012113 L1.41625991,15.3899454 C1.41625991,16.1594427 2.04108046,16.8006904 2.79086513,16.8006904 L3.91554212,16.8006904 L3.91554212,14.3639491 C3.91554212,12.6966714 5.24849262,11.3287098 6.87302605,11.3287098 C8.49755949,11.3287098 9.83050999,12.696705 9.83050999,14.3639491 L9.83050999,16.8006904 L10.955187,16.8006904 C11.7049716,16.8006904 12.3297922,16.1594427 12.3297922,15.3899454 L12.3297922,10.9439612 C12.3297922,8.42168661 10.6636041,6.24147787 8.41421741,5.60023014 C9.03903796,5.21548151 9.4972397,4.61698363 9.70551321,3.89023621 L12.9129254,3.89023621 C13.3711271,3.89023621 13.7460194,3.50548757 13.7460194,3.03523924 C13.7043974,2.52224106 13.3295051,2.13749242 12.8713033,2.13749242 Z M6.83137135,4.74523317 C5.91496788,4.74523317 5.16518322,3.9757359 5.16518322,3.03523924 C5.16518322,2.09474257 5.91496788,1.3252453 6.83137135,1.3252453 C7.74777483,1.3252453 8.49755949,2.09474257 8.49755949,3.03523924 C8.53921419,3.9757359 7.78942953,4.74523317 6.83137135,4.74523317 Z"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    // case 'success':
    //   return (
    //     <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    //         <g id="Excise-DB---V0.2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //             <g id="03-Excise---Order-History---Order-Information-V0.2" transform="translate(-57.000000, -124.000000)" fill="#22AE5D" fill-rule="nonzero">
    //                 <g id="Info-Header" transform="translate(0.000000, 62.000000)">
    //                     <g id="Success" transform="translate(57.000000, 62.000000)">
    //                         <path d="M15.0020348,0 C6.72996232,0 0,6.72885786 0,14.9999217 C0,23.2709856 6.72996232,30 15.0020348,30 C23.2741073,30 30.0040696,23.2709856 30.0040696,14.9999217 C30.0040696,6.72885786 23.2742639,0 15.0020348,0 Z M23.616468,12.4663088 L14.1914525,21.8899967 C13.7907011,22.2906917 13.2579835,22.5112304 12.691296,22.5112304 C12.1246084,22.5112304 11.5918909,22.2906917 11.1911394,21.8899967 L6.38760165,17.0871355 C5.98685024,16.6864405 5.76612389,16.153798 5.76612389,15.5871903 C5.76612389,15.0204261 5.98685024,14.4877835 6.38760165,14.0870885 C6.78819651,13.6863936 7.32091409,13.4656983 7.88775816,13.4656983 C8.45444569,13.4656983 8.98731982,13.6863936 9.38791468,14.0872451 L12.6911394,17.389848 L20.6158419,9.4662618 C21.0165933,9.06556684 21.5493108,8.8450281 22.1159984,8.8450281 C22.6826859,8.8450281 23.2154035,9.06556684 23.6161549,9.4662618 C24.4436439,10.2936343 24.4436439,11.6392493 23.616468,12.4663088 Z" id="SuccessTick"></path>
    //                     </g>
    //                 </g>
    //             </g>
    //         </g>
    //     </svg>
    //   )
    case 'success':
        return (
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Desktop-Components-/Toast/Toast---Success" transform="translate(-24.000000, -12.000000)" fill="#FFFFFF">
                        <g id="Toast_Success">
                            <path d="M36,36 C29.372583,36 24,30.627417 24,24 C24,17.372583 29.372583,12 36,12 C42.627417,12 48,17.372583 48,24 C48,30.627417 42.627417,36 36,36 Z M30.8284271,21.7416902 L28,24.3874647 L34,30 L44,20.6457745 L41.1715729,18 L34,24.708451 L30.8284271,21.7416902 Z" id="Tick"></path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    case 'warning':
        return (
            <svg width="24px" height="21px" viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Desktop-Components-/Toast/Toast---Warning" transform="translate(-24.000000, -14.000000)" fill="#706E6B" fill-rule="nonzero">
                        <g id="Toast_Warning">
                            <path d="M47.7235368,31.7874113 L37.1448699,14.693016 C36.5905293,13.7689947 35.3894579,13.7689947 34.8351173,14.693016 L24.2564503,31.7874113 C23.6097196,32.8500359 24.2564503,34.3284701 25.4113266,34.3284701 L46.5686605,34.3284701 C47.7235368,34.3284701 48.4164626,32.8500359 47.7235368,31.7874113 Z M35.9899936,30.6323846 C35.2046777,30.6323846 34.604142,30.0317707 34.604142,29.2463526 C34.604142,28.4609344 35.2046777,27.8603205 35.9899936,27.8603205 C36.7753095,27.8603205 37.3758451,28.4609344 37.3758451,29.2463526 C37.3758451,30.0317707 36.7753095,30.6323846 35.9899936,30.6323846 Z M37.3758451,26.4742885 C37.3758451,26.7514949 37.1910649,26.9362991 36.9138946,26.9362991 L35.0660925,26.9362991 C34.7889222,26.9362991 34.604142,26.7514949 34.604142,26.4742885 L34.604142,20.4681496 C34.604142,20.1909432 34.7889222,20.0061389 35.0660925,20.0061389 L36.9138946,20.0061389 C37.1910649,20.0061389 37.3758451,20.1909432 37.3758451,20.4681496 L37.3758451,26.4742885 Z" id="Warning"></path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    case 'close-grey':
        return (
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Desktop-Components-/Toast/Toast---Warning" transform="translate(-488.000000, -16.000000)" fill="#706E6B">
                        <g id="Toast_Warning">
                            <path d="M498.168022,23.7189189 L503.804878,18.0540541 C504.065041,17.7945946 504.065041,17.4054054 503.804878,17.1459459 L502.937669,16.2378378 C502.677507,15.9783784 502.287263,15.9783784 502.0271,16.2378378 L496.346883,21.9027027 C496.173442,22.0756757 495.913279,22.0756757 495.739837,21.9027027 L490.059621,16.1945946 C489.799458,15.9351351 489.409214,15.9351351 489.149051,16.1945946 L488.238482,17.1027027 C487.97832,17.3621622 487.97832,17.7513514 488.238482,18.0108108 L493.918699,23.6756757 C494.092141,23.8486486 494.092141,24.1081081 493.918699,24.2810811 L488.195122,29.9891892 C487.934959,30.2486486 487.934959,30.6378378 488.195122,30.8972973 L489.105691,31.8054054 C489.365854,32.0648649 489.756098,32.0648649 490.01626,31.8054054 L495.696477,26.1405405 C495.869919,25.9675676 496.130081,25.9675676 496.303523,26.1405405 L501.98374,31.8054054 C502.243902,32.0648649 502.634146,32.0648649 502.894309,31.8054054 L503.804878,30.8972973 C504.065041,30.6378378 504.065041,30.2486486 503.804878,29.9891892 L498.168022,24.3243243 C497.99458,24.1513514 497.99458,23.8918919 498.168022,23.7189189" id="CloseGrey"></path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    case 'close-white':
        return (
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Desktop-Components-/Toast/Toast---Success" transform="translate(-488.000000, -16.000000)" fill="#FFFFFF">
                        <g id="Toast_Success">
                            <path d="M498.168022,23.7189189 L503.804878,18.0540541 C504.065041,17.7945946 504.065041,17.4054054 503.804878,17.1459459 L502.937669,16.2378378 C502.677507,15.9783784 502.287263,15.9783784 502.0271,16.2378378 L496.346883,21.9027027 C496.173442,22.0756757 495.913279,22.0756757 495.739837,21.9027027 L490.059621,16.1945946 C489.799458,15.9351351 489.409214,15.9351351 489.149051,16.1945946 L488.238482,17.1027027 C487.97832,17.3621622 487.97832,17.7513514 488.238482,18.0108108 L493.918699,23.6756757 C494.092141,23.8486486 494.092141,24.1081081 493.918699,24.2810811 L488.195122,29.9891892 C487.934959,30.2486486 487.934959,30.6378378 488.195122,30.8972973 L489.105691,31.8054054 C489.365854,32.0648649 489.756098,32.0648649 490.01626,31.8054054 L495.696477,26.1405405 C495.869919,25.9675676 496.130081,25.9675676 496.303523,26.1405405 L501.98374,31.8054054 C502.243902,32.0648649 502.634146,32.0648649 502.894309,31.8054054 L503.804878,30.8972973 C504.065041,30.6378378 504.065041,30.2486486 503.804878,29.9891892 L498.168022,24.3243243 C497.99458,24.1513514 497.99458,23.8918919 498.168022,23.7189189" id="CloseWhite"></path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    case 'info-icon':
      return (
        <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Excise-DB---V0.2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="05-Excise---User-Management---Add-Squad-Member---Set-Role" transform="translate(-456.000000, -469.000000)" fill="#FFFFFF" fillRule="nonzero">
                    <g id="Access-Modal" transform="translate(426.000000, 234.000000)">
                        <g id="Role" transform="translate(20.000000, 173.000000)">
                            <g id="Info-Box" transform="translate(0.000000, 52.000000)">
                                <g id="InfoIcon" transform="translate(10.000000, 10.000000)">
                                    <path d="M7,0 C3.1402,0 0,3.14024242 0,7.00004242 C0,10.8598424 3.1402,14 7,14 C10.8598,14 14,10.8598424 14,7.00004242 C14,3.14024242 10.8598,0 7,0 Z M7,12.7272727 C3.84193939,12.7272727 1.27272727,10.1580606 1.27272727,7.00004242 C1.27272727,3.84202424 3.84193939,1.27272727 7,1.27272727 C10.1580606,1.27272727 12.7272727,3.84202424 12.7272727,7.00004242 C12.7272727,10.1580606 10.1580182,12.7272727 7,12.7272727 Z" id="Shape"></path>
                                    <path d="M6.99991515,2.96969697 C6.53214545,2.96969697 6.1516,3.35049697 6.1516,3.81856364 C6.1516,4.28620606 6.53214545,4.66666667 6.99991515,4.66666667 C7.46768485,4.66666667 7.8482303,4.28620606 7.8482303,3.81856364 C7.8482303,3.35049697 7.46768485,2.96969697 6.99991515,2.96969697 Z" id="Shape"></path>
                                    <path d="M7,5.93939394 C6.64855758,5.93939394 6.36363636,6.22431515 6.36363636,6.57575758 L6.36363636,10.3939394 C6.36363636,10.7453818 6.64855758,11.030303 7,11.030303 C7.35144242,11.030303 7.63636364,10.7453818 7.63636364,10.3939394 L7.63636364,6.57575758 C7.63636364,6.22431515 7.35144242,5.93939394 7,5.93939394 Z" id="Shape"></path>
                                </g>
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
