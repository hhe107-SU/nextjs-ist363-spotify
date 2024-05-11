"use client";

import { useEffect, useState } from "react";
import Showcase from "../components/custom/Showcase";

const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [highlightedArtist, setHighlightedArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Detailed information about each artist
  const artistDetails = {
    "Taylor Swift": "Known for narrative songs about her life.",
    "Beyoncé": "Has won 28 Grammy Awards.",
    "Ariana Grande": "Started her career at age of 13.",
    "Thelonious Monk": "Pioneers of the American jazz genre.",
    "Dizzy Gillespie": "Important to Development of bebop and modern jazz.",
    "Charlie Parker": "Highly influential soloist in jazz.",
    "Sonny Rollins": "Known for his powerful improvisations.",
    "Dexter Gordon": "First tenor players who adopted the bebop style.",
    "Kenny Burrell": "Guitarist known for  jazz blues genre.",
    "Wes Montgomery": "Influential jazz guitarist."
  };

  useEffect(() => {
    try {
      fetch("/api/artists")
        .then((res) => res.json())
        .then((data) => {
          setArtists(data.artists);
          if (data.artists.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.artists.length);
            const artist = data.artists[randomIndex];
            artist.detail = artistDetails[artist.name] || "No additional info available.";
            setHighlightedArtist(artist);
          }
          setIsLoading(false);
        });
    } catch (error) {
      setError(error);
    }
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading artists: {error.message}</p>;

  return (
    <main>
      {highlightedArtist && (
        <div className="highlighted-artist">
          <h1>Featured Artist: {highlightedArtist.name}</h1>
          <p>{highlightedArtist.detail}</p> {/* Displays the detail correctly fetched from artistDetails */}
        </div>
      )}
      <Showcase items={artists} />
    </main>
  );
};

export default HomePage;
