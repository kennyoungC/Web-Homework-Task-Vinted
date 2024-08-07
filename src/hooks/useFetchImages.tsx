import { useEffect, useRef, useCallback, useReducer } from "react"
import { Action, IPhoto } from "../types"
import { fetchImagesFromAPI } from "../utils/api"

const initialState = {
  images: [],
  page: 1,
  loading: true,
  error: false,
  hasMore: true,
}

interface State {
  images: IPhoto[]
  page: number
  loading: boolean
  error: boolean
  hasMore: boolean
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      }
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    case "SET_HAS_MORE":
      return {
        ...state,
        hasMore: action.payload,
      }
    default:
      return state
  }
}

const useFetchImages = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const observer = useRef<IntersectionObserver | null>(null)
  const { page, loading, hasMore, error } = state

  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !hasMore) return
      if (observer.current) observer.current.disconnect() // Stop observing if loading or no more posts
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: "SET_PAGE", payload: page + 1 }) //Trigger loading of new images by changing page number
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, page]
  )
  const fetchData = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: false })
    try {
      const photo: IPhoto[] = await fetchImagesFromAPI(page, 10)

      if (photo.length === 0) {
        dispatch({ type: "SET_HAS_MORE", payload: false })
      } else {
        dispatch({ type: "SET_IMAGES", payload: [...state.images, ...photo] })
      }
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      if (error) {
        console.log(error)
        dispatch({ type: "SET_ERROR", payload: true })
        return
      }
    }
  }, [page])

  useEffect(() => {
    if (hasMore) {
      fetchData()
    }
  }, [fetchData, hasMore])

  return {
    data: state.images,
    loading,
    error,
    lastBookElementRef,
  }
}

export default useFetchImages
