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
  companyName: string
  departmentName: string
  role: string
}

export interface RequestLoginUser {
  email: string
  password: string
}