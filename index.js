const express = require("express");
const app = express();

const callModel = async (modelName, delay, successRate) => {
  await new Promise((r) => setTimeout(r, delay));
  if (Math.random() > successRate)
    throw new Error(`${modelName}
failed`);
  return {
    model: modelName,
    confidence: 0.5 + Math.random() * 0.5,
    result: Math.random() > 0.5 ? "Human" : "AI",
  };
};
const modelA = () => callModel("ModelA", 1000, 0.9);
const modelB = () => callModel("ModelB", 2000, 0.7);
const modelC = () => callModel("ModelC", 3000, 0.95);

const questions = [
  "Tell me about yourself",
  "Why this company?",
  "Greatest weakness?",
  "Describe a challenge you solved",
  "Where do you see yourself in 5 years?",
];

const detectAnswer = async (questions) => {
  const start = Date.now();

  try {
    const res = await modelA();
    return {
      questions,
      ...res,
      timeTaken: Date.now() - start,
    };
  } catch (error) {
    console.log(error.message);
    try {
      const res = await modelB();
      return {
        questions,
        ...res,
        timeTaken: Date.now() - start,
      };
    } catch (error) {
      console.log(error.message);
      try {
        const res = await modelC();
        return {
          questions,
          ...res,
          timeTaken: Date.now() - start,
        };
      } catch (error) {
        console.log(error.message);
        return {
          questions,
          error: "All models failed",
        };
      }
    }
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/results", async (req, res) => {
  const question = req.query.question;

  if (question) {
    const result = await detectAnswer(question);
    return res.json([result]);
  }

  const results = await Promise.all(questions.map(detectAnswer));
  res.json(results);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/*
If i had 30 more minutes, i would add these:
  - Write unit tests for fallback logic.
  - Log time details + errors.
  - Refactor code to avoid duplication (write 1 function with loop instead of 3 try-catches).
  - Add cache/middleware.
*/
