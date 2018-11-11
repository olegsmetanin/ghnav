import * as next from 'next'

import { createServer } from 'http'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleNextRequests = app.getRequestHandler()

app.prepare()
.then(() => {
  createServer((req, res) => {

    // // Add assetPrefix support based on the hostname
    // if (req.headers.host === 'my-app.com') {
    //   app.setAssetPrefix('http://cdn.com/myapp')
    // } else {
    //   app.setAssetPrefix('')
    // }

    handleNextRequests(req, res)
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
