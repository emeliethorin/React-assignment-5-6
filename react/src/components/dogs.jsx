import React, { useEffect, useState } from "react";

// Function to fetch from the Dog CEO API
const fetchApi = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const RandomDogImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const loadDogImage = async () => {
    const result = await fetchApi("https://dog.ceo/api/breeds/image/random");
    if (result && result.status === "success") {
      setImageUrl(result.message);
    }
  };

  useEffect(() => {
    loadDogImage();
  }, []);

  return (
    <div>
      <h1>Guess the dog</h1>
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="Random Dog" style={{ maxWidth: "400px", borderRadius: "8px" }} />
          <br />
          <button onClick={loadDogImage}>Fetch Another</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomDogImage;
