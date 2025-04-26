import axios from "axios";

export async function getSentiment(postDescription) {
  const prompt = `
Analyze the sentiment of the following blog post. Respond with just one word: Positive, Negative, or Neutral.

Blog post:
${postDescription}
`;

  try {
    const response = await axios.post(
      "https://open-ai21.p.rapidapi.com/conversationllama",
      { message: [{ role: "user", content: prompt }], web_access: false },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.RAPIDAPI_API_KEY,
        },
      }
    );

    return { success: true, sentiment: response.data.result };
  } catch (error) {
    console.log("Error in evaluating setiment: ", error.message);
    return { success: false, message: error.message };
  }
}
