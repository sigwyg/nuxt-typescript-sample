<template>
  <div class="contactWrapper">
    <h1>お問い合わせフォーム</h1>
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
})
</script>

<style lang="scss" scoped>
h1 {
  font-size: 30px;
  text-align: center;
}

.contactWrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em 0;

  @media (max-width: 414px) {
    padding: 0;
  }
}
</style>
