import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Category from "./pages/Category";
import MainSectorPage from "./pages/MainSectorPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contactus" element={<ContactUs />} />
    <Route path="/login" element={<Login />} />
    <Route path="/categories/:categoryId" element={<Category />} />
    <Route exact path="/:lang/:category/:title" element={<MainSectorPage />} />
  </Routes>
);

export default AppRoutes;
