export function addResult(result) {
  return {
    type: "ADD_RESULT",
    payload: result,
  };
}

export function removeResult(id) {
  return {
    type: "REMOVE_RESULT",
    payload: id,
  };
}

export function updateResult(result) {
  return {
    type: "UPDATE_RESULT",
    payload: result,
  };
}
