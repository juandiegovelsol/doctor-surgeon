<template>
    <div>
        <h1>Recipe List</h1>

        <div v-if="recipeStore.isLoadingRecipes">Loading recipes...</div>
        <div v-if="recipeStore.recipeError" style="color: red;">Error: {{ recipeStore.recipeError.message }}</div>

        <ul v-if="recipeStore.recipes.length > 0">
            <li v-for="recipe in recipeStore.recipes" :key="recipe.id">
                <router-link :to="`/recipe/${recipe.id}`">{{ recipe.title }}</router-link>
                <button @click="deleteRecipe(recipe.id)">Delete</button>
            </li>
        </ul>
        <div v-else-if="!recipeStore.isLoadingRecipes && !recipeStore.recipeError">No recipes available.</div>

        <button @click="addMockRecipe">Add Mock Recipe</button>
    </div>
</template>

<script setup>
import { useRecipeStore } from './stores/recipeStore'; // Adjust path if needed
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'; // If you are using Vue Router for navigation
import { storeToRefs } from 'pinia';

const recipeStore = useRecipeStore();
const router = useRouter();

// Make state reactive using storeToRefs (for direct access in template)
const { recipes, isLoadingRecipes, recipeError } = storeToRefs(recipeStore); // Optional, for individual refs

onMounted(() => {
    recipeStore.fetchRecipes(); // Fetch recipes when component mounts
});

const deleteRecipe = (recipeId) => {
    recipeStore.deleteRecipe(recipeId);
};

const addMockRecipe = () => {
    recipeStore.addRecipe({ title: 'New Recipe', ingredients: ['ing1', 'ing2'], instructions: 'Do it!' });
};
</script>