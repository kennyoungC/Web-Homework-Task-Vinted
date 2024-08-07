import { FC, ButtonHTMLAttributes } from "react"
import "./styles.scss"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const Button: FC<IButton> = (props) => {
  const { text, ...restProps } = props
  return (
    <button type="button" {...restProps}>
      {text}
    </button>
  )
}

export default Button
