/**
 * Create order response DTO.
 */
export class CreateOrderRequest {
  table!: number
  items!: { _id: string, count: number }[]
  type: 'food' | 'drinks' = 'food'
}

/**
 * Best selling item response DTO.
 */
export class BestSellingItemResponse {
  name!: string
  count!: number
}
