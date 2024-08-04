import { useState, useEffect, useRef, useCallback } from "react"
import { IPhoto } from "../types"
import { fetchImagesFromAPI } from "../utils/api"

const useFetchImages = () => {
  const [data, setData] = useState<IPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const observer = useRef<IntersectionObserver | null>(null)

  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !hasMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const photo = await fetchImagesFromAPI(page, 50)
      console.log(photo)
      if (photo.length === 0) {
        setHasMore(false)
      } else {
        const savedFavs = JSON.parse(localStorage.getItem("favorites") || "{}")
        const imagesWithFav = photo.map((image: IPhoto) => ({
          ...image,
          isFav: savedFavs[image.id] || false,
        }))
        setData((prevData) => [...prevData, ...imagesWithFav])
      }
      setLoading(false)
    } catch (error) {
      if (error) {
        console.log(error)
        setError(true)
        return
      }
    }
  }, [page])

  useEffect(() => {
    if (hasMore) {
      fetchData()
    }
  }, [fetchData, hasMore])

  return { data, loading, error, lastBookElementRef }
}

export default useFetchImages
