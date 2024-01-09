import { CATEGORIES } from './enums'

type Description = {
  content: string
  composition: string
  how_to_use: string
}

type Installments = {
  count: number
  value: number
}

type Variant = {
  value: string
  label: string
}

export type ProductItem = {
  product_id: number
  name: string
  image_path: string
  category: {
    category_id: number
    path: string
    name: string
  }
  uri: string
  price: number
  description?: Description
  installments_list?: Installments
  variants?: Variant[]
  direct_sales: boolean
  discount: number
  showcase: boolean
  show_discount: false
  quantity: number
  heigth?: number
  width?: number
  weigth?: number
  length?: number
  sku: string
}

export type FeatureItem = {
  label: string
  image: string
  uri: string
}

export type CartItem = {
  name: string
  image_path: string
  product_id: number
  price: number
  quantity: number
  uri?: string
}

export type CategoryOption = {
  label: string
  category: CATEGORIES
}

export type PaginatedProducts = {
  products: ProductItem[]
  total_pages: number
  total_records: number
}

export interface Cart {
  uuid: string
  affiliate: string
  coupon: string
  discount: string
  freight: {
    price: string
    delivery_time: string
    max_date?: string
  }
  freight_product_code?: string
  subtotal: string
  subtotal_with_fee?: string
  total: string
  total_with_fee?: string
  zipcode: string
  cart_items: CartItem[]
}

export interface Address {
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  street_number: string
  address_complement: string
  zipcode: string
}

export interface Payment {
  payment_method: string
  payment_method_id: string
  payment_intent?: string | null
  customer_id: string
  card_token?: string
  pix_qr_code?: string
  pix_qr_code_base64?: string
  pix_payment_id?: number
  gateway_provider: string
  installments: number
}

export type User = {
  user_id: number | null
  name: string
  email: string
  document: string
  phone: string
}

export type Order = {
  order_id: number
  order_date: string
  order_status: string
  cancelled_at: string | null
  cancelled_reason: string | null
  tracking_number: string | null
  freight: string
  products: CartItem[]
}

export interface Checkout extends Cart, Payment {
  user_data: User
  shipping_is_payment: boolean
  user_address_id: number
  shipping_address_id: number | null
}

export interface CreditCard {
  creditCardNumber: string
  creditCardName: string
  creditCardExpiration: string
  creditCardCvv: string
  installments: number
  installmentsMessage: string
  typeDocument: string
  document: string
}

export type BaseAddress = {
  address_id: number | null
  user_id: number | null
  country: string
  city: string
  state: string
  neighborhood: string
  street: string
  street_number: string
  address_complement: string | null
  zipcode: string
  active: boolean
}

export type UserAddress = BaseAddress

export type ShippingAddress = BaseAddress | null

export type CartAddress = {
  shipping_is_payment: boolean
  user_address: UserAddress
  shipping_address: ShippingAddress | null
  user_address_id?: number | null
  shipping_address_id?: number | null
}

export type CreditCardPayment = {
  payment_gateway: string
  card_token: string
  card_issuer: string
  card_brand: string
  installments: number
}
