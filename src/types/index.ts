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

export type FetchHookData = {
  data: IPhoto[]
  loading: boolean
  error: boolean
  lastImageElementRef: (node: HTMLElement | null) => void
}
export type State = {
  images: IPhoto[]
  page: number
  loading: boolean
  error: boolean
  hasMore: boolean
}

export type Action =
  | { type: "SET_IMAGES"; payload: IPhoto[] }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_HAS_MORE"; payload: boolean }
