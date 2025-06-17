import type { ServerResponse } from './api'

export interface CartItem {
  product_id: string
  name: string
  image_path: string
  quantity: number
  price: string
  discount_price: string
}

export interface CartFreight {
  price: string
  delivery_time: number
  max_date: string
}

export interface CartData {
  subtotal: string
  total: string
  zipcode: string
  coupon: string | null
  discount: string
  uuid: string
  afiiliate: string
  freight_product_code: string
  shipping_is_payment: boolean
  user_address_id: number
  shipping_address_id: string | null
  customer_id: string
  gateway_provider: string
  installments: number
  subtotal_with_fee: string
  total_with_fee: string
}

export interface CartUserData {
  user_id: number
  name: string
  email: string
  document: string
  phone: string
}

export interface CartCreditCardData extends CartData {
  payment_method: 'credit-card'
  payment_method_id: string | null
  payment_intent: string | null
  card_token: string | null
}

export interface CartDataPix extends CartData {
  payment_method: 'pix'
  pix_qr_code: string
  pix_qr_code_base64: string
  pix_payment_id: string
  payment_intent: number | null
  payment_method_id: string
}

export type AddPixPaymentMehodResponse = ServerResponse<
  {
    cart_items: CartItem[]
    freight: CartFreight
    user_data: CartUserData
  } & CartDataPix
>
