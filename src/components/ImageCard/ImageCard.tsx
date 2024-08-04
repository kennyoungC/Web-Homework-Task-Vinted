import SampleImg from "../../assets/sample-img.avif"
import Button from "../Button/Button"
import "./styles.scss"

const ImageCard = () => {
  return (
    <div className="card">
      <img alt="sampleImg" src={SampleImg} />
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
