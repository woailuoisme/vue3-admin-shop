<template>
  <div class="back-to-top-btn" :class="[{ 'go-top': show }]" @click="scrollToTop">
    <!--    <i class='ri-arrow-up-s-line'></i> -->
    <v-icon size="x-large" icon="mdi-arrow-up" />
  </div>
</template>

<script setup>
const isTop = ref(false)

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

const { y: scrollY } = useWindowScroll()

const show = computed(() => scrollY.value > 180)

// onMounted(() => {
//   window.addEventListener("scroll", () => {
//     let scrollPos = window.scrollY
//     isTop.value = scrollPos >= 50
//   })
// })

const { global } = useTheme()

// const cssVars = computed(() => {
//   return {
//     "--primaryColor": global.current.value.colors.primary,
//   }
// })
const primaryColor = global.current.value.colors.primary
</script>

<style lang="scss" scoped>
//$primary: var(primaryColor);
//$primary-1: var(--primaryColor1);
//$transition: all 500ms ease;
$primary: var(--primaryColor);

.back-to-top-btn {
  position: fixed;
  cursor: pointer;
  bottom: -100px;
  right: 20px;
  color: #ffffff;
  background-color: v-bind(primaryColor);
  z-index: 4;
  width: 45px;
  text-align: center;
  height: 45px;
  opacity: 0;
  visibility: hidden;
  border-radius: 50%;
  font-size: 22px;
  transition: 0.6s;
  overflow: hidden;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

  i {
    position: absolute;
    right: 0;
    left: 0;
    top: 45%;
    transform: translateY(-45%);
    text-align: center;
    font-size: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  &.go-top {
    opacity: 1;
    visibility: visible;
    bottom: 100px;
  }

  &:hover {
    //background-color: #1867c0;
    opacity: 0.5;
    color: #ffffff;
    transition: 0.6s;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
}
</style>
