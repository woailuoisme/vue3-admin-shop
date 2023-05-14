// Import Vue FilePond
import { setOptions } from "filepond"
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
// Import image preview and file type validation plugins
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css"

// Import the plugin styles
import FilePondPluginFilePoster from "filepond-plugin-file-poster"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
setOptions({
  labelIdle: '将文件拖放到此处或 <span class="filepond--label-action">浏览文件</span>',
  labelFileProcessing: "正在上传...",
  labelFileProcessingComplete: "上传完成",
  labelFileProcessingAborted: "上传已取消",
  labelFileProcessingError: "上传出错",
  labelTapToCancel: "点击取消",
  labelTapToRetry: "点击重试",
  labelTapToUndo: "点击撤销",
  labelButtonRemoveItem: "移除",
  labelButtonAbortItemLoad: "取消",
  labelButtonRetryItemLoad: "重试",
  labelButtonAbortItemProcessing: "取消",
  labelButtonUndoItemProcessing: "撤销",
  labelButtonRetryItemProcessing: "重试",
  labelButtonProcessItem: "上传",
  credits: false,
})

// vueFilePond.setOptions(filepondOptions)
// Create component
export const FilepondPlugin = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFilePoster,
)
