import React, { useEffect, useState } from "react";

// Fetch dogs
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

const extractBreedFromUrl = (url) => {
    const parts = url.split("/");
    const breed = parts[parts.findIndex(p => p === "breeds") + 1];
    return breed ? breed.replace("-", " ") : "Unknown breed";
};

const capitalizeWords = (text) => {
    text.split(" ").map(w => w.chartAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const GuessTheDog = () => {
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
      <h1>Guess the dog 🐶</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {imageUrl && <
            img src={imageUrl} 
            alt="Random Dog" 
            style={{ maxWidth: "400px", borderRadius: "8px" }}  />}
          <h2 className="question">Is this dog a {capitalizeWords(displayedBreed)} ?</h2>
          <div>
            <button onClick={() => handleAnswer("yes")} classname="yes-btn">Yes</button>
            <button onClick={() => handleAnswer("no")} classname="no-btn">No</button>
          </div>
          {feedback && <h3>{feedback}</h3>}
       </> 
      )}
    </div>
  );
};

export default GuessTheDog;
