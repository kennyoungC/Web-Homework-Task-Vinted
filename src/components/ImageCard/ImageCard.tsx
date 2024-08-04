// import SampleImg from "../../assets/sample-img.avif"
import { IPhoto } from "../../types"
import Button from "../Button/Button"
import "./styles.scss"

const ImageCard = ({ data }: { data: IPhoto }) => {
  const imgUrl: string = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_q.jpg`

  return (
    <div className="card">
      <img alt="sampleImg" src={imgUrl} />
      <div className="card-content">
        <div>
          <h3>Walter Dog</h3>
          <hr />
          <p>Brad Nickerson</p>
        </div>
        <Button />
      </div>
    </div>
  )
}

export default ImageCard
