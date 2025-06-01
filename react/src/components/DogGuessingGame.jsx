import React, { useEffect, useState } from "react";
import "../DogGuessingGame.css";

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
// Get breeds from API
const extractBreedFromUrl = (url) => {
    const parts = url.split("/");
    const breed = parts[parts.findIndex(p => p === "breeds") + 1];
    return breed ? breed.replace("-", " ") : "Unknown breed";
};

const capitalizeWords = (text) => 
    text.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

//Handle articles before breeds
const getArticle = (word) => {
  if (!word) return "a";
  const firstLetter = word.trim().charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(firstLetter) ? "an" : "a";
};

// Game logic
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

    // Start new round
    const handleRestart = () => {
      setScore({ correct: 0, total: 0});
      setFeedback("");
      setAnswered(false);
      getDog();
    }

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
            className="dog-img" />}
          <h2 className="question">Is this dog {getArticle(displayedBreed)} {capitalizeWords(displayedBreed)}?</h2>
          <div>
            <button onClick={() => 
              handleAnswer(true)} disabled={answered}
              className="btn yes-btn">Yes</button>
            <button onClick={() => 
              handleAnswer(false)} disabled={answered}
              className="btn no-btn">No</button>
          </div>
          {feedback && <h3 className={`feedback ${feedback.includes("Correct") ? "correct" : "incorrect"}`}>{feedback}</h3>}
          {answered && <button onClick={getDog} className="btn next-btn">Next</button>}
          <p className="game-data">Score: {score.correct} / Attempts: {score.total} </p>
          <button onClick={handleRestart} className="btn restart-btn">Start over</button>
          <p className="note">Note that the game includes more than 100 different breeds.. Good luck!</p>
       </> 
      )}
    </div>
  );
};

export default DogGuessingGame;
