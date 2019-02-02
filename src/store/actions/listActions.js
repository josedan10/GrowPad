export const createList = (list) => {
  // Create a new list in firestore

  return (dispatch, getState, { getFirestore }) => {
    // Store the data in firestore
    const firestore = getFirestore()
    list.createdAt = Date.now()

    firestore.push('lists', list)
      .then(() => {
        dispatch({ type: 'CREATE_LIST', list })
      })
      .catch(() => {
        dispatch({ type: 'CREATE_LIST_ERROR', list })
      })
  }
}
