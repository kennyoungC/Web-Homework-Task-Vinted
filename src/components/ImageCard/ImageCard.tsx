import { FC, useEffect, useRef, useState } from "react"
import { IPhoto } from "../../types"
import Button from "../Button/Button"
import "./styles.scss"

interface IImageCard {
  data: IPhoto
  onToggleFav: (id: string) => void
  favourites: string[]
}

const ImageCard: FC<IImageCard> = ({ data, onToggleFav, favourites }) => {
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/300")
  const imageRef = useRef<HTMLImageElement | null>(null)
  const baseImgUrl = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}`

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const imgUrl: string = `${baseImgUrl}_b.jpg`
        setImageSrc(imgUrl)
      }
    })
    const currentImageRef = imageRef.current
    if (currentImageRef) {
      observer.observe(currentImageRef)
    }
    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef)
      }
    }
  }, [baseImgUrl, data.id, data.secret, data.server])

  const srcSet = `
  ${`${baseImgUrl}_s.jpg`} 75w,
  ${`${baseImgUrl}_q.jpg`} 150w,
  ${`${baseImgUrl}_t.jpg`} 100w,
  ${`${baseImgUrl}_m.jpg`} 240w,
  ${`${baseImgUrl}_n.jpg`} 320w,
  ${`${baseImgUrl}_w.jpg`} 400w,
  ${`${baseImgUrl}_z.jpg`} 640w,
  ${`${baseImgUrl}_c.jpg`} 800w,
  ${`${baseImgUrl}_b.jpg`} 1024w,


`

  const sizes = `
    (max-width: 600px) 480px,
    (max-width: 1200px) 800px,
    1200px
  `

  return (
    <div className="card">
      <img
        alt={data.title || "sampleImg"}
        ref={imageRef}
        src={imageSrc}
        loading="lazy"
        srcSet={srcSet}
        sizes={sizes}
      />
      <div className="card-content">
        <div>
          <h3>Walter Dog</h3>
          <hr />
          <p>Brad Nickerson</p>
        </div>

        <Button
          className={`${
            !favourites.includes(data.id) ? "btn_fav" : "btn_fav is_fav"
          }`}
          text={`${
            !favourites.includes(data.id) ? "Favourite" : "Unfavourite"
          }`}
          onClick={() => {
            onToggleFav(data.id)
          }}
        />
      </div>
    </div>
  )
}

export default ImageCard
