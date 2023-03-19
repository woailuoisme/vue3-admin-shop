import zipPack from "vite-plugin-zip-pack";
import { format } from "date-fns";

export default (mode) => {
  const time = format(new Date(),'yyyy-MM-dd-HH-mm-ss')
  const name = `${mode}-${time}`
  return zipPack({
    inDir: 'dist',
    outDir: 'dist-zip',
    outFileName: `${name}.zip`,
  });
};
