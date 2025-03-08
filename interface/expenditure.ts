export interface TotalExpenditure {
  id: string
  year: number
  amount: number
  createdAt: Date
  updatedAt: Date
  companyId: string
}

export interface Expenditure {
  id: string
  year: number
  amount: number
  createdAt: Date
  updatedAt: Date
  departmentId: string
}