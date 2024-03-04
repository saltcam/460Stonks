import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import Read from "./components/Read";
import Add from "./components/Add";
import Update from "./components/Update";
import Sort from "./components/Sort";
import Search from "./components/Search";

function App() {
return (
<div className="app">
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Movies />} />
    <Route path="/movies/sorted" element={<Sort />} />
    <Route path="/movies/search" element={<Search />} />
    <Route path="/read/:movieName" element={<Read />} />
    <Route path="/add" element={<Add />} />
    <Route path="/update/:movieName" element={<Update />} />
  </Routes>
  </BrowserRouter>
</div>
);
}
export default App;