export default function FullScreen() {
  const PLUGIN_NAME = "fullscreen" // 插件名称
  const toggleFullScreen = (editor) => {
    const container = editor.getUI().getToolbar().getElement()
    if (document.fullscreenElement) {
      document.exitFullscreen()
      container.classList.remove("fullscreen")
    } else {
      container.classList.add("fullscreen")
      document.documentElement.requestFullscreen()
    }
  }

  return {
    // 插件名称
    name: PLUGIN_NAME,
    // 编辑器加载时执行的操作
    onLoad(editor) {
      // 创建一个全屏的按钮
      const toolbar = editor.getUI().getToolbar()
      const fullScreenBtn = document.createElement("button")
      fullScreenBtn.innerHTML = "全屏"
      toolbar.addItem("fullScreen", fullScreenBtn)

      // 监听全屏按钮的点击事件，触发进入或退出全屏状态的函数
      fullScreenBtn.addEventListener("click", () => {
        toggleFullScreen(editor)
      })

      // 监听浏览器原生全屏模式状态变化，避免出现同步问题
      document.addEventListener("fullscreenchange", () => {
        const toolbar = editor.getUI().getToolbar().getElement()
        if (!document.fullscreenElement) {
          toolbar.classList.remove("fullscreen")
        }
      })
    },
    // 编辑器销毁时执行的操作
    onUnload() {},
  }
}
