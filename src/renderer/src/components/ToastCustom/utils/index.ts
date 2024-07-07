import { Toast } from 'react-hot-toast'

export enum ToastCustomEnum {
  error = 'error',
  success = 'success',
}

export interface ToastProps {
  t?: Toast
  title?: string
  body?: string
  status: ToastCustomEnum
}
