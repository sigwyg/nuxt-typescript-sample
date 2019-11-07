<template>
  <form action method="post">
    <template v-if="formState === 1">
      <p>
        入力必須項目には「
        <strong class="required">必須</strong>」をつけていますので、必ず入力してください。
      </p>

      <ul v-if="errors.length > 0">
        <li v-for="(data, index) in errors" :key="index">
          <span v-if="data.errorType === 'agree'">『{{ data.label }}』への同意をお願いいたします</span>
          <span v-else-if="data.errorType === 'required'">『{{ data.label }}』を入力してください</span>
          <span v-else-if="data.errorType === 'email'">『{{ data.label }}』のEmail形式が間違っています</span>
          <span v-else-if="data.errorType === 'number'">『{{ data.label }}』は半角数字で入力してください</span>
          <span v-else-if="data.errorType === 'maxnumber'">『{{ data.label }}』の文字数が多すぎます</span>
          <span v-else>『{{ data.label }}』に何かエラーがあります</span>
        </li>
      </ul>

      <fieldset>
        <legend>お問い合わせ内容</legend>
        <dl class="formGrid">
          <template v-for="(data, index) in formDataContent">
            <div :key="index">
              <dt>
                {{ data.label }}
                <strong v-if="data.required" class="required">必須</strong>
              </dt>
              <dd>
                <!-- form elements -->
                <select
                  v-if="data.type === 'select'"
                  v-model="data.value"
                  :name="data.name"
                  :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                >
                  <option v-for="(option, idx) in data.options" :key="`option${idx}`" :value="option.value">{{
                    option.text
                  }}</option>
                </select>
                <textarea
                  v-else-if="data.type === 'textarea'"
                  v-model="data.value"
                  :name="data.name"
                  :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                  rows="8"
                />
                <input
                  v-else
                  v-model="data.value"
                  :type="data.type"
                  :name="data.name"
                  :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                />
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
              <dt>
                {{ data.label }}
                <strong v-if="data.required" class="required">必須</strong>
              </dt>
              <dd>
                <!-- form elements -->
                <select
                  v-if="data.type === 'select'"
                  v-model="data.value"
                  :name="data.name"
                  :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                >
                  <option v-for="(option, idx) in data.options" :key="`option${idx}`" :value="option.value">{{
                    option.text
                  }}</option>
                </select>
                <textarea
                  v-else-if="data.type === 'textarea'"
                  v-model="data.value"
                  :name="data.name"
                  :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                  rows="8"
                />
                <template v-else-if="data.type === 'serialNumber' && data.options.length > 0">
                  <template v-for="(option, idx) in data.options">
                    <span :key="idx" class="serialNumber">
                      <input
                        v-model="option.value"
                        :name="option.name"
                        type="number"
                        :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                        @change="setNumber(data)"
                      />
                    </span>
                  </template>
                </template>
                <input
                  v-else
                  v-model="data.value"
                  :type="data.type"
                  :name="data.name"
                  :class="{ hasError: checkError(data), isValid: checkValid(data) }"
                />
                <p v-if="data.mailNote" role="note">
                  メールの受信拒否設定や迷惑メールフィルタリング機能により、弊社からのメールが受信できないことがあります。事前に「@xxx.com」からのメールを受信できるよう設定をお願いいたします。
                </p>
              </dd>
            </div>
          </template>
        </dl>
      </fieldset>
      <p class="agreeBox">
        <label>
          <input ref="agreement" type="checkbox" name="agreement" />
          <a href>個人情報の保持</a>に同意する
        </label>
        <strong class="required">必須</strong>
      </p>
      <div class="buttonWrapper --single">
        <button type="button" class="c-button" @click="toConfirm">確認する</button>
      </div>
    </template>
    <template v-else-if="formState === 2">
      <!-- output data -->
      <ContactConfirm :form-data="[...formDataContent, ...formDataAddress]" />
      <div class="buttonWrapper">
        <button type="button" class="c-button --gray" @click="toForm">戻る(編集する)</button>
        <button type="button" class="c-button" @click="toSend">この内容で送信する</button>
      </div>
    </template>
    <template v-else>
      <ContactSend />
    </template>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import ContactConfirm from '@/components/ContactConfirm.vue'
import ContactSend from '@/components/ContactSend.vue'

enum FormTypes {
  text,
  email,
  number,
  select,
  checkbox,
  radio,
  textarea,
  serialNumber,
}

enum errorType {
  required = 'required',
  number = 'number',
  maxnumber = 'maxnumber',
  email = 'email',
  agree = 'agree',
}

interface Error {
  name: string
  label: string
  hasError: boolean
  errorType: errorType
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
  errors: Error[]
  formDataContent: FormData[]
  formDataAddress: FormData[]
}

export default Vue.extend({
  name: 'ContactForm',
  components: {
    ContactConfirm,
    ContactSend,
  },
  data(): ContactFormData {
    return {
      formState: 1,
      errors: [],
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

  computed: {
    /**
     * @param {FormData}
     * @return {boolean}
     */
    checkError() {
      const self = this
      return function(data: FormData) {
        const error = self.errors.findIndex(item => item.name === data.name)
        return error > 0
      }
    },

    /**
     * form要素がerrorからvalidになったらtrue
     * @param {FormData}
     * @return {boolean}
     */
    checkValid() {
      const self = this
      return function(data: FormData): boolean {
        if (self.errors.length === 0) return false
        return !self.checkError(data)
      }
    },
  },

  methods: {
    /**
     * 一連の数値を結合して、valueにする。
     * イメージは「tel1 + tel2 + tel3 = tel」
     * @param {formData} type: serialNumberのObject
     */
    setNumber(data: FormData): void {
      if (!data || !data.options) return
      const optionValues: Array<string> = data.options.map(item => item.value)
      data.value = optionValues.join('')
    },

    /**
     * form change
     */
    toConfirm(): void {
      if (this.checkData()) {
        this.formState = 2
      } else {
        // errorがあったら先頭に戻る（エラーボックス見させる）
        window.scrollTo(0, 0)
      }
    },
    toForm(): void {
      this.formState = 1
    },
    toSend(): void {
      this.formState = 3
      // fetch or form.submit()
      console.log([...this.formDataContent, ...this.formDataAddress])
    },

    /**
     * validation
     * @return {boolean} trueでOK. falseでerror
     */
    checkData(): boolean {
      // initialized
      this.errors = []
      const data = [...this.formDataContent, ...this.formDataAddress]

      // check agreement
      const agreement = this.$refs.agreement as HTMLInputElement
      if (!agreement.checked) {
        this.errors.push({
          name: 'agreement',
          label: '個人情報の保持',
          hasError: true,
          errorType: errorType.agree,
        })
      }

      // check required
      const required = data.filter(item => item.required === true && item.value === '')
      if (required.length > 0) this.setErrors(required, errorType.required)

      // check email
      // - https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      const email = data.filter(item => item.type === 'email' && !emailRegex.test(item.value))
      if (email.length > 0) this.setErrors(email, errorType.email)

      // check number
      const numberRegex = /^[0-9]+$/
      const isNumber = data.filter(item => {
        return item.type === 'serialNumber' && item.value && !numberRegex.test(item.value)
      })
      if (isNumber.length > 0) this.setErrors(isNumber, errorType.number)

      // check max-number
      const number = data.filter(item => {
        if (item.type === 'serialNumber') {
          if (!item.options) return false
          return item.options.every(elm => elm.value.length > 4)
        }
        return false
      })
      if (number.length > 0) this.setErrors(number, errorType.maxnumber)

      // stop submit
      return this.errors.length < 1
    },

    /**
     * @param {FormData}
     */
    setErrors(data: FormData[], type: errorType): void {
      data.forEach(item => {
        this.errors.push({
          name: item.name,
          label: item.label,
          hasError: true,
          errorType: type,
        })
      })
    },
  },
})
</script>

<style lang="scss">
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

  &.hasError {
    border: 2px solid red;
  }

  &.isValid {
    border: 2px solid green;
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

  &.hasError {
    border: 2px solid red;
  }

  &.isValid {
    border: 2px solid green;
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
