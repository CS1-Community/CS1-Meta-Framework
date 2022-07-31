const initialState = {
  swords : {
    short : {
      level : 0,
      magic : false
    },
    broad : {
      level : 0,
      magic : false
    }
  },
  armor : {
    leather : {
      level : 0,
      magic : false
    },
    chainmail : {
      level : 0,
      magic : false
    }
  }
}

export function items (state = initialState, action){
  console.log(`Looking through items reducer for action.type : ${action.type}`);
  switch (action.type) {
    case "swords":
      return {
        ... state,
        swords : action.payload
      }
      break;
    case "armor":
      return {
        ... state,
        armor : action.payload
      }
      break;
    default:
      return state;
  }
}