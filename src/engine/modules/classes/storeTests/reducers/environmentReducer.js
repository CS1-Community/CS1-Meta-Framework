const initialState = {
  houses: {
    doorOpen: true
  },
  ground: {
    move: false
  },
  shop: {
    access: true
  },
  trees: {
    animated: true
  }
};

export function environment (state = initialState, action) {
  console.log(`Looking through items reducer for action.type : ${action.type}`);
  switch (action.type) {
    case "shopAccess":
      return {
        ...state,
        shop: action.payload
      };
      break;
    // case "armor":
    //   return {
    //     ...state,
    //     armor: action.payload
    //   };
    //   break;
    default:
      return state;
  }
}
