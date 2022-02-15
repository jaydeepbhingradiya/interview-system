// import produce from "immer";

let initialState = [];

const candidateResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESULT": {
      let { payload } = action;
      payload.id = Math.random().toString();
      return [...state, payload];
    }

    case "REMOVE_RESULT": {
      return state.filter((state) => state.id !== action.payload);
    }

    case "UPDATE_RESULT": {
      const index = state.findIndex((item) => item.id === action.payload.id);
      const newData = [...state];
      newData[index] = action.payload;
      return newData;
    }

    default: {
      return state;
    }
  }
};
export default candidateResultReducer;
