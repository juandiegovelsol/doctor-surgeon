import kaboom from "kaboom";
import loadAssets from "./assets"; // Import asset loading
import gameScene from "./scenes/game";
import menuScene from "./scenes/menu";

kaboom();

loadAssets(); // Load all assets

scene("menu", menuScene); // Define the menu scene
scene("game", gameScene); // Define the game scene

go("menu"); // Start with the menu scene
