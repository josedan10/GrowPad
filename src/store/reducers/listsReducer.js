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
  return state;
};

export default listsReducer;