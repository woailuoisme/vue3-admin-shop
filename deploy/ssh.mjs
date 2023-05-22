import { Client } from "ssh2"
import fs from "fs"
import chalk from "chalk"
import dotenv from "dotenv"
import path, { resolve } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: resolve(__dirname, "./.env") })

const info = chalk.bold.green
const error = chalk.bold.red
const warning = chalk.hex("#FFA500")

const conn = new Client()
conn.connect({
  host: process.env.SSH_HOSTNAME || "localhost",
  port: process.env.SSH_PORT || 22,
  username: process.env.SSH_USERNAME || "root",
  privateKey: fs.readFileSync(`/Users/seaside/.ssh/id_rsa`),
})

export function test() {
  conn.on("ready", () => {
    console.log(info("Client :: ready"))
    conn.exec("uptime", (err, stream) => {
      if (err) throw err
      stream
        .on("data", (data) => {
          console.log(info(data))
        })
        .stderr.on("data", (data) => {
          console.log(error(data))
        })
        .on("close", (code, signal) => {
          console.log(warning("Stream :: close :: code: " + code + ", signal: " + signal))
          conn.end()
        })
    })
  })
}

export function unzip(remoteFile, remoteDir) {
  conn.on("ready", () => {
    console.log(info("Client :: ready"))
    conn.exec(`[ -d ${remoteFile} ] && unzip ${remoteFile} -d ${remoteDir} && rm ${remoteFile}`, (err, stream) => {
      if (err) throw err
      stream
        .on("data", (data) => {
          console.log(info(data))
        })
        .stderr.on("data", (data) => {
          console.log(error(data))
        })
        .on("close", (code, signal) => {
          console.log(warning("Stream :: close :: code: " + code + ", signal: " + signal))
          conn.end()
        })
    })
  })
}
