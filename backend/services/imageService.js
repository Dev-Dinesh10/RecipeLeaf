const axios = require('axios');
const fs = require('fs');
const path = require('path');

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL_ID =  'stabilityai/stable-diffusion-xl-base-1.0';

exports.generateImage = async (recipeName, cuisine, ingredients) => {
  try {
    const prompt = `
Ultra realistic professional food photography of "${recipeName}" (${cuisine} cuisine).
Main ingredients used: ${ingredients}.

Dish details:
- Main ingredients clearly visible and accurate to the dish
- Authentic preparation style of ${cuisine} cuisine
- Correct colors, textures, and consistency of the dish

Presentation:
- Fine dining plating, clean and minimal
- Served on ceramic plate or bowl matching cuisine style
- Garnished appropriately (herbs, sauces, spices relevant to the dish)

Camera & Lighting:
- Shot with DSLR, 85mm lens
- shallow depth of field (bokeh background)
- soft natural window lighting
- high dynamic range

Composition:
- 45-degree angle or top-down food photography
- focus sharply on the dish, blurred background
- restaurant table setting, subtle props (cutlery, napkin)

Quality:
- 8k resolution
- hyper-detailed textures
- no blur, no distortion, no extra objects
- no text, no watermark
`;

    console.log('--- Requesting AI Image from HuggingFace ---');

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            guidance_scale: 7.5,
            num_inference_steps: 30,
            seed: Math.floor(Math.random() * 1000000)
          },
          options: {
            use_cache: false,
            wait_for_model: true
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HuggingFace Error Response:', errorText);
      throw new Error(`HF API error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const fileName = `recipe_${Date.now()}.jpg`;
    const dir = path.join(__dirname, '../public/uploads/recipes');
    const filePath = path.join(dir, fileName);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, Buffer.from(buffer));

    return `/uploads/recipes/${fileName}`;

  } catch (error) {
    console.error(
      'HuggingFace Image Generation Error:',
      error.response?.data?.toString() || error.message
    );

    return `https://loremflickr.com/800/600/food,${cuisine},${recipeName.split(' ')[0]}`;
  }
};