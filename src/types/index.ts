export interface IPhoto {
  id: string
  owner: string
  secret: string
  server: string
  farm: number
  title: string
  ispublic: number
  isfriend: number
  isfamily: number
}
export interface IData {
  page: number
  pages: number
  perpage: number
  photo: IPhoto[]
  total: number
}
