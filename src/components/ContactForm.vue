<template>
  <form>
    <template v-if="formState === 1">
      <dl>
        <dt>名前(姓名) <strong class="required">必須</strong></dt>
        <dd><input type="text" name="" /></dd>
        <dt>ふりがな(姓名) <strong class="required">必須</strong></dt>
        <dd><input type="text" name="" /></dd>
        <dt>社名</dt>
        <dd><input type="text" name="" /></dd>
        <dt>メールアドレス <strong class="required">必須</strong></dt>
        <dd><input type="email" name="" /></dd>
        <dt>郵便番号</dt>
        <dd><input type="text" name="" /></dd>
        <dt>住所</dt>
        <dd><input type="text" name="" /></dd>
        <dt>電話番号</dt>
        <dd><input type="text" name="" placeholder="入力例: 09012345678" /></dd>
        <dt>どの製品について</dt>
        <dd>
          <select>
            <option>---</option>
            <option>Aサービスについて</option>
            <option>Bサービスについて</option>
            <option>Cサービスについて</option>
            <option>その他</option>
          </select>
        </dd>
        <dt>問い合わせ件名 <strong class="required">必須</strong></dt>
        <dd><input type="text" name="" /></dd>
        <dt>問い合わせ内容 <strong class="required">必須</strong></dt>
        <dd><textarea name="" row="20"></textarea></dd>
        <dt>個人情報の保持の同意 <strong class="required">必須</strong></dt>
        <dd>
          <label> <input type="checkbox" name="" /> 同意する </label>
        </dd>
      </dl>
      <button type="button" class="c-button" @click="toConfirm">確認する</button>
    </template>
    <template v-else-if="formState === 2">
      <dl>
        <dt>data</dt>
        <dd>data</dd>
      </dl>
      <div class="buttonWrapper">
        <button type="button" class="c-button --gray" @click="toForm">戻る(編集する)</button>
        <button type="button" class="c-button" @click="toSend">この内容で送信する</button>
      </div>
    </template>
    <template v-else>
      <p>お問い合わせありがとうございました。</p>
    </template>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContactForm',
  data() {
    return {
      formState: 1,
    }
  },
  methods: {
    toConfirm() {
      this.formState = 2
    },
    toForm() {
      this.formState = 1
    },
    toSend() {
      this.formState = 3
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

form {
  padding: 0 1em;
}

.required {
  color: $--color-primary;
  font-size: 12px;

  &::before {
    content: '※';
  }
}

input[type='text'],
input[type='email'],
input[type='number'],
textarea {
  padding: 5px 10px;
  border: 1px solid $--color-silver;
  border-radius: 4px;
}

select {
  padding: 5px 10px;
  border: 1px solid $--color-silver;
  border-radius: 4px;
}

.buttonWrapper {
  display: flex;
  justify-content: space-between;

  & .c-button {
    width: calc(50% - 0.5em);
  }
}
</style>
