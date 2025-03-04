export interface Budget {
  id: number
  name: string
  description: string
  quantity: number
  price: number
  total: number
  status: string
  createdAt: Date
  updatedAt: Date
  userId: number
}