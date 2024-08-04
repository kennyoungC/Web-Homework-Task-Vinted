// import SampleImg from "../../assets/sample-img.avif"
import { useEffect, useState } from "react"
import { IPhoto } from "../../types"
import Button from "../Button/Button"
import "./styles.scss"

const ImageCard = ({ data }: { data: IPhoto }) => {
  const [isFav, setIsFav] = useState<boolean>(data?.isFav || false)

  const imgUrl: string = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_q.jpg`

  useEffect(() => {
    // Save favorite state to local storage whenever it changes
    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "{}")
    savedFavs[data.id] = isFav
    localStorage.setItem("favorites", JSON.stringify(savedFavs))
  }, [isFav, data.id])

  return (
    <div className="card">
      <img alt="sampleImg" src={imgUrl} loading="lazy" />
      <div className="card-content">
        <div>
          <h3>Walter Dog</h3>
          <hr />
          <p>Brad Nickerson</p>
        </div>
        <Button
          isFav={isFav}
          onClick={() => {
            setIsFav(!isFav)
          }}
        />
      </div>
    </div>
  )
}

export default ImageCard
