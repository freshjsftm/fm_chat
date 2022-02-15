import { takeEvery } from 'redux-saga/effects';
import ACTIONS from '../actions';
import * as chatSagas from './chatSagas';


export default function * rootSaga(){
  yield takeEvery(ACTIONS.CREATE_MESSAGE_REQUEST, chatSagas.createMessageSaga);
  yield takeEvery(ACTIONS.GET_MESSAGE_REQUEST, chatSagas.getMessagesSaga);
}