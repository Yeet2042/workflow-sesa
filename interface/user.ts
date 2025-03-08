import { Company } from "./company"
import { Department } from "./department"

export interface User {
  id: number
  email: string
  password: string
  name: string
  companyId: number
  departmentId: number
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface RequestRegisterUser {
  email: string
  password: string
  name: string
  company: Company
  department: Department
  role: string
}