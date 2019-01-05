const initState = {
  lists: [
    {
      name: "My bought list",
      description: "",
      items: [
        {
          itemName: "item 1",
          checked: true
        },
        {
          itemName: "item 2",
          checked: false
        },
        {
          itemName: "item 3",
          checked: false
        }
      ],
      createdAt: new Date("01/01/2018")
    }
  ]
};

const listsReducer = (state = initState, action) => {
  switch (action.type) {
      case "CREATE_LIST":
        console.log("Lista creada: ", action.list);
        break;
      
      case "CREATE_LIST_ERROR":
        console.error("Error creating list: ", action.err);
        break;
      
      default:
        break;
  }

  return state;
};

export default listsReducer;