import { expect, test, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import App from "../App.js"
import Button from "../components/Button/Button.js"
import Gallery from "../components/Gallery/Gallery.js"
import ImageCard from "../components/ImageCard/ImageCard.js"

test("it should have Vinted assignment", async () => {
  render(<App />)

  const message = screen.queryByText(/Vinted Assignment/)
  expect(message).toBeVisible()
})

test("Button calls onClick when clicked", () => {
  const onClickMock = vi.fn()
  const { getByText } = render(<Button text="Click me" onClick={onClickMock} />)
  const button = getByText("Click me")
  fireEvent.click(button)
  expect(onClickMock).toHaveBeenCalledTimes(1)
})

test("mount component", async () => {
  expect(Gallery).toBeTruthy()
  expect(App).toBeTruthy()
  expect(ImageCard).toBeTruthy()
})
