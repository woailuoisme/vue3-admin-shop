import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')
const user = window.localStorage.user ? JSON.parse(window.localStorage.user) : ''
const token = user && user.token ? user.token : ''

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEB_SOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEB_SOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
})
echo.connector.pusher.connection.bind('connected', () => {
  console.log('websocket was connected')
})
echo.connector.pusher.connection.bind('disconnected', () => {
  console.log('websocket was disconnected')
})

export default echo
