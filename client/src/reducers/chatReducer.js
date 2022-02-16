import produce from 'immer';
import ACTIONS from '../actions';

const initialState = {
  isFetching:false,
  error: null,
  messages: []
}

export default function chatReducer(state = initialState, action){
  switch(action.type){
    case ACTIONS.GET_MESSAGE_REQUEST:
    case ACTIONS.CREATE_MESSAGE_REQUEST:
    {
      return produce(state, draftState=>{
        draftState.isFetching = true;
      })
    }
  
    case ACTIONS.GET_MESSAGE_SUCCESS:{
      const {payload:{messages}} = action;
      return produce(state,  draftState => {
        draftState.messages.push(...messages)
        draftState.isFetching = false
    })
    }
    case ACTIONS.CREATE_MESSAGE_SUCCESS:{
      const {payload:{message}} = action;
      return produce(state, draftState=>{
        draftState.isFetching = false;
        draftState.messages.push(message);
      })
    }

    case ACTIONS.GET_MESSAGE_ERROR:
    case ACTIONS.CREATE_MESSAGE_ERROR: 
    {
      const {payload:{error}} = action;
      return produce(state, draftState=>{
        draftState.isFetching = false;
        draftState.error = error;
      })
    }
    
    default: return state;
  }
}