# 🌿 RecipeLeaf

**AI-Powered Personal Culinary Companion**

RecipeLeaf is a state-of-the-art mobile application that transforms your kitchen experience using Artificial Intelligence. Generate unique recipes based on the ingredients you have, visualize them with professional-grade AI imagery, and get daily culinary inspiration—all in one sleek interface.

---

## ✨ Key Features

- 🪄 **AI Recipe Generation**: Leverages the **Grok AI (Llama 3.3)** to create gourmet recipes from any list of ingredients and cuisines.
- 🖼️ **Dynamic AI Imagery**: Every recipe is brought to life with high-fidelity, professional food photography generated via **Stability AI (SDXL)**.
- 📊 **Intelligent Dashboard**: Start your day with an AI-generated "Quote of the Day," trending dish spotlights, and personalized meal suggestions for Breakfast, Lunch, and Dinner.
- 🔐 **Secure User Accounts**: Full authentication system with profile management and secure favorite recipe storage.
- 🌍 **Cuisine Explorer**: Discover world flavors with an interactive cuisine navigation system.

---

## 🛠️ Tech Stack

### Frontend
- **React Native (Expo)**: Cross-platform mobile development.
- **TypeScript**: Ensuring type safety and code quality.
- **React Navigation**: Seamless transitions with Tab and Stack navigators.

### Backend
- **Node.js & Express**: High-performance server architecture.
- **MongoDB**: Flexible NoSQL database for recipe and user storage.
- **Groq API**: High-speed AI text generation using Llama 3.3.
- **HuggingFace Inference API**: Stable Diffusion XL for realistic food imagery.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or Atlas)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dev-Dinesh10/RecipeLeaf.git
   cd RecipeLeaf
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your credentials (see .env.example)
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npx expo start
   ```

---

## 🔑 Environment Variables

To run this project, you will need to add the following variables to your `backend/.env` file:

- `PORT`: Your server port (e.g., 5000)
- `MONGO_URI`: Your MongoDB connection string
- `GROQ_API_KEY`: Your API key from Groq Console
- `HF_API_KEY`: Your HuggingFace User Access Token
- `JWT_SECRET`: A secure string for authentication

---

## 📸 Screenshots

*(Add your app screenshots here to show off the beautiful UI!)*

---

## 👨‍💻 Author
**Dinesh Maharana**
- GitHub: [@Dev-Dinesh10](https://github.com/Dev-Dinesh10)
- Project: [RecipeLeaf](https://github.com/Dev-Dinesh10/RecipeLeaf)
