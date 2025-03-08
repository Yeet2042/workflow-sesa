import { Department } from "./department"

export interface TotalExpenditure {
  id: string
  year: number
  amount: number
  remaining: number
  createdAt: Date
  updatedAt: Date
  companyId: string
  expenditure: ExpenditurWithDepartment[]
}

export interface ExpenditurWithDepartment {
  id: string
  year: number
  amount: number
  remaining: number
  createdAt: Date
  updatedAt: Date
  departmentId: string
  department: Department
}