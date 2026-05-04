const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // Using Groq for Llama models
});

const generateRecipe = async (ingredients, cuisine) => {
  const prompt = `You are a world-class chef. Generate a ${cuisine} recipe using these ingredients: ${ingredients.join(', ')}.
Respond ONLY with valid JSON:
{
  "name": "Recipe Name",
  "description": "Short description",
  "prepTime": "XX mins",
  "cookTime": "XX mins",
  "servings": "X",
  "difficulty": "Easy/Medium/Hard",
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "steps": ["Step 1", "Step 2"],
  "tip": "Cooking tip"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Using Llama model on Groq
      messages: [
        { role: "system", content: "You are a professional chef that returns only valid JSON." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    const jsonString = responseText.slice(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Grok API Error:', error);
    throw new Error('Failed to generate recipe from Grok AI');
  }
};

const generateDashboardData = async () => {
  const prompt = `You are a food enthusiast and culinary expert. 
  Provide a daily inspiration package for a home cook.
  Respond ONLY with valid JSON:
  {
    "quote": {
      "text": "A inspiring quote about food or cooking",
      "author": "Famous person"
    },
    "trending": {
      "name": "A currently popular dish name",
      "cuisine": "Cuisine type",
      "description": "Why it is trending right now"
    },
    "suggestions": {
      "breakfast": "A healthy breakfast dish",
      "lunch": "A balanced lunch dish",
      "dinner": "A delicious dinner dish"
    }
  }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a culinary inspiration assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    const responseText = completion.choices[0].message.content;
    const jsonStart = responseText.indexOf('{');
    const jsonEnd = responseText.lastIndexOf('}') + 1;
    return JSON.parse(responseText.slice(jsonStart, jsonEnd));
  } catch (error) {
    console.error('Grok Dashboard Data Error:', error);
    // Return fallback data
    return {
      quote: { text: "Cooking is like love. It should be entered into with abandon or not at all.", author: "Harriet van Horne" },
      trending: { name: "Shakshuka", cuisine: "Middle Eastern", description: "The ultimate one-pan brunch favorite." },
      suggestions: { breakfast: "Avocado Toast", lunch: "Quinoa Salad", dinner: "Grilled Salmon" }
    };
  }
};

module.exports = {
  generateRecipe,
  generateDashboardData,
};
