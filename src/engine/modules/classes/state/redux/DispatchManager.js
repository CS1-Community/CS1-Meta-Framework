/*
The DispatchManager was originally created to run conditional
logic related to the path-mutation action type.  This intermediary
may not be required any longer as the superpath subscription handlers
are now taken care of by using deep cloning , deep equality checks  ,
and getting descendant property values at path.
*/
export const DispatchManager = {
  setStore: function(store){
    DispatchManager.store = store;
  },
  dispatch: function(action , lastState){
    if(action.type === "path-mutation"){
      DispatchManager.store.store.dispatch(action);
    }else{
      
    }
  }
};