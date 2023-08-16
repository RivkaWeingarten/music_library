import { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import React from "react";
import { createResource as fetchData } from "./helper";

function App() {
  let [search, setSearch] = useState("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState(null);

  // const API_URL = "https://itunes.apple.com/search?term=";

  useEffect(() => {
    if (search) {
      setData(fetchData(search));
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  };

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      );
    }
  };

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;
