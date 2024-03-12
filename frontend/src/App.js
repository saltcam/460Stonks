import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Navigate from "./components/Navigate";
import Footer from "./components/Footer";

function App() {
return (
<div className="app">
  <BrowserRouter>
  <Navigate />
  <Routes>
    <Route path="/" element={<Main />} />
  </Routes>
  <Footer />
  </BrowserRouter>
</div>
);
}
export default App;