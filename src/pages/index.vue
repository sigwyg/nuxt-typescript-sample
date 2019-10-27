<template>
  <div>
    <h1>お問い合わせフォーム</h1>
    <p>Hello {{ message }}!</p>
    <ContactForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContactForm from '@/components/ContactForm.vue'

export default Vue.extend({
  name: 'IndexPage',

  components: {
    ContactForm,
  },

  data() {
    return {
      message: 'This is a message',
    }
  },
})
</script>
