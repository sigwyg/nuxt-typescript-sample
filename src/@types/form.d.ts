export interface Error {
  name: string
  label: string
  hasError: boolean
  errorType: 'required' | 'number' | 'maxnumber' | 'email' | 'agree'
}

export interface FormOptions {
  value: string
  text?: string
  name?: string
}

export interface FormData {
  label: string
  required: boolean
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'serialNumber'
  value: string
  name: string
  options?: FormOptions[]
  mailNote?: boolean
}

export interface ContactFormData {
  formState: number
  hasCheck: boolean
  errors: Error[]
  formDataContent: FormData[]
  formDataAddress: FormData[]
}
