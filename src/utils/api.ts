export const fetchImagesFromAPI = async (page: number, limit: number) => {
  try {
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=845351c059cfddbd8a67d27cb8ec9593&per_page=${limit}&page=${page}&format=json&nojsoncallback=1`
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const images = await response.json()

    return images.photos.photo
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error)
  }
}
