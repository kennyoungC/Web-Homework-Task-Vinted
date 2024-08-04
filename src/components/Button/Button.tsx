import "./styles.scss"

const Button = ({
  onClick,
  isFav,
}: {
  isFav: boolean
  onClick: () => void
}) => {
  return (
    <button className={`btn_fav ${isFav ? "is_fav" : ""}`} onClick={onClick}>
      {isFav ? "Unfavourite" : "Favourite❤️"}
    </button>
  )
}

export default Button
