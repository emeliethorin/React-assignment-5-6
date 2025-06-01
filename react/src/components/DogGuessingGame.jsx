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

const capitalizeWords = (text) => 
    text.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const DogGuessingGame = () => {
    const [imageUrl, setImageUrl] = useState ("");
    const [dogBreed, setDogBreed] = useState ("");
    const [displayedBreed, setDisplayBreed] = useState ("");
    const [feedback, setFeedback] = useState ("");
    const [loading, setLoading] = useState ("");
    const [score, setScore] = useState ({ correct: 0, total: 0});
    const [answered,setAnswered] = useState(false);

    const getDog = async () => {
        setLoading(true);
        setFeedback("");
        setAnswered(false);

        const result = await fetchApi("https://dog.ceo/api/breeds/image/random");
        
        if (result?.status === "success") {
            const breed = extractBreedFromUrl(result.message);
            setImageUrl(result.message);
            setDogBreed(breed);

        const useCorrect = Math.random() < 0.5;
        if (useCorrect) {
          setDisplayBreed(breed);
        } else {
          const allBreeds = await fetchApi("https://dog.ceo/api/breeds/list/all");
          if (allBreeds?.status === "success") {
            const breedList = Object.keys(allBreeds.message);
            let randomBreed = "";
            do {
              randomBreed = breedList[Math.floor(Math.random() * breedList.length)];
            } while (randomBreed === breed);
            setDisplayBreed(randomBreed);
          } else {
            setDisplayBreed(breed);
          }
        }
      }

        setLoading(false);
    };

    const handleAnswer = (answerYes) => {
        const isCorrect = 
        (displayedBreed === dogBreed && answerYes) ||
        (displayedBreed !== dogBreed && !answerYes);

        setFeedback(isCorrect ? "Correct answer! 😄" : "Sorry, that was incorrect 🫤");
        setScore ((prev) => ({
          correct: prev.correct + (isCorrect ? 1 : 0),
          total: prev.total + 1
        }));

        setAnswered(true);
    }

    useEffect (() => {
        getDog();
    }, []);

  return (
    <div>
      <h1>Guess the dog 🐶</h1>
      {loading ? (
        <p>Loading dog...</p>
      ) : (
        <>
          {imageUrl && <
            img src={imageUrl} 
            alt="Random Dog" 
            style={{ maxWidth: "400px", borderRadius: "5px" }}  />}
          <h2 className="question">Is this dog a {capitalizeWords(displayedBreed)} ?</h2>
          <div>
            <button onClick={() => handleAnswer(true)} className="yes-btn">Yes</button>
            <button onClick={() => handleAnswer(false)} className="no-btn">No</button>
          </div>
          {feedback && <h3>{feedback}</h3>}
          {answered && <button onClick={getDog}>Next</button>}
          <p>Score: {score.correct} / Attempts: {score.total} </p>
       </> 
      )}
    </div>
  );
};

export default DogGuessingGame;
