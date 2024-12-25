import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Importing context providers
import { CitiesProvider } from "./contexts/CityContexts";
import { AuthProvider } from "./contexts/FakeAuthContext";

// Importing ProtectedRoute to guard certain routes
import ProtectedRoute from "./pages/ProtectedRoute";

// Importing pages and components
import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import City from "./component/City";
import Form from "./component/Form";
import SpinnerFullPage from "./component/SpinnerFullPage";

import { lazy, Suspense } from "react";

// Implementing Lazy Loading
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// dist/assets/index-74a5dd4e.css   30.57 kB │ gzip:   5.13 kB
// dist/assets/index-354c1bc8.js   551.56 kB │ gzip: 161.31 kB

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    // Wrapping the app with authentication and cities context providers
    <AuthProvider>
      <CitiesProvider>
        {/* Setting up the React Router */}
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* Public routes */}
              <Route index element={<Homepage />} />{" "}
              {/* Default route to Homepage */}
              <Route path="product" element={<Product />} />{" "}
              {/* Route for Product page */}
              <Route path="Pricing" element={<Pricing />} />{" "}
              {/* Route for Pricing page */}
              <Route path="login" element={<Login />} />{" "}
              {/* Route for Login page */}
              {/* Protected routes */}
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />{" "}
                    {/* Protected layout for authenticated users */}
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />{" "}
                {/* Default route to CityList */}
                <Route path="cities" element={<CityList />} />{" "}
                {/* Route for CityList component */}
                <Route path="cities/:id" element={<City />} />{" "}
                {/* Route for individual City component */}
                <Route path="countries" element={<CountryList />} />{" "}
                {/* Route for CountryList component */}
                <Route path="form" element={<Form />} />{" "}
                {/* Route for Form component */}
              </Route>
              {/* Fallback route for undefined paths */}
              <Route path="*" element={<PageNotFound />} />{" "}
              {/* Route for 404 PageNotFound */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
