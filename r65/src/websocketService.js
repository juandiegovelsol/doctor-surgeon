// websocketService.js
class WebSocketService {
  static instance = null;
  callbacks = {};
  ws = null;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.unregisterHandler = this.unregisterHandler.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
  }

  connect(url) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log("WebSocket Connected");
        this.onOpen();
        resolve();
      };

      this.ws.onclose = () => {
        console.log("WebSocket Disconnected");
        this.onClose();
      };

      this.ws.onmessage = (event) => {
        this.onMessage(event);
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
        this.onError(error);
        reject(error);
      };
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  sendMessage(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket not connected or not open.");
    }
  }

  registerHandler(event, callback) {
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  }

  unregisterHandler(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event] = this.callbacks[event].filter(
        (cb) => cb !== callback
      );
      if (this.callbacks[event].length === 0) {
        delete this.callbacks[event]; // Clean up if no more callbacks for this event
      }
    }
  }

  onOpen() {
    // Optional: Handle WebSocket open event (e.g., send initial data)
  }

  onClose() {
    // Optional: Handle WebSocket close event (e.g., attempt reconnection)
  }

  onMessage(event) {
    try {
      const message = JSON.parse(event.data);
      const { type, payload } = message;

      if (this.callbacks[type]) {
        this.callbacks[type].forEach((callback) => callback(payload));
      } else {
        console.warn(`No handler registered for message type: ${type}`);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error, event.data);
    }
  }

  onError(error) {
    // Optional: Handle WebSocket errors
  }
}

const websocketService = WebSocketService.getInstance();
export default websocketService;
