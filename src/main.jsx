import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Optional: Normalize styles
import theme from "./Styles/theme";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShopPage from "./Pages/shopPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      // {
      //   path: "/wishlist",
      //   element: (
      //     <Wishlist />
      //   )
      // },
      // {
      //   path: "/profile",
      //   element: (
      //     <ProfilePage />
      //   )
      // },
      // {
      //   path: "/profile/:slug",
      //   element: (
      //     <ProfilePage />
      //   )
      // },
      // {
      //   path: "/cart",
      //   element: (
      //     <Cart />
      //   )
      // }
    ],
  },
]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </StrictMode>,
// )

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
      {/* </Provider> */}
    </StrictMode>
  );
} else {
  console.error("Root Element Not Found!");
}
