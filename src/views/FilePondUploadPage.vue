<template>
  <div id="app">
    <file-pond
      ref="pond"
      name="test"
      label-idle="Drop files here..."
      allow-multiple
      accepted-file-types="image/jpeg, image/png"
      server="/api"
      :files="myFiles"
      @init="handleFilePondInit"
    />
  </div>
</template>

e
<script setup>
const myFiles = ['cat.jpeg']

function handleFilePondInit() {
  console.log('FilePond has initialized')
}
</script>

<style scoped></style>
