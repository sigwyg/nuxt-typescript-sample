<template>
  <form>
    <template v-if="formState === 1">
      <p>入力必須項目には「<strong class="required">必須</strong>」をつけていますので、必ず入力してください。</p>
      <p>
        原則３営業日以内にご返答いたします。ただし、お問い合わせ内容によっては、お時間をいただく場合やお答えできない場合があります。お電話にてご連絡させていただく場合もありますので、予めご了承ください。
      </p>

      <fieldset>
        <legend>お問い合わせ内容</legend>
        <dl class="formGrid">
          <dt>問い合わせ件名 <strong class="required">必須</strong></dt>
          <dd><input type="text" name="" /></dd>
          <dt>どの製品について</dt>
          <dd>
            <select>
              <option value="">項目を選択してください</option>
              <option value="a">Aサービスについて</option>
              <option value="b">Bサービスについて</option>
              <option value="c">Cサービスについて</option>
              <option value="x">その他</option>
            </select>
          </dd>
          <dt>問い合わせ内容 <strong class="required">必須</strong></dt>
          <dd><textarea name="" rows="8"></textarea></dd>
        </dl>
      </fieldset>

      <fieldset>
        <legend>連絡先</legend>
        <dl class="formGrid">
          <dt>名前(姓名) <strong class="required">必須</strong></dt>
          <dd><input type="text" name="" /></dd>
          <dt>ふりがな(姓名) <strong class="required">必須</strong></dt>
          <dd><input type="text" name="" /></dd>
          <dt>会社名</dt>
          <dd><input type="text" name="" /></dd>
          <dt>メールアドレス <strong class="required">必須</strong></dt>
          <dd>
            <input type="email" name="" />
            <p role="note">
              メールの受信拒否設定や迷惑メールフィルタリング機能により、弊社からのメールが受信できないことがあります。事前に「@xxx.com」からのメールを受信できるよう設定をお願いいたします。
            </p>
          </dd>
          <dt>郵便番号</dt>
          <dd>
            <input type="number" name="zip1" />
            -
            <input type="number" name="zip2" />
          </dd>
          <dt>住所</dt>
          <dd><input type="text" name="address" /></dd>
          <dt>電話番号</dt>
          <dd>
            <input type="number" name="tel1" />
            -
            <input type="number" name="tel2" />
            -
            <input type="number" name="tel3" />
          </dd>
        </dl>
      </fieldset>
      <p class="agreeBox">
        <label><input type="checkbox" name="agreement" /> <a href="">個人情報の保持</a>に同意する</label>
        <strong class="required">必須</strong>
      </p>
      <div class="buttonWrapper --single">
        <button type="button" class="c-button" @click="toConfirm">確認する</button>
      </div>
    </template>
    <template v-else-if="formState === 2">
      <dl class="formGrid">
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

fieldset {
  position: relative;
  margin: 1.5em 0;
  padding: 2em 1em 0.5em;
  border: 1px solid $--color-silver;
}

legend {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: -1px;
  padding: 0.5em 1em;
  background-color: $--color-primary;
  color: $--color-white;
  font-weight: bold;
}

p[role='note'] {
  font-size: 12px;
  color: $--color-gray;

  &::before {
    content: '※';
  }
}

.formGrid {
  display: grid;
  grid-template-columns: 10em 1fr;
  border-top: 1px solid $--color-lightgray;

  & dt {
    border-bottom: 1px solid $--color-lightgray;
    background-color: $--color-smoke;
    padding: 10px;
  }

  & dd {
    border-bottom: 1px solid $--color-lightgray;
    margin: 0;
    padding: 10px;
  }

  @media (max-width: 414px) {
    grid-template-columns: 1fr;
    border-top: 0;

    & dt {
      border-top: 1px solid $--color-lightgray;
      border-bottom: 0;
      padding: 10px 0;
    }

    & dd {
      border-bottom: 0;
      padding: 10px 0;
    }
  }
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
textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 5px 10px;
  border: 1px solid $--color-silver;
  border-radius: 4px;
  background-color: $--color-smoke;

  &:focus {
    background-color: $--color-white;
  }
}

input[type='number'] {
  width: 4em;
  padding: 5px 10px;
  border: 1px solid $--color-silver;
  border-radius: 4px;
  background-color: $--color-smoke;

  &:focus {
    background-color: $--color-white;
  }
}

select {
  padding: 5px 10px;
  border: 1px solid $--color-silver;
  border-radius: 4px;
  background-color: $--color-smoke;
}

.agreeBox {
  padding: 1em 0;
  text-align: center;
}

.buttonWrapper {
  display: flex;
  justify-content: space-between;
  text-align: center;

  & .c-button {
    min-width: calc(50% - 0.5em);
  }

  &.--single {
    justify-content: center;
  }
}
</style>
