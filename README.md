# AI Detection Results API

This project is a submission for the **Frontend Test – AI Detection Results API**.  
It implements a simple backend service in **Node.js (Express)** that simulates AI detection results for interview questions.

---

## ⚙️Installation & Setup

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installation Steps

1. **Clone the repository** (if applicable) or navigate to the project directory:

   ```bash
   cd ai-detection-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   node index.js
   ```

4. **Access the API:**
   - Server will run on: `http://localhost:3000`
   - Test endpoint: `http://localhost:3000/results`

### Quick Test

```bash
# Get results for all questions
curl http://localhost:3000/results

# Get result for a specific question
curl "http://localhost:3000/results?question=Tell me about yourself"
```

---

## 📌 Features

- **Simulated AI Models**

  - **Model A:** 1s delay, 90% success rate
  - **Model B:** 2s delay, 70% success rate
  - **Model C:** 3s delay, 95% success rate

- **Fallback Logic**

  - Try Model A → if fails, try Model B → if fails, try Model C → if all fail, return error.

- **Hardcoded Questions**

  1. Tell me about yourself
  2. Why this company?
  3. Greatest weakness?
  4. Describe a challenge you solved
  5. Where do you see yourself in 5 years?

- **API Endpoints**

  - `GET /results` → return detection results for all 5 questions
  - `GET /results?question=...` → return detection result for a single question

- **Response Shape**

```json
[
  {
    "question": "Tell me about yourself",
    "model": "ModelA",
    "confidence": 0.83,
    "result": "Human",
    "timeTaken": 1023
  },
  {
    "question": "Why this company?",
    "model": "ModelB",
    "confidence": 0.67,
    "result": "AI",
    "timeTaken": 2070
  }
]
```
