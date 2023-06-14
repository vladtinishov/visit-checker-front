export interface UserDto {
  id?: number
  name?: string
  groupId?: number
  login?: string
  password?: string
  lateTime?: number
}

export interface LoginUserDto {
  login?: string
  password?: string
}