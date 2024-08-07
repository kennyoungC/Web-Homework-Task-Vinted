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
  isFav?: boolean
}
export interface IData {
  page: number
  pages: number
  perpage: number
  photo: IPhoto[]
  total: number
}

export type FetchHookData = {
  data: IPhoto[]
  loading: boolean
  error: boolean
  lastBookElementRef: (node: HTMLElement | null) => void
}

export type Action =
  | { type: "SET_IMAGES"; payload: IPhoto[] }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_HAS_MORE"; payload: boolean }
