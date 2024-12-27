import Progress from "./Progress";

function App() {
  const currentProgress = 60; // Example progress value

  return (
    <div>
      <Progress progress={currentProgress} />
    </div>
  );
}

export default App;
