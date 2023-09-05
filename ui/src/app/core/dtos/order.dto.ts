export class CreateOrderRequest {
  table!: number
  items!: { _id: string, count: number }[]
  type: 'food' | 'drinks' = 'food'
}
