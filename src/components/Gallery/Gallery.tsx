import ImageCard from "../ImageCard/ImageCard"
import "./Gallary.scss"

const Gallery = () => {
  return (
    <ul role="list" className="gallery">
      {Array.from({ length: 9 }, (_, i) => (
        <li key={i}>
          <ImageCard />
        </li>
      ))}
    </ul>
  )
}

export default Gallery
