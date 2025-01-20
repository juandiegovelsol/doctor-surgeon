import { lttb } from "./lttb"; // Import LTTB function

onmessage = function (event) {
  const { data, threshold } = event.data;
  if (!data || !Array.isArray(data)) {
    console.error("Worker received invalid data:", data);
    return;
  }
  if (typeof threshold !== "number" || threshold <= 0) {
    console.error("Worker received invalid threshold:", threshold);
    return;
  }

  try {
    const decimatedData = lttb(data, threshold);
    postMessage(decimatedData); // Send decimated data back to main thread
  } catch (error) {
    console.error("Error in LTTB Worker:", error);
    postMessage({ error: error.message }); // Send error message back
  }
};
