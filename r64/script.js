const storyData = {
  start: "scene1",
  scenes: {
    scene1: {
      text: "You are walking through the bustling streets of the city when you come across a fork in the road.",
      choices: [
        { text: "Turn left towards the park.", nextScene: "scene2" },
        { text: "Turn right towards the market.", nextScene: "scene3" },
      ],
    },
    scene2: {
      text: "You decide to head to the park. The greenery provides a peaceful escape from the city's noise.",
      choices: [
        { text: "Sit on a bench and relax.", nextScene: "ending1" },
        { text: "Go for a jog through the trails.", nextScene: "ending2" },
      ],
    },
    scene3: {
      text: "You turn towards the lively market filled with vendors and shoppers.",
      choices: [
        { text: "Browse the stalls for souvenirs.", nextScene: "ending3" },
        {
          text: "Stop at a street food cart for a snack.",
          nextScene: "ending4",
        },
      ],
    },
    ending1: {
      text: "You enjoy a restful afternoon on the bench, watching the world go by. **The End.**",
      choices: [],
    },
    ending2: {
      text: "The jog rejuvenates you, and you feel refreshed and energized. **The End.**",
      choices: [],
    },
    ending3: {
      text: "You find charming souvenirs to remember your day in the city. **The End.**",
      choices: [],
    },
    ending4: {
      text: "The delicious snack delights your taste buds, making your day even better. **The End.**",
      choices: [],
    },
  },
};

let currentSceneId = storyData.start;
const storyTextElement = document.getElementById("story-text");
const choicesContainerElement = document.getElementById("choices-container");

function showScene(sceneId) {
  const scene = storyData.scenes[sceneId];
  storyTextElement.textContent = scene.text;
  choicesContainerElement.innerHTML = "";

  if (scene.choices && scene.choices.length > 0) {
    scene.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.addEventListener("click", () => {
        currentSceneId = choice.nextScene;
        showScene(currentSceneId);
      });
      choicesContainerElement.appendChild(button);
    });
  } else {
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Story";
    restartButton.addEventListener("click", () => {
      currentSceneId = storyData.start;
      showScene(currentSceneId);
    });
    choicesContainerElement.appendChild(restartButton);
  }
}

showScene(currentSceneId);
