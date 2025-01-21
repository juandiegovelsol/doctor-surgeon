// Leaderboard.js
// Leaderboard.js
import React from "react";
import { FixedSizeList } from "react-window";
import useLeaderboardStore from "../store/leaderboardStore";

const Row = React.memo(({ index, style }) => {
  // Access the latest leaderboard state directly within Row
  const leaderboard = useLeaderboardStore.getState().leaderboard;
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
  const user = sortedLeaderboard[index];

  if (!user) return null;

  return (
    <div className="leaderboard-row" style={style}>
      {user.name}: {user.score}
    </div>
  );
});

const Leaderboard = () => {
  const leaderboard = useLeaderboardStore((state) => state.leaderboard);

  const itemSize = 30;

  return (
    <div>
      <h2>Leaderboard</h2>
      <FixedSizeList
        height={300}
        itemCount={leaderboard.length} // itemCount based on the full, unsorted list
        itemSize={itemSize}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default Leaderboard;
