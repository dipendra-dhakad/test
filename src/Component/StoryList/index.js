import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const storiesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, [currentPage, filter]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://mxpertztestapi.onrender.com/api/sciencefiction"
      );
      const data = await response.json();

  

      if (!Array.isArray(data)) {
        console.error("Invalid API response format", data);
        return;
      }

      // Filter stories based on status
      const filteredStories =
        filter === "all"
          ? data
          : data.filter((story) => story.Status?.toLowerCase() === filter);

      // Calculate total pages
      setTotalPages(Math.ceil(filteredStories.length / storiesPerPage));

      // Get current page stories
      const startIndex = (currentPage - 1) * storiesPerPage;
      const endIndex = startIndex + storiesPerPage;
      setStories(filteredStories.slice(startIndex, endIndex));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching stories:", error);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0b1f]">
        <div className="text-2xl text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b1f]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-8">
            Science Fiction Stories
          </h1>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {["new", "inprogress", "completed", "all"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                  filter === status
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500"
                    : "bg-gray-800"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const imageUrl = story.Image
              ? `https://ik.imagekit.io/dev24/${encodeURIComponent(
                  story.Image
                )}`
              : "https://via.placeholder.com/400x300?text=No+Image";

            console.log("Image URL:", imageUrl); // Debugging log

            return (
              <div
                key={story._id}
                className="relative group cursor-pointer"
                onClick={() => navigate(`/story/${story._id}`)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-transparent to-purple-900/80">
                  <img
                    src={imageUrl}
                    alt={story.Title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-lg font-semibold text-white mb-2">
                      {story?.Title || "Untitled Story"}
                    </h2>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        {story?.Status || "New"}
                      </span>
                      <div
                        className={`px-3 py-1 rounded-full text-sm ${
                          story?.Status?.toLowerCase() === "completed"
                            ? "bg-green-500"
                            : story?.Status?.toLowerCase() === "inprogress"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        } text-white`}
                      >
                        {story?.Status || "New"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === 1
                ? "text-gray-600 cursor-not-allowed"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full ${
              currentPage === totalPages
                ? "text-gray-600 cursor-not-allowed"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryList;
