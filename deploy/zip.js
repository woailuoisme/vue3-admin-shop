import fs from "fs"
import path from "path"
import JSZip from "jszip"
import chalk from "chalk"

export default function zipPack() {
  let options = {}
  const inDir = options?.inDir || "./dist"
  const outDir = options?.outDir || "./dist-zip"
  const outFileName = options?.outFileName || "dist.zip"

  /**
   *  添加文件刀压缩包
   * @param zip JSZip
   * @param inDir string dir
   */
  function addFilesToZipArchive(zip, inDir) {
    const listOfFiles = fs.readdirSync(inDir)

    listOfFiles.forEach((fileName) => {
      const filePath = path.join(inDir, fileName)
      const file = fs.statSync(filePath)

      if (file?.isDirectory()) {
        const dir = zip.folder(fileName)
        addFilesToZipArchive(dir, filePath)
      } else {
        zip.file(fileName, fs.readFileSync(filePath))
      }
    })
  }

  /**
   *  创建zip 压缩包
   * @param zip
   */
  function createZipArchive(zip) {
    zip
      .generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
      })
      .then((file) => {
        const fileName = path.join(outDir, outFileName)

        if (fs.existsSync(fileName)) {
          fs.unlinkSync(fileName)
        }
        fs.writeFileSync(fileName, file)
      })
  }

  /**
   *  清空文件夹
   * @param dir
   */
  function emptyFolder() {
    if (fs.existsSync(inDir)) {
      fs.rmdirSync(inDir, { recursive: true })
    }
  }

  /**
   * 执行流程
   */
  function closeBundle() {
    try {
      console.log("\x1b[36m%s\x1b[0m", `Zip packing - "${inDir}" folder :`)

      if (fs.existsSync(inDir)) {
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir)
        }
        const zip = new JSZip()
        console.log(chalk.greenBright("  1. Preparing files."))
        addFilesToZipArchive(zip, inDir)

        console.log(chalk.greenBright("  2. Creating zip archive."))
        createZipArchive(zip)

        console.log(chalk.greenBright(`3. Empty "${inDir}" folder.`))
        emptyFolder()

        console.log(chalk.greenBright("4.  Done."))
      } else {
        console.log(chalk.redBright(`- "${inDir}" folder does not exist!`))
      }
    } catch (error) {
      console.log(chalk.redBright("  - Something went wrong while building zip file!"))
    }
  }

  return { options, createZipArchive, emptyFolder, closeBundle }
}
