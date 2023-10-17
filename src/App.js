import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import MainPage from "./Pages/MainPage";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import VanSetting from "./Pages/VanSetting";
import Setting from "./Pages/Setting";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import AddVan from "./Pages/AddVan";
function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/van" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/add-van" element={<AddVan />} />
        <Route path="/van/:van_id" element={<MainPage />} />
        <Route path="/van-setting/:van_id" element={<VanSetting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
