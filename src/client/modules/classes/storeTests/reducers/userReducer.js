const initialState = {
  name : "CS1",
  level : 1
}

export function user (state = initialState, action){
  console.log(`Looking through user reducer for action.type : ${action.type}`);
  switch (action.type) {
    case "username":
      return {
        ... state,
        name : action.payload?.name
      }
      break;
    case "userlevel":
      return {
        ... state,
        level : action.payload?.value
      }
      break;
    default:
      return state;
  }
}