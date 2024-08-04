import "./App.scss"
import Gallery from "./components/Gallery/Gallery"

function App() {
  return (
    <div className="container">
      <div className="header-cont">
        <h1>Vinted Assignment</h1>
        <p>
          This is a web application that allows for the user to browse items
          using infinite-scrolling and favourite them
        </p>
      </div>
      <div className="gallery-cont">
        <Gallery />
      </div>
    </div>
  )
}

export default App
