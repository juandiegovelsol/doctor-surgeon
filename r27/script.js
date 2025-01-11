document.addEventListener("DOMContentLoaded", () => {
  const shootMarinesButton = document.getElementById("shoot-marines");
  const orkSquad = document.getElementById("orks-squad");
  const marineSquad = document.getElementById("space-marines-squad");
  const logList = document.getElementById("log-list");

  const numMarines = marineSquad.children.length - 1; // Subtract h2
  const numOrks = orkSquad.children.length - 1; // Subtract h2

  shootMarinesButton.addEventListener("click", spaceMarinesShoot);

  function spaceMarinesShoot() {
    logList.innerHTML = ""; // Clear log for new turn

    const marines = Array.from(marineSquad.querySelectorAll(".marine"));
    const orks = Array.from(orkSquad.querySelectorAll(".ork"));

    if (orks.length === 0) {
      logMessage("Orks are already defeated!");
      return;
    }

    logMessage("<h2>Space Marine Shooting Phase</h2>");

    marines.forEach((marine, marineIndex) => {
      if (!marine.classList.contains("defeated")) {
        // Only shooting if not defeated (you can add defeat visual later)
        logMessage(`<b>Space Marine ${marineIndex + 1} Shoots:</b>`);

        // To Hit Roll (3+)
        const toHitRoll = rollD6();
        logMessage(`  To Hit Roll: ${toHitRoll}`);

        if (toHitRoll >= 3) {
          logMessage("  Hit!");

          // To Wound Roll (4+) - vs Ork Toughness
          const toWoundRoll = rollD6();
          logMessage(`  To Wound Roll: ${toWoundRoll}`);

          if (toWoundRoll >= 4) {
            logMessage("  Wound!");

            // Ork Save Roll (5+)
            orks.forEach((ork, orkIndex) => {
              if (!ork.classList.contains("defeated")) {
                // Targetting still alive orks for now (can be improved targetting later)
                const orkSaveRoll = rollD6();
                logMessage(`  Ork ${orkIndex + 1} Save Roll: ${orkSaveRoll}`);

                if (orkSaveRoll < 5) {
                  logMessage(`  Save Failed! Ork ${orkIndex + 1} Wounded!`);
                  ork.classList.add("defeated"); // Mark as defeated for visual (can remove element later if needed)
                  ork.style.display = "none"; // Visually remove Ork
                } else {
                  logMessage(`  Save Success! Ork ${orkIndex + 1} Saved.`);
                }
              }
            });
          } else {
            logMessage("  Failed to Wound.");
          }
        } else {
          logMessage("  Missed!");
        }
      }
    });

    // Check if Orks are all defeated
    const remainingOrks = orkSquad.querySelectorAll(".ork:not(.defeated)");
    if (remainingOrks.length === 0) {
      logMessage("<h2>Orks Defeated! Space Marines Victory!</h2>");
      shootMarinesButton.disabled = true; // Disable button after victory
    } else {
      // CPU Ork Turn (Automated immediately after Marine turn for now)
      setTimeout(orkShoot, 1000); // Small delay for visual clarity
    }
  }

  function orkShoot() {
    logMessage("<h2>Ork Shooting Phase</h2>");

    const orks = Array.from(orkSquad.querySelectorAll(".ork:not(.defeated)")); // Only shooting with not defeated orks
    const marines = Array.from(
      marineSquad.querySelectorAll(".marine:not(.defeated)")
    );

    if (marines.length === 0) {
      logMessage("Space Marines are already defeated!");
      return;
    }

    orks.forEach((ork, orkIndex) => {
      if (!ork.classList.contains("defeated")) {
        logMessage(`<b>Ork ${orkIndex + 1} Shoots:</b>`);

        // To Hit Roll (5+)
        const toHitRoll = rollD6();
        logMessage(`  To Hit Roll: ${toHitRoll}`);

        if (toHitRoll >= 5) {
          logMessage("  Hit!");

          // To Wound Roll (4+) - vs Marine Toughness
          const toWoundRoll = rollD6();
          logMessage(`  To Wound Roll: ${toWoundRoll}`);

          if (toWoundRoll >= 4) {
            logMessage("  Wound!");

            // Marine Save Roll (3+)
            marines.forEach((marine, marineIndex) => {
              if (!marine.classList.contains("defeated")) {
                const marineSaveRoll = rollD6();
                logMessage(
                  `  Space Marine ${
                    marineIndex + 1
                  } Save Roll: ${marineSaveRoll}`
                );

                if (marineSaveRoll < 3) {
                  logMessage(
                    `  Save Failed! Space Marine ${marineIndex + 1} Wounded!`
                  );
                  marine.classList.add("defeated");
                  marine.style.display = "none"; // Visually remove Marine
                } else {
                  logMessage(
                    `  Save Success! Space Marine ${marineIndex + 1} Saved.`
                  );
                }
              }
            });
          } else {
            logMessage("  Failed to Wound.");
          }
        } else {
          logMessage("  Missed!");
        }
      }
    });

    // Check if Marines are all defeated
    const remainingMarines = marineSquad.querySelectorAll(
      ".marine:not(.defeated)"
    );
    if (remainingMarines.length === 0) {
      logMessage("<h2>Space Marines Defeated! Orks Victory!</h2>");
      shootMarinesButton.disabled = true; // Disable button after victory
    }
  }

  function rollD6() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function logMessage(message) {
    const li = document.createElement("li");
    li.innerHTML = message;
    logList.appendChild(li);
    logList.scrollTop = logList.scrollHeight; // Auto-scroll to bottom of log
  }
});
