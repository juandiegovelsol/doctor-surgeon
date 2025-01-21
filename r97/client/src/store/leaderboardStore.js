// store/leaderboardStore.js
import create from "zustand";

const useLeaderboardStore = create((set, get) => ({
  leaderboard: [],
  userScores: {}, // Optional: If you need to track individual user's scores separately
  setLeaderboard: (newLeaderboard) => set({ leaderboard: newLeaderboard }),
  updateUserScore: (userId, newScore) =>
    set((state) => ({
      leaderboard: state.leaderboard.map((user) =>
        user.id === userId ? { ...user, score: newScore } : user
      ),
      userScores: { ...state.userScores, [userId]: newScore }, // Optional
    })),
  addUser: (userData) =>
    set((state) => ({
      leaderboard: [...state.leaderboard, userData],
      userScores: { ...state.userScores, [userData.id]: userData.score }, // Optional
    })),
  removeUser: (userId) =>
    set((state) => ({
      leaderboard: state.leaderboard.filter((user) => user.id !== userId),
      // Optional: You might want to keep userScores for reconnection
    })),
  // Potentially more actions like sorting the leaderboard
}));

export default useLeaderboardStore;
