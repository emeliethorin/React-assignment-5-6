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

const DogGuessingGame = () => {
    const [imageUrl, setImageUrl] = useState ("");
    const [dogBreed, setDogBreed] = useState ("");
    const [displayedBreed, setDisplayBreed] = useState ("");
    const [feedback, setFeedback] = useState ("");
    const [loading, setLoading] = useState ("");

    const getDog = async () => {
        setLoading(true);
        setFeedback("");

        const result = await fetchApi("https://dog.ceo/api/breeds/image/random");
        
        if (result?.status === "success") {
            const breed = extractBreedFromUrl(result.message);
            setImageUrl(result.message);
            setDogBreed(breed);
            setDisplayBreed(breed);
        }

        setLoading(false);
    };

    const handleAnswer = (answer) => {
        const isCorrect = 
        (answer === "yes" && displayedBreed === dogBreed) ||
        (answer === "no" && displayedBreed !== dogBreed);
        setFeedback(isCorrect ? "Correct answer! 😄" : "Sorry, that was incorrect 🫤");
        setTimeout (() => getDog(), 1500);
    }

    useEffect (() => {
        getDog();
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

export default DogGuessingGame;
