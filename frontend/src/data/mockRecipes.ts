export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  tip: string;
}

const mockRecipes: Recipe[] = [];

export default mockRecipes;
