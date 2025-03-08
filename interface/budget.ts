import { User } from "./user"

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

export interface BudgetWithUser {
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
  user: User
}