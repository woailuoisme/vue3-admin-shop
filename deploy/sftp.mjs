import SftpClient from "ssh2-sftp-client"
import fs from "fs"
import path, {resolve} from "path"
import {fileURLToPath} from "url"
import chalk from "chalk"
import dotenv from "dotenv"
import {unzip} from "./ssh.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({path: resolve(__dirname, './.env')})
const info = chalk.bold.green
const error = chalk.bold.red

console.log(process.env.SSH_HOSTNAME)
const connectOptions = {
    host: process.env.SSH_HOSTNAME || "localhost",
    port: process.env.SSH_PORT || 22,
    username: process.env.SSH_USERNAME || "root",
    privateKey: fs.readFileSync(`/Users/seaside/.ssh/id_rsa`),
}

export async function uploadScripts() {
    const sftp = new SftpClient()
    const localPath = resolve(__dirname, "./scripts")
    const remotePath = "/var/test_script"
    try {
        await sftp.connect(connectOptions)
        const exists = await sftp.exists(remotePath)
        exists ? await sftp.rmdir(remotePath, true) : await sftp.mkdir(remotePath, true)
        const data = await sftp.uploadDir(localPath, remotePath, {
            flags: "a", // w - write and a - append
            encoding: null, // use null for binary files
            mode: 0o755, // mode to use for created file (rwx)
            autoClose: true, // automatically close the write stream when finished
        })
        console.log(data)
        console.log(info("Upload file successfully"))
        await sftp.end()
    } catch (err) {
        console.log(error("Upload file failed"))
        console.log(error(err))
        await sftp.end()
    }
}

export async function deploy() {
    const sftp = new SftpClient()
    const localPath = resolve(__dirname, "../dist-zip/dist.zip")
    const remotePath = "/var/www/admin-panel"
    const remoteFileName = remotePath + "/dist.zip"
    if (!fs.existsSync(localPath)) {
        console.log(error(`${localPath} is not exists!!`))
        return
    }
    try {
        await sftp.connect(connectOptions)
        console.log(info('Successfully connected to sftp'));
    } catch (error) {
        console.log(error);
    }
    try {
        const exists = await sftp.exists(remotePath)
        if (exists) {
            const rm = await sftp.rmdir(remotePath, true)
            console.log(info(rm))
            const result = await sftp.mkdir(remotePath, true)
            console.log(info(result))
        } else {
            const result = await sftp.mkdir(remotePath, true)
            console.log(info(result))
        }
        sftp.on('upload', info => {
            console.log(`Listener: Uploaded ${info.source}`);
        });
        // await sftp.exists(remotePath) ? await sftp.rmdir(remotePath, true) : await sftp.mkdir(remotePath, true);
        let stream = fs.createReadStream(localPath);
        const data = await sftp.put(stream, remoteFileName, {
            flags: 'w',
            encoding: null, // use null for binary files
            mode: 0o755,
        })
        console.log(info(data))
        console.log(info("Upload file folder successfully"))
        unzip(remoteFileName, remotePath)
        return data
    } catch (err) {
        console.error(error(err.message))
    } finally {
        await sftp.end();
    }
    await sftp.end()

}
