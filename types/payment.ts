import type { ServerResponse } from './api'

export type PixPaymentStatusResponse = ServerResponse<{
  payment_id: number
  gateway_payment_id: number
  status: string
}>
