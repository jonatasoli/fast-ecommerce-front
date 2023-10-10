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
