<template>
    <div v-if="recipeStore.singleRecipe">
        <h1>{{ recipeStore.singleRecipe.title }}</h1>
        <p><strong>Ingredients:</strong> {{ recipeStore.singleRecipe.ingredients.join(', ') }}</p>
        <p><strong>Instructions:</strong> {{ recipeStore.singleRecipe.instructions }}</p>

        <h2>Comments</h2>
        <div v-if="commentStore.isLoadingComments">Loading comments...</div>
        <div v-if="commentStore.commentError" style="color: red;">Error loading comments.</div>

        <ul v-if="commentsForRecipe.length > 0">
            <li v-for="comment in commentsForRecipe" :key="comment.id">
                <strong>{{ comment.author }}:</strong> {{ comment.text }} ({{ new
                    Date(comment.timestamp).toLocaleString() }})
                <button @click="deleteComment(comment.id)">Delete Comment</button>
            </li>
        </ul>
        <div v-else-if="!commentStore.isLoadingComments && !commentStore.commentError">No comments yet.</div>

        <h3>Add Comment</h3>
        <textarea v-model.trim="newCommentText" placeholder="Your comment"></textarea>
        <button @click="addComment">Post Comment</button>
    </div>
    <div v-else-if="recipeStore.isLoadingSingleRecipe">Loading recipe details...</div>
    <div v-else-if="recipeStore.singleRecipeError" style="color: red;">Error loading recipe details.</div>
    <div v-else>Recipe not found.</div>
</template>

<script setup>
import { useRecipeStore } from './stores/recipeStore'; // Adjust path
import { useCommentStore } from './stores/commentStore'; // Adjust path
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const recipeStore = useRecipeStore();
const commentStore = useCommentStore();
const route = useRoute();

const recipeId = Number(1); // Get recipe ID from route params
const newCommentText = ref('');

onMounted(() => {
    recipeStore.fetchRecipeById(recipeId); // Fetch single recipe
    commentStore.fetchCommentsForRecipe(recipeId); // Fetch comments for this recipe
});

const commentsForRecipe = computed(() => {
    return commentStore.getCommentsForRecipe(recipeId);
});

const addComment = async () => {
    if (newCommentText.value.trim()) {
        const commentData = {
            recipeId: recipeId,
            author: 'CurrentUser', // Replace with actual current user info
            text: newCommentText.value,
        };
        await commentStore.addComment(commentData);
        newCommentText.value = ''; // Clear input after posting
        commentStore.fetchCommentsForRecipe(recipeId); // Refresh comments after adding (or handle more reactively)
    }
};

const deleteComment = (commentId) => {
    commentStore.deleteComment(commentId);
    commentStore.fetchCommentsForRecipe(recipeId); // Refresh comments after deletion
};
</script>