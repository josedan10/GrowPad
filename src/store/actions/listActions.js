export const createList = (list) => {
  return (dispatch, getState) => {
    // make async call to db
    dispatch({ type: 'CREATE_LIST', list })
  }
};