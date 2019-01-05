export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Store the data in firestore
    const firestore = getFirestore();
    list.createdAt = Date.now();

    firestore.collection('lists').add(list)
    .then(() => {

      dispatch({ type: 'CREATE_LIST', list });
    })
    .catch(() => {

      dispatch({ type: 'CREATE_LIST_ERROR', list });
    });
  }
};