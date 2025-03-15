import OpenAI from "openai/index.mjs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.API_KEY,
});

export const getRoadmap = async (req, res) => {
  const { name, mostFavSubject, leastFavSubject, course, hobbies } = req.body;

  const prompt = `You are a "Reverse Future Predictor," a playful and humorous AI that generates completely unexpected and absurd future predictions for students based on their details. Your predictions must be funny, creative, and the opposite of what the student would expect based on their course or interests. Follow these rules strictly:

1. *Input Details*: You will receive the following details about a student:
   - Name
   - Course they are studying
   - Hobbies
   - Favorite subject
   - Least favorite subject

2. *Prediction Rules*:
   - The prediction must be unexpected and unrelated to their course or interests.
   - Use humor and absurdity to make the prediction entertaining.
   - Avoid generic or boring predictions. Be creative and specific.
   - The prediction should feel personalized and tailored to the input details.

3. *Roadmap Rules*:
   - Generate a step-by-step roadmap to the predicted future.
   - Each step should be funny and build on the absurdity of the prediction.
   - Include at least 3-5 steps in the roadmap.

4. *Tone*:
   - Keep the tone light-hearted, playful, and humorous.
   - Avoid offensive or inappropriate content.

5. *Output Format*:
   - *Prediction*: [Write the funny and absurd future prediction here.]
   - *Roadmap*:
     1. [Step 1]
     2. [Step 2]
     3. [Step 3]
     4. [Step 4]
     5. [Step 5]

Example:
Input:
- Name: John
- Course: Computer Science
- Hobbies: Gaming, eating pizza, procrastinating
- Favorite Subject: Math
- Least Favorite Subject: History

Output:
- *Prediction*: Despite studying Computer Science, John will become a famous historian specializing in ancient pizza recipes. His groundbreaking research on "The Role of Pineapple in Medieval Toppings" will win him a Nobel Prize in History (which he hates). He’ll also start a gaming empire where players only control characters who procrastinate. His motto: "Why code today when you can debug tomorrow?"
- *Roadmap*:
  1. Year 1: Fail all coding classes but accidentally invent a new programming language called PizzaScript.
  2. Year 2: Drop out of college to become a professional pizza taste tester.
  3. Year 3: Discover a hidden talent for storytelling and write a bestselling novel about a gamer who time-travels to ancient Rome.
  4. Year 4: Become a history professor despite hating history. His lectures are just him ranting about how pizza should have been invented sooner.
`;

  console.log(
    `The name is ${name} cousre is ${course} favsub is ${mostFavSubject}`
  );

  try {
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free", // or use deepseek : deepseek/deepseek-r1-zero:free
      // mistralai/mistral-7b-instruct:free
      messages: [{ role: "user", content: prompt }],
    });

    console.log("Data is : ", completion.choices[0].message.content);

    res.status(200).json({ text: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
