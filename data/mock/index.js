import axios from "axios"
import adapter from "axios-mock-adapter"
import mockResponses from "./responses"

export default {
  init() {
    const mock = new adapter(axios)

    mock.onAny().reply((config) => {
      return new Promise((resolve, reject) => {
        let response

        if (Math.random() > 0.01) {
          const matchedResponse = mockResponses.filter(([method, url]) => {
            return config.method.toUpperCase() === method && config.url === url
          })

          response = matchedResponse.length
            ? [200, { code: 0, msg: "Success", data: matchedResponse[0][2] }]
            : [404, { code: 404, msg: "Not Found", data: null }]
        } else {
          response = [500, { code: 500, msg: "Internal Server Error", data: null }]
        }

        setTimeout(() => {
          if (response[0] === 200) {
            resolve(response)
          } else {
            reject(response)
          }
        }, Math.floor(200 + Math.random() * 800))
      })
    })
  },
}
