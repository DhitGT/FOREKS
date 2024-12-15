<template>
  <div class="my-12 pa-6 rounded-xl">
    <div class="container">
      <div class="text-4xl text-center font-bold mb-5">Tentang Kami</div>

      <div>
        <div class="ql-editor" v-html="preview"></div>
      </div>
    </div>
    <visimisi />
  </div>
</template>
<script>
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  props: {
    preview: {
      type: String,
      default: '',
    },
  },
}
</script>
