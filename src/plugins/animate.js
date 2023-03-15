/**
 *
 * @param node HTMLElement
 * @param animationName string
 * @param callBack function
 */
export function animate(node, animationName, callBack) {
  node.classList.add("animate__animated", `animate__${animationName}`)

  function handleAnimationEnd() {
    node.classList.remove("animate__animated", `animate__${animationName}`)
    node.removeEventListener("animationend", handleAnimationEnd)
    if (callBack) {
      callBack()
    }
  }

  node.addEventListener("animationend", handleAnimationEnd)
}
