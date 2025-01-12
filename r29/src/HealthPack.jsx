// Health Pack Factory Function
export function healthPack(cv, x, y, healAmount = 30) {
  cv.add([
    cv.pos(x, y),
    cv.rect(20, 20), // Render as a 20x20 rectangle
    cv.color(cv.rgb(0, 255, 0)), // Green color
    cv.area(), // Enable collision detection
    "healthPack", // Tag to identify health packs
    {
      healAmount: healAmount,
    },
  ]);
}
