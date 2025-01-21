// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pickStops: [
      {
        "location name": "Pickup Point A",
        "ref #": "PU001",
        "equipment picked up/dropped": "3 Pallets",
        "location contact's phone": "555-123-4567",
        "location contact's name": "John Doe",
        "appointment time": "2024-07-20T10:00",
        "weight of equipment picked up/dropped": 300,
      },
      {
        "location name": "Pickup Point B",
        "ref #": "PU002",
        "equipment picked up/dropped": "2 Pallets",
        "location contact's phone": "555-987-6543",
        "location contact's name": "Jane Smith",
        "appointment time": "2024-07-20T14:00",
        "weight of equipment picked up/dropped": 200,
      },
      {
        "location name": "Toronto, Ontario",
        "ref #": "DO001",
        "equipment picked up/dropped": "5 Pallets",
        "location contact's phone": "555-111-2222",
        "location contact's name": "Peter Jones",
        "appointment time": "2024-07-21T16:00",
        "weight of equipment picked up/dropped": 500,
      },
    ],
  },
  mutations: {
    // You can add mutations here to modify the pickStops array
  },
  actions: {
    // You can add actions here to perform asynchronous operations
  },
  modules: {},
});
