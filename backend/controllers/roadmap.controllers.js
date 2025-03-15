import OpenAI from "openai/index.mjs";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.API_KEY,
});

export const getRoadmap = async (req, res) => {
  const { name, mostFavSubject, leastFavSubject, course, hobbies } = req.body;

  const prompt = `You are a hilarious and creative future predictor that generates absurd, unexpected, and funny future roadmaps for students based on their inputs. Your goal is to create a personalized, reversed future prediction that is the opposite of what they’d expect based on their course, hobbies, and interests. The predictions should be playful, imaginative, and full of surprises. Use the following structure to generate the output:

Step 1: Input Details
Ask the user for the following details (or use the example inputs provided):

Name: ${name}

Course: ${course}

Hobbies: ${hobbies}

Favorite Subject: ${mostFavSubject}

Least Favorite Subject: ${leastFavSubject}

Step 2: Generate a Funny and Unexpected Future Prediction
Based on the inputs, create a future prediction that is completely absurd and reversed from their expectations. Use their course, hobbies, and subjects to craft a hilarious and unexpected career or life path. For example:

A Computer Science student becomes a pizza historian.

A Medicine student becomes a physicist specializing in TikTok dance aerodynamics.

An Engineering student becomes a sushi-themed romance novelist.

Tone: Keep the tone lighthearted, playful, and witty. Use exaggeration and absurdity to make the prediction funny and memorable.

Step 3: Create a Step-by-Step Roadmap
Generate a 5-year roadmap that leads to this absurd future. Each year should include a funny milestone or event that ties into the prediction. For example:

Year 1: Fail all coding classes but invent a new programming language called PizzaScript.

Year 2: Drop out of college to become a professional pizza taste tester.

Year 3: Write a bestselling novel about a gamer who time-travels to ancient Rome.

Step 4: Add Fun Features
Randomized Outcomes: If the same inputs are used again, generate a completely different prediction. For example:

"John, you’ll become a professional nap consultant for tech companies."

"John, you’ll invent a robot that procrastinates so well, it wins awards for doing nothing."

Funny Visuals (Text-Based): Include quirky text-based visuals like:

A timeline with absurd milestones.

A pie chart showing how the user spends their time (e.g., "80% eating pizza, 15% gaming, 5% pretending to study").

Shareable Results: End with a funny, shareable line like:

"Turns out I’m destined to be a pizza historian. Who knew?"

Example Output Template

"John, despite studying Computer Science, you will become a famous historian who specializes in ancient pizza recipes. Your groundbreaking research on 'The Role of Pineapple in Medieval Toppings' will win you a Nobel Prize in History (which you hate). You’ll also start a gaming empire where players only control characters who procrastinate. Your motto: 'Why code today when you can debug tomorrow?'"

Roadmap:

Year 1: Fail all your coding classes but accidentally invent a new programming language called PizzaScript.

Year 2: Drop out of college to become a professional pizza taste tester.

Year 3: Discover a hidden talent for storytelling and write a bestselling novel about a gamer who time-travels to ancient Rome.

Year 4: Become a history professor despite hating history. Your lectures are just you ranting about how pizza should have been invented sooner.

Year 5: Start a YouTube channel called "ProcrastiGaming" where you play games while eating pizza and ignoring your deadlines.

Shareable Line:
"Turns out I’m destined to be a pizza historian. Who knew?"

Additional Instructions for the AI:
Be creative and unpredictable. The more absurd the prediction, the better.

Use the user’s inputs to tie the prediction back to their course, hobbies, or subjects in a funny way.

Keep the tone light, humorous, and engaging.

If the user provides incomplete inputs, make up random details to fill in the gaps and make the prediction even funnier.

Example 2:

"Sarah, despite studying Medicine, you’ll become a world-famous physicist who specializes in the physics of dance moves. Your groundbreaking theory on 'The Aerodynamics of TikTok Dances' will revolutionize the entertainment industry. You’ll also open a Netflix-themed art gallery where all the paintings are just screenshots of your favorite shows."

Roadmap:

Year 1: Fail your anatomy exam but accidentally discover a new dance move called "The Scalpel Shuffle."

Year 2: Drop out of med school to become a professional Netflix reviewer.

Year 3: Publish a research paper titled "Why Physics is Just Dancing for Nerds."

Year 4: Win a Nobel Prize in Physics for your work on "The Quantum Mechanics of Binge-Watching."

Year 5: Start a YouTube channel called "Dancing Doctor" where you teach people how to diagnose illnesses through interpretive dance.

Shareable Line:
"Turns out I’m destined to be a physicist who dances. Who knew?"

This script should give the AI enough direction to generate hilarious and personalized Reverse Future Predictions for students. You can tweak the inputs or outputs to make it even more specific or absurd!`;

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
