import { put } from 'redux-saga/effects';
import * as chatActionsCreators from '../actions/actionCreatos';
import * as API from '../api';

export function * getMessagesSaga(action){
  try {
    const {data:{data}} = yield API.getMessages();
    yield put(chatActionsCreators.getMessageSuccess(data))
  } catch (error) {
    yield put(chatActionsCreators.getMessageError(error))
  }
}

export function * createMessageSaga(action){
  try {
    yield API.createMessage(action.payload.message);
    //yield put(chatActionsCreators.getMessageSuccess(data))
  } catch (error) {
    yield put(chatActionsCreators.createMessageError(error))
  }
}
