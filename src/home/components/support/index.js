<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <style media="screen">
      * {
        margin: 0;
        font-family: "Montserrat", sans-serif;
        box-sizing: border-box;
      }
      .container .header {
        background: #152935;
        font-size: 12px;
        font-weight: 500;
        font-style: italic;
        letter-spacing: -0.2px;
        color: #ffffff;
        padding: 18px 33px;
      }

      .container .body {
        padding: 14px 33px;
        width: 100%;
      }

      .title {
        font-size: 18px;
        font-weight: 500;
        letter-spacing: -0.3px;
        color: #000000;
      }

      .sub-title {
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.2px;
        color: #3d70b2;
      }

      label {
        font-size: 15px;
        letter-spacing: -0.3px;
        color: #000000;
        margin-bottom: 10px;
      }

      .form-group {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
      }

      select {
        background: #fff;
        padding: 12px 9px;
        font-size: 15px;
        line-height: 1.2;
        color: #5f5f6e;
      }

      select:required:invalid {
        color: gray;
      }

      option[value=""][disabled] {
        display: none;
      }
      option {
        color: black;
      }

      button {
        text-align: center;
        padding: 10px 10px;
        background-color: #3d70b2;
        border: 1px solid;
        border-radius: 0px;
        cursor: pointer;
        font-size: 15px;
        line-height: 1;
        letter-spacing: 0.5px;
        text-align: center;
        color: #ffffff;
        width: 90px;
      }

      textarea {
        padding: 8px;
        height: 112px;
      }

      :focus {
        outline: 0;
      }

      .footer{
        display: flex;
        flex-direction: column;
        text-align: center;
      }

      .footer div:first-child {
        margin-top: 40px;
        margin-bottom: 10px;
      }

      .footer .text {
        font-size: 15px;
        letter-spacing: -0.3px;
        color: #000000;
      }

      .footer .ottp-id {
        font-size: 24px;
        font-weight: bold;
        line-height: 1.25;
        text-align: center;
        color: #4a90e2;
        text-decoration: underline;
      }

    </style>
  </head>
  <body>
    <div id="support" class="container">
      <div class="header">
        Excise Department of Pondicherry
      </div>
      <div class="body">
        <p class="title">Grievances & Complaints</p>
        <p class="sub-title">Ref OTTP ID# 678263525086</p>
        <div class="form-group">
          <label>Please select a reason</label>
          <select id="reason" onchange="handleChange()">
            <option  value="" disabled selected>Choose a reason</option>
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
            <option value="d">d</option>
          </select>
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea placeholder="Write a message"></textarea>
        </div>
        <div class="form-group">
          <button>
            Submit
          </button>
        </div>
        <div class="footer">
          <div>
            <p class="text">For any other support, please contact us</p>
            <p class="ottp-id">00 800 1008110</p>
          </div>
          <div>
            <p class="text" style="color: #4a90e2">Operating hours</p>
            <p class="text">Mon - Fri (09:00 AM - 18:00 PM)</p>
          </div>
        </div>
      </div>
    </div>
    <script>
      function handleChange() {
        console.log("change", document.getElementById("reason").value)
      }
    </script>
  </body>
</html>