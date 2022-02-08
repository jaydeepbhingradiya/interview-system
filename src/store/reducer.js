import produce from "immer";

let initialState = {
  results: [],
};

const candidateResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESULT": {
      const newState = produce(state, (draft) => {
        draft.results.push(action.payload);
      });
      return newState;
    }
    case "REMOVE_RESULT": {
      let newState = { ...state };
      newState.results.filter((item) => item.id !== action.payload);
      // const newState = produce(state, (draft) => {
      // let index = draft.results.findIndex(
      //   (item) => item.id === action.payload
      // );
      // draft.results.filter((item) => item.id !== action.payload);
      // draft.results.slice(index, 1);
      // });
      return newState;
    }

    default: {
      return state;
    }
  }
};
export default candidateResultReducer;
