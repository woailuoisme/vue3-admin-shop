<template>
  <div>
    <div ref="editorEl" />
  </div>
</template>

<script setup>
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
import "@toast-ui/editor/dist/toastui-editor.css"
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css"
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css"
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css"
import "prismjs/themes/prism.min.css"

// Step 1. Import prismjs
import Prism from "prismjs"
import "@toast-ui/editor/dist/i18n/zh-cn"
import { Editor } from "@toast-ui/editor"
import colorSyntax from "@toast-ui/editor-plugin-color-syntax"
import fontSize from "tui-editor-plugin-font-size"
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight"

import { useTheme } from "vuetify"
import axios from "axios"

const props = defineProps({
  content: {
    type: String,
    required: false,
    default: "",
  },
  imgUrl: {
    type: String,
    required: false,
    default: "",
  },
  imgBodyKey: {
    type: String,
    required: false,
    default: "file",
  },
})

const emit = defineEmits(["update:modelValue"])

const { global } = useTheme()
const editorEl = ref()
let editor = null

function init() {
  editor = new Editor({
    el: editorEl.value,
    height: "500px",
    initialEditType: "wysiwyg",
    initialValue: props?.content ?? "",
    previewStyle: "vertical",
    usageStatistics: false,
    language: "zh-CN",
    theme: global.name.value === "dark" ? "dark" : "",
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax, fontSize],
    events: {
      change: () => emit("update:modelValue", editor.getMarkdown()),
    },
    hooks: {
      addImageBlobHook: function (blob, callback) {
        imgUpload(blob, callback)
        return false
      },
    },
  })
}

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: false,
})

async function imgUpload(blob, callback) {
  const body = new FormData()
  body.append("file", blob.blob())
  try {
    const res = await request.post("/editor_upload", body)
    if (res.status === 200 && res.data?.data.url) {
      callback(res.data?.data.url)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (editor) {
    editor.destroy()
  }
})
</script>
