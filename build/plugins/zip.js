import zipPack from "vite-plugin-zip-pack";
import dayjs from "dayjs";

export default (mode) => {
  const time = dayjs().format("YYYY-MM-DD HH:mm:ss")
  const name = `${mode}-${time}`
  return zipPack({
    inDir: 'dist',
    outDir: 'dist-zip',
    outFileName: `${name}.zip`,
  });
};
