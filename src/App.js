import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import StoryList from "./Component/StoryList";
import StoryDetail from "./Component/StoryDetails";

const App = () => {
  return (
    <Router>
      <div className="bg-[#0a0b1f]">
        <Navbar />
        <Routes>
          <Route path="/" element={<StoryList />} />
          <Route path="/story/:id" element={<StoryDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
