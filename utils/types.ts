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

export interface Checkout {
  shipping_is_payment: boolean
  user_address: Address
  shipping_address: Address
}

export interface CreditCard {
  credit_card_number: string
  credit_card_name: string
  credit_card_expiration: string
  credit_card_cvv: string
  credit_card_installments: number
  type_document: string
  document_number: string
}
