const initState = {
  lists: [
    {
      name: 'My bought list',
      description: '',
      items: [
        {
          itemName: 'item 1',
          checked: true
        },
        {
          itemName: 'item 2',
          checked: false
        },
        {
          itemName: 'item 3',
          checked: false
        }
      ],
      createdAt: new Date('01/01/2018')
    }
  ]
}

const listsReducer = (state = initState, action) => {
  // This reducer filter alls lists actions.

  switch (action.type) {
    case 'CREATE_LIST':
      console.log('Lista creada: ', action.list)
      return state

    case 'CREATE_LIST_ERROR':
      console.error('Error creating list: ', action.err)
      return state

    default:
      return state
  }
}

export default listsReducer
