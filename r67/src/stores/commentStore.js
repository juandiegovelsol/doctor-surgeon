import { defineStore } from "pinia";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [], // Array to store comments
    isLoadingComments: false,
    commentError: null,
  }),

  getters: {
    getCommentsForRecipe: (state) => (recipeId) =>
      state.comments.filter((comment) => comment.recipeId === recipeId),
  },

  actions: {
    async fetchCommentsForRecipe(recipeId) {
      this.isLoadingComments = true;
      this.commentError = null;

      try {
        // Simulate fetching comments for a specific recipe (replace with your API call)
        await new Promise((resolve) => setTimeout(resolve, 400));
        const mockComments = [
          {
            id: 101,
            recipeId: recipeId,
            author: "UserA",
            text: "Great recipe!",
            timestamp: Date.now(),
          },
          {
            id: 102,
            recipeId: recipeId,
            author: "UserB",
            text: "I tried it, delicious!",
            timestamp: Date.now() - 10000,
          },
          // ... more comments if needed
        ].filter((comment) => comment.recipeId === recipeId); // Filter comments based on recipeId

        this.comments = [
          ...this.comments.filter((c) => c.recipeId !== recipeId),
          ...mockComments,
        ]; // Efficiently update comments, removing old comments for this recipe if they exist
      } catch (error) {
        this.commentError = error;
        console.error(
          `Error fetching comments for recipe ID ${recipeId}:`,
          error
        );
      } finally {
        this.isLoadingComments = false;
      }
    },

    async addComment(commentData) {
      // Simulate API call to add a comment (replace with your API call)
      await new Promise((resolve) => setTimeout(resolve, 200));
      const newComment = {
        ...commentData,
        id: Date.now(),
        timestamp: Date.now(),
      }; // Mock ID and timestamp
      this.comments.push(newComment); // Optimistically update state
      // In a real app, handle API success/failure and update state accordingly
    },

    async deleteComment(commentId) {
      // Simulate API call to delete a comment (replace with your API call)
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      ); // Update state by filtering
      // In a real app, handle API success/failure and update state accordingly
    },
  },
});
