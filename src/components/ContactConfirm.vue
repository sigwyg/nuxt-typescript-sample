<template>
  <div>
    <fieldset>
      <legend>入力内容</legend>
      <dl class="formGrid">
        <template v-for="(data, index) in formData">
          <div v-if="data.value" :key="index">
            <dt>{{ data.label }}</dt>
            <dd>
              <template v-if="data.type === 'select'">
                {{ getOptionText(data) }}
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
  </div>
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

export default Vue.extend({
  name: 'ContactConfirm',

  props: {
    formData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    /**
     * @return {string}
     */
    getOptionText(data: FormData): string {
      if (!data || !data.options) return ''
      const option = data.options.find(option => option.value === data.value)
      const optionText: string = option && option.text ? option.text : ''
      return optionText
    },
  },
})
</script>

<style lang="scss" scoped></style>
