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
  const [imageSrc, setImageSrc] = useState("https://placehold.co/600x400")
  const imageRef = useRef<HTMLImageElement | null>(null)
  const baseImgUrl = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}`
  const isFav = favourites.includes(data.id)
  const imageSizes = [
    { suffix: "_s", width: 75 },
    { suffix: "_q", width: 150 },
    { suffix: "_t", width: 100 },
    { suffix: "_m", width: 240 },
    { suffix: "_n", width: 320 },
  ]

  useEffect(() => {
    const debounce = (func: Function, delay: number) => {
      let timeout: number | undefined = undefined
      return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = window.setTimeout(() => func.apply(this, args), delay)
      }
    }

    const observer = new IntersectionObserver(
      debounce((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          const imgUrl: string = `${baseImgUrl}_n.jpg`
          setImageSrc(imgUrl)
        }
      }, 100) // Debounce with 100ms delay
    )

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

  const srcSet = imageSizes
    .map(({ suffix, width }) => `${baseImgUrl}${suffix}.jpg ${width}w`)
    .join(",\n")

  const sizes = `
    (min-width: 320px) 280px,
    (min-width: 480px) 440px,
    (min-width: 768px) 600px,
    100vw
  `

  return (
    <div className="card">
      <img
        alt={data.title || "sampleImg"}
        ref={imageRef}
        src={imageSrc}
        srcSet={srcSet}
        sizes={sizes}
      />
      <div className="card-content">
        <div>
          <h3>{data.title ? data.title : "Walter Dog"}</h3>
          <hr />
          <p>{data.owner}</p>
        </div>

        <Button
          className={`${!isFav ? "btnFav" : "btnFav isFav"}`}
          text={`${!isFav ? "Favourite" : "Unfavourite"}`}
          onClick={() => {
            onToggleFav(data.id)
          }}
        />
      </div>
    </div>
  )
}

export default ImageCard
