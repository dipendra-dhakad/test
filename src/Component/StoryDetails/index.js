import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StoryDetail = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("explorer");
  const { id } = useParams();

  useEffect(() => {
    const fetchStoryDetail = async () => {
      try {
        const response = await fetch(
          `https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setStory(data);
      } catch (error) {
        console.error("Error fetching story details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetail();
  }, [id]);

  if (loading || !story) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0b1f]">
        <div className="text-2xl text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b1f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-purple-300">The Lost City of</span>{" "}
          {story?.Title || "Unknown"}
        </h1>

        {/* Activity Tabs */}
        <div className="flex space-x-4 mb-8">
          {["explorer", "adventure", "quest"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full flex items-center space-x-2 ${
                activeTab === tab
                  ? `bg-gradient-to-r from-${
                      tab === "explorer"
                        ? "blue-600 to-cyan-400"
                        : tab === "adventure"
                        ? "purple-600 to-pink-400"
                        : "green-500 to-emerald-400"
                    }`
                  : "bg-gray-800"
              } transition-all duration-300`}
            >
              <span>
                {tab === "explorer"
                  ? "🔍 Word Explorer"
                  : tab === "adventure"
                  ? "🚀 Story Adventure"
                  : "🧠 Brain Quest"}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-gray-900/50 rounded-xl p-6">
          <p className="text-gray-300 mb-6">
            Drag Pictures to the matching Words, light up correct pairs, shake
            for a retry
          </p>

          {/* Story Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <div className="overflow-hidden rounded-lg bg-gradient-to-b from-transparent to-purple-900/80">
                    <img
                      src={`https://ik.imagekit.io/dev24/${story?.Image[0]}`}
                      alt={`Story scene ${index + 1}`}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-sm text-gray-300">
                        {story?.Description || "No description available..."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
