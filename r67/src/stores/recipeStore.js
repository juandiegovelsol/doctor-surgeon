import { defineStore } from "pinia";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [],
    isLoadingRecipes: false,
    recipeError: null,
    singleRecipe: null,
    isLoadingSingleRecipe: false,
    singleRecipeError: null,

    // Pagination State
    currentPage: 1, // Current page number
    recipesPerPage: 10, // Number of recipes per page
    totalRecipes: 0, // Total number of recipes (from API response)
    totalPages: 0, // Calculated total pages
  }),

  getters: {
    // Example getter (optional, can access directly from state too)
    recipeCount: (state) => state.recipes.length,
    getRecipeById: (state) => (id) =>
      state.recipes.find((recipe) => recipe.id === id), // Optimized getter for finding recipe by ID
  },

  actions: {
    async fetchRecipes(page = 1, limit = this.recipesPerPage) {
      // Accept page and limit as parameters
      this.isLoadingRecipes = true;
      this.recipeError = null;
      this.currentPage = page; // Update current page in state

      try {
        // Simulate API call with pagination (replace with your actual API call)
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading

        // Mock API response - simulate pagination on mockRecipes data.
        const mockAllRecipes = [
          // Imagine this is a larger array coming from your backend
          { id: 1, title: "Delicious Pasta 1" },
          { id: 2, title: "Amazing Salad 1" },
          { id: 3, title: "Pasta 2" },
          { id: 4, title: "Salad 2" },
          { id: 5, title: "Pasta 3" },
          { id: 6, title: "Salad 3" },
          { id: 7, title: "Pasta 4" },
          { id: 8, title: "Salad 4" },
          { id: 9, title: "Pasta 5" },
          { id: 10, title: "Salad 5" },
          { id: 11, title: "Pasta 6" },
          { id: 12, title: "Salad 6" },
          { id: 13, title: "Pasta 7" },
          { id: 14, title: "Salad 7" },
          { id: 15, title: "Pasta 8" },
          { id: 16, title: "Salad 8" },
          { id: 17, title: "Pasta 9" },
          { id: 18, title: "Salad 9" },
          { id: 19, title: "Pasta 10" },
          { id: 20, title: "Salad 10" },
          { id: 21, title: "Pasta 11" },
          { id: 22, title: "Salad 11" },
          { id: 23, title: "Pasta 12" },
          { id: 24, title: "Salad 12" },
          { id: 25, title: "Pasta 13" },
          { id: 26, title: "Salad 13" },
          { id: 27, title: "Pasta 14" },
          { id: 28, title: "Salad 14" },
          { id: 29, title: "Pasta 15" },
          { id: 30, title: "Salad 15" },
        ]; // Replace with data from your API

        // Simulate server-side pagination response structure (adjust based on your API)
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedRecipes = mockAllRecipes.slice(startIndex, endIndex);
        const totalCount = mockAllRecipes.length; // Total recipes from API
        const totalPagesCalc = Math.ceil(totalCount / limit);

        this.recipes = paginatedRecipes; // Update state with paginated recipes
        this.totalRecipes = totalCount; // Update total recipes count
        this.totalPages = totalPagesCalc; // Calculate and update total pages
      } catch (error) {
        this.recipeError = error;
        console.error("Error fetching paginated recipes:", error);
      } finally {
        this.isLoadingRecipes = false;
      }
    },

    async fetchRecipeById(id) {
      this.isLoadingSingleRecipe = true;
      this.singleRecipeError = null;
      this.singleRecipe = null; // Reset singleRecipe before fetching

      try {
        // Simulate API call to fetch a single recipe (replace with your actual API call)
        await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate loading
        const mockRecipe = this.recipes.find((recipe) => recipe.id === id) || {
          id: id,
          title: `Recipe ${id} Details`,
          ingredients: ["Mock Ingredient"],
          instructions: "Mock Instructions",
        }; // Simulate fetching or fallback if not in the fetched list
        this.singleRecipe = mockRecipe;
      } catch (error) {
        this.singleRecipeError = error;
        console.error(`Error fetching recipe with ID ${id}:`, error);
      } finally {
        this.isLoadingSingleRecipe = false;
      }
    },

    async addRecipe(recipeData) {
      // Example: Add recipe - may need to refetch recipes to reflect changes in total count or current page
      await new Promise((resolve) => setTimeout(resolve, 200));
      const newRecipe = { ...recipeData, id: Date.now() };
      // --- In a real app, after successfully adding a recipe via API: ---
      // You might want to:
      // 1. Invalidate cache and refetch current page, or
      // 2. Optimistically update the `recipes` array if it makes sense in your UI,
      //    and increment `totalRecipes` if the newly added recipe should affect total count immediately.
      // For this example, let's just refetch the current page to keep it simple:
      this.fetchRecipes(this.currentPage, this.recipesPerPage);
    },

    async deleteRecipe(id) {
      // Example: Delete recipe - similarly, may need to refetch
      await new Promise((resolve) => setTimeout(resolve, 200));
      // --- In a real app, after successfully deleting a recipe via API: ---
      // You might want to:
      // 1. Invalidate cache and refetch current page (especially if deleting on the last page might lead to empty page), or
      // 2. Update `recipes` by filtering, and potentially decrement `totalRecipes` and recalculate `totalPages`.
      // For simplicity, refetch current page:
      this.fetchRecipes(this.currentPage, this.recipesPerPage);
    },

    async updateRecipe(id, updatedRecipeData) {
      // Simulate API call to update a recipe (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 200));
      const index = this.recipes.findIndex((recipe) => recipe.id === id);
      if (index !== -1) {
        this.recipes[index] = { ...this.recipes[index], ...updatedRecipeData }; // Update in state
        // In a real app, handle API success/failure and update state accordingly
      } else {
        console.warn(`Recipe with ID ${id} not found for update.`);
      }
    },
  },
});
