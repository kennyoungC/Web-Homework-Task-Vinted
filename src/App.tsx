import { FC } from "react"
import "./App.scss"
import Gallery from "./components/Gallery/Gallery"

const App: FC = () => {
  return (
    <div className="container">
      <div className="header-cont">
        <h1>Vinted Assignment</h1>
        <p>
          This is a web application that allows for the user to browse Images
          using infinite-scrolling and favourite them
        </p>
      </div>
      <>
        <Gallery />
      </>
    </div>
  )
}

export default App
