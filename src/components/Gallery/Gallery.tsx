import useFetchImages from "../../hooks/useFetchImages"
import { IPhoto } from "../../types"
import ImageCard from "../ImageCard/ImageCard"
import "./Gallary.scss"

const Gallery = () => {
  const {
    data = [],
    loading,
    lastBookElementRef,
  }: {
    data: IPhoto[]
    loading: boolean
    error: boolean
    lastBookElementRef: (node: HTMLElement | null) => void
  } = useFetchImages()

  return (
    <ul role="list" className="gallery">
      {data.map((images: IPhoto, index: number) => {
        return (
          <li
            key={index}
            ref={data.length === index + 1 ? lastBookElementRef : null}
          >
            <ImageCard data={images} />
          </li>
        )
      })}
      {loading && <p>Loading...</p>}
      {/* {error && loading === false && <p>Error</p>} */}
    </ul>
  )
}

export default Gallery
