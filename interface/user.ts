export interface User {
  id: number
  email: string
  password: string
  name: string
  companyId: string
  departmentId: string
  role: string
  createdAt: Date
  updatedAt: Date
}