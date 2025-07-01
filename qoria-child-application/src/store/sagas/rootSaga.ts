import { all, fork } from 'redux-saga/effects';
import chartSaga from './chartSaga';

export default function* rootSaga() {
  yield all([
    fork(chartSaga)
  ]);
}