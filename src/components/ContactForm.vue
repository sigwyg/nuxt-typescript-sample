<template>
  <form>
    <template v-if="formState === 1">
      <p>入力必須項目には「<strong class="required">必須</strong>」をつけていますので、必ず入力してください。</p>

      <fieldset>
        <legend>お問い合わせ内容</legend>
        <dl class="formGrid">
          <template v-for="(data, index) in formDataContent">
            <div :key="index">
              <dt>{{ data.label }} <strong v-if="data.required" class="required">必須</strong></dt>
              <dd>
                <!-- form elements -->
                <select v-if="data.type === 'select'" v-model="data.value" :name="data.name">
                  <option v-for="(option, idx) in data.options" :key="`option${idx}`" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <textarea v-else-if="data.type === 'textarea'" v-model="data.value" :name="data.name" rows="8" />
                <input v-else v-model="data.value" :type="data.type" :name="data.name" />
              </dd>
            </div>
          </template>
        </dl>
      </fieldset>

      <fieldset>
        <legend>連絡先</legend>
        <dl class="formGrid">
          <template v-for="(data, index) in formDataAddress">
            <div :key="index">
              <dt>{{ data.label }} <strong v-if="data.required" class="required">必須</strong></dt>
              <dd>
                <!-- form elements -->
                <select v-if="data.type === 'select'" v-model="data.value" :name="data.name">
                  <option v-for="(option, idx) in data.options" :key="`option${idx}`" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <textarea v-else-if="data.type === 'textarea'" v-model="data.value" :name="data.name" rows="8" />
                <template v-else-if="data.type === 'serialNumber' && data.options.length > 0">
                  <template v-for="(option, idx) in data.options">
                    <span :key="idx" class="serialNumber">
                      <input v-model="option.value" :name="option.name" type="number" />
                    </span>
                  </template>
                </template>
                <input v-else v-model="data.value" :type="data.type" :name="data.name" />
                <p v-if="data.mailNote" role="note">
                  メールの受信拒否設定や迷惑メールフィルタリング機能により、弊社からのメールが受信できないことがあります。事前に「@xxx.com」からのメールを受信できるよう設定をお願いいたします。
                </p>
              </dd>
            </div>
          </template>
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
      <!-- output data -->
      <fieldset>
        <legend>入力内容</legend>
        <dl class="formGrid">
          <template v-for="(data, index) in [...formDataContent, ...formDataAddress]">
            <div v-if="data.value" :key="index">
              <dt>{{ data.label }}</dt>
              <dd>
                <template v-if="data.type === 'select'">
                  {{ data.selected }}
                </template>
                <template v-else-if="data.type === 'serialNumber' && data.options.length > 0">
                  <template v-for="(option, idx) in data.options">
                    <span :key="idx" class="serialNumber">
                      {{ option.value }}
                    </span>
                  </template>
                </template>
                <template v-else>
                  <div style="white-space: pre-line;">{{ data.value }}</div>
                </template>
              </dd>
            </div>
          </template>
        </dl>
      </fieldset>
      <div class="buttonWrapper">
        <button type="button" class="c-button --gray" @click="toForm">戻る(編集する)</button>
        <button type="button" class="c-button" @click="toSend">この内容で送信する</button>
      </div>
    </template>
    <template v-else>
      <p>お問い合わせありがとうございました。</p>
      <p>
        原則３営業日以内にご返答いたします。ただし、お問い合わせ内容によっては、お時間をいただく場合やお答えできない場合があります。お電話にてご連絡させていただく場合もありますので、予めご了承ください。
      </p>
    </template>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

enum FormTypes {
  text,
  email,
  number,
  select,
  checkbox,
  radio,
  textarea,
}

interface FormOptions {
  value: string
  text?: string
  name?: string
}

interface FormData {
  label: string
  required: boolean
  type: keyof typeof FormTypes
  value: string
  name: string
  options?: FormOptions[]
  mailNote?: boolean
}

interface ContactFormData {
  formState: number
  formDataContent: FormData[]
  formDataAddress: FormData[]
}

export default Vue.extend({
  name: 'ContactForm',
  data(): ContactFormData {
    return {
      formState: 1,
      formDataContent: [
        {
          label: '問い合わせ件名',
          required: true,
          type: 'text',
          name: 'title',
          value: '',
        },
        {
          label: 'どの製品について',
          required: false,
          type: 'select',
          name: 'target',
          value: '',
          options: [
            { value: '', text: '項目を選択してください' },
            { value: 'a', text: 'Aサービスについて' },
            { value: 'b', text: 'Bサービスについて' },
            { value: 'c', text: 'Cサービスについて' },
            { value: 'x', text: 'その他' },
          ],
        },
        {
          label: '問い合わせ内容',
          required: true,
          type: 'textarea',
          name: 'content',
          value: '',
        },
      ],
      formDataAddress: [
        {
          label: '名前(姓名) ',
          required: true,
          type: 'text',
          name: 'fullname',
          value: '',
        },
        {
          label: 'ふりがな(姓名) ',
          required: true,
          type: 'text',
          name: 'fullname_kana',
          value: '',
        },
        {
          label: '会社名',
          required: false,
          type: 'text',
          name: 'company',
          value: '',
        },
        {
          label: 'メールアドレス',
          required: true,
          type: 'email',
          name: 'email',
          value: '',
          mailNote: true,
        },
        {
          label: '郵便番号',
          required: false,
          type: 'serialNumber',
          name: 'zip',
          value: '',
          options: [{ name: 'zip1', value: '' }, { name: 'zip2', value: '' }],
        },
        {
          label: '住所',
          required: false,
          type: 'text',
          name: 'address',
          value: '',
        },
        {
          label: '電話番号',
          required: false,
          type: 'serialNumber',
          name: 'tel',
          value: '',
          options: [{ name: 'tel1', value: '' }, { name: 'tel2', value: '' }, { name: 'tel3', value: '' }],
        },
      ],
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
  border-top: 1px solid $--color-lightgray;

  & > div {
    display: grid;
    grid-template-columns: 10em 1fr;
  }

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
    border-top: 0;

    & > div {
      grid-template-columns: 1fr;
    }

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

.serialNumber {
  &::after {
    content: '-';
    display: inline-block;
    padding: 0 5px;
  }

  &:last-of-type::after {
    content: '';
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
