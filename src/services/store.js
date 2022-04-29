import { createStore } from 'redux';

const initState = {
    type:'ADD_USER',
    user:{},
    token:''
  }

  function reducer(state = initState, action)
  {
     return {...state, user: action.user};
  }  
  
  const store = createStore(reducer)
  
  store.subscribe(()=>{
    console.log(store.getState());
  })

export default store;