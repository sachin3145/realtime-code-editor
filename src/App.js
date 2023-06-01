import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EditorPage from "./Pages/EditorPage";
import "./App.css"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
