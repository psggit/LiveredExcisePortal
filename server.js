const express = require('express')
const path = require('path')
const app = express()

// const env = process.env.NODE_ENV

//if (env === 'production') {
// app.get('*.css', (req, res, next) => {
//   req.url += '.gz'
//   res.set('Content-Encoding', 'gzip')
//   res.set('Content-Type', 'text/css')
//   next()
// })
//}

app.get('*.js', (req, res, next) => {
  const runtimeUrlRegex = /runtime.*.js/
  const vendorUrlRegex = /vendor.*.js/
  const styleUrlRegex = /styles.*.js/
  if (!runtimeUrlRegex.test(req.url) && !styleUrlRegex.test(req.url)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
  }
  if (vendorUrlRegex.test(req.url)) {
    res.setHeader('Cache-Control', 'private, max-age=31536000')
  }
  next()
})


app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(8080)
console.log("Server is running on the port 8080")
