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
import ShopPage from "./Pages/ShopPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx"
import AboutusPage from './Pages/AboutusPage.jsx';
import store from './store/store.js'
import { Provider } from "react-redux";
import WishlistPage from "./Pages/WishlistPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx"
import { AuthLayout } from "./Components/index.js";

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
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/aboutUs",
        element: (
          <AboutusPage />
        )
      },
      {
        path: "/product/:id",
        element: (
          <ProductDetail />
        )
      },
      {
        path: "/wishlist",
        element: (
          <AuthLayout authentication>
            <WishlistPage />
          </AuthLayout>
        )
      },
      {
        path: "/profile",
        element: (
          <ProfilePage />
        )
      },
      // {
      //   path: "/profile/:slug",
      //   element: (
      //     <ProfilePage />
      //   )
      // },
      {
        path: "/cart",
        element: (
          <AuthLayout authentication>
            <CartPage />
          </AuthLayout>
        )
      }
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
} else {
  console.error("Root Element Not Found!");
}
