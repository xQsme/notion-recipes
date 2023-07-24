export interface Recipe {
  title: string;
  ingredients: string[];
  method: string[];
  time: {
    prep: string;
    cook: string;
  };
  serves: string;
  image: string;
}

export const getBaseRecipe: () => Recipe = () => ({
  title: '',
  ingredients: [],
  method: [],
  time: {
    prep: '',
    cook: '',
  },
  serves: '',
  image: '',
});
