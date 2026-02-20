import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile.tsx";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Users from "./pages/Users.tsx";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<Products />} />
<Route path="/admin/users" element={<Users />} />
<Route path="/admin/categories" element={<Categories />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;