// let environment = process.env.NODE_ENV
let environment = "dev"

function getUrl(environment) {
  switch (environment) {
    case "local":
      return "http://localhost:8000/api/v1/admin"
    case "dev":
      return "http://39.96.171.46/api/v1/admin"
    case "prod":
      return "https://zzrxxa.com/api/v1/admin"
    default:
      return "http://localhost:8000/api/v1/admin"
  }
}
export let baseUrl = getUrl(environment)
export default { baseUrl }
