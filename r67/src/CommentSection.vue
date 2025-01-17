<template>
    <section>
        <h2>Comments</h2>
        <div v-if="commentStore.isLoadingComments">Loading comments...</div>
        <div v-if="commentStore.commentError" style="color: red;">Error loading comments.</div>

        <ul v-if="comments.length > 0">
            <li v-for="comment in comments" :key="comment.id">
                <strong>{{ comment.author }}:</strong> {{ comment.text }} ({{ new
                    Date(comment.timestamp).toLocaleString() }})
                <button @click="$emit('delete-comment', comment.id)">Delete Comment</button>
            </li>
        </ul>
        <div v-else-if="!commentStore.isLoadingComments && !commentStore.commentError">No comments yet.</div>

        <h3>Add Comment</h3>
        <textarea v-model.trim="newCommentText" placeholder="Your comment"></textarea>
        <button @click="$emit('add-comment', newCommentText)">Post Comment</button>
    </section>
</template>

<script setup>
import { useCommentStore } from './stores/commentStore';
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
    recipeId: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['add-comment', 'delete-comment']);

const commentStore = useCommentStore();
const newCommentText = ref('');

onMounted(() => {
    commentStore.fetchCommentsForRecipe(props.recipeId);
});

const comments = computed(() => commentStore.getCommentsForRecipe(props.recipeId));

const handleAddComment = () => {
    if (newCommentText.value.trim()) {
        emit('add-comment', newCommentText.value);
        newCommentText.value = '';
    }
};

const handleDeleteComment = (commentId) => {
    emit('delete-comment', commentId);
};
</script>