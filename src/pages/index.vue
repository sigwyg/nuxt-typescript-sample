<template>
  <div>
    <h1>お問い合わせフォーム</h1>
    <p>Hello {{ message }}!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'YourComponent',

  data() {
    return {
      message: 'This is a message',
    }
  },
})
</script>
