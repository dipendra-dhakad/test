import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0a0b1f] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">BrainyLingo</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/leaderboard" className="text-gray-300 hover:text-white">
              Leaderboard
            </Link>
            <Link to="/daily-quiz" className="text-gray-300 hover:text-white">
              Daily Quiz
            </Link>
            <Link to="/genre" className="text-gray-300 hover:text-white">
              Genre
            </Link>
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
