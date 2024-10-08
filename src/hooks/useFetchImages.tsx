import { useEffect, useRef, useCallback, useReducer } from "react"
import { Action, IPhoto, State } from "../types"
import { fetchImagesFromAPI } from "../utils/api"

const initialState = {
  images: [],
  page: 1,
  loading: true,
  error: false,
  hasMore: true,
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

// type state = {
//   loading: boolean
//   error: boolean
// } |

const useFetchImages = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const observer = useRef<IntersectionObserver | null>(null)
  const { page, loading, hasMore, error } = state

  const lastImageElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !hasMore) return
      if (observer.current) observer.current.disconnect() // Stop observing if loading or no more Images
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
      const photo: IPhoto[] = await fetchImagesFromAPI(page, 20)

      if (photo.length === 0) {
        dispatch({ type: "SET_HAS_MORE", payload: false })
      } else {
        dispatch({ type: "SET_IMAGES", payload: [...state.images, ...photo] })
      }
      dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
      if (error) {
        dispatch({ type: "SET_ERROR", payload: true })
        dispatch({ type: "SET_LOADING", payload: false })
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
    lastImageElementRef,
  }
}

export default useFetchImages
