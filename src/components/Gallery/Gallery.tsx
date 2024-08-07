import { FC, useEffect, useState } from "react"
import useFetchImages from "../../hooks/useFetchImages"
import { FetchHookData, IPhoto } from "../../types"
import ImageCard from "../ImageCard/ImageCard"
import "./Gallary.scss"
import Loading from "../Loading/Loading"

const initialFavorites = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites") as string)
  : []

const Gallery: FC = () => {
  const {
    data = [],
    loading,
    lastBookElementRef,
    error,
  }: FetchHookData = useFetchImages()
  const [favorites, setFavorites] = useState<string[]>(initialFavorites)

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const handleFavourites = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  return (
    <div className="gallery">
      <h3 className="fav-title">
        {favorites.length
          ? `You have ${favorites.length} favourites`
          : "No favourites yet"}
      </h3>
      <div className="gallery-image-cont">
        <ul role="list">
          {data.map((images: IPhoto, index: number) => {
            return (
              <li
                key={index}
                ref={data.length === index + 1 ? lastBookElementRef : null}
              >
                <ImageCard
                  data={images}
                  favourites={favorites}
                  onToggleFav={handleFavourites}
                />
              </li>
            )
          })}
        </ul>
        <div className="loading-cont"> {loading && <Loading />}</div>
        {error && <p>Error</p>}
      </div>
    </div>
  )
}

export default Gallery
