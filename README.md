# Vinted Web Task - Kenneth Obi

This project is a solution to the Vinted Web Task, which involves creating a responsive web application that retrieves data from an API, implements infinite scroll, allows users to favorite items.

## Technologies Used

- Vite: For development and build tooling
- SCSS: For styling
- TypeScript: For static typing
- React : For building the user interface
- vitest: For testing

## Features

- Infinite Scroll: Automatically loads more images as the user scrolls down.
- Favouriting Images: Users can mark images as favourites. Favourites persist across page reloads.
- Lazy Loading: Images are loaded only when they enter the viewport.
- Responsive Design: Layout adjusts to different screen sizes (Desktop, Tablet, Phone).
- Responsive Images: Higher quality images are loaded only when needed to save bandwidth
- Hover State: Item hover state as per design requirements.

## Additional Feature by me

- Total Favourite: This allows user to see the total numbers of their favourite item. On scroll, it sticks to the top of the page so users can see the total numbers of favourite item irrespective of where they are on the page
- Loader: This is display whenever the data from the API is still being Fetched
- Truncate Long Text: Some of the titles coming from the API were super long and causeing distortion in the images. To fix that, I used text ellipsis to shorten the titles and added '...' at the end to show there's more to the text.

## Getting Started

To run this project locally, follow these steps:

---

1. Clone or download the repository:
   git clone https://github.com/kennyoungC/Web-Homework-Task-Vinted.git
   cd Web-Homework-Task-Vinted

---

---

2. Install dependencies:
   npm install or yarn install

---

---

3. Set up environment variables:
   VITE_API_KEY=your_flickr_api_key

---

---

4. Run the the application by startin the server
   yarn run dev or npm run start

---

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Testing

This project includes basic tests to ensure its functionality. To run the tests, use the following command:

```
npm run test or yarn run test
and press q to quit
```

## Additional Notes

- This project follows best practices for code organization and maintainability.
- The use of TypeScript ensures type safety and improves code quality.
- Styling is implemented using SCSS, providing flexibility and modularity.
- The project utilizes Vite as the development environment for fast and efficient development.

## Conclusion

This project meets all the requirements of the Vinted Web Task. It showcases my expertise in React, TypeScript, SCSS, and API integration. The code is well-documented and tested for reliable functionality.

If you have any questions or need further assistance, feel free to reach out @ obikenneth913@gmail.com.
