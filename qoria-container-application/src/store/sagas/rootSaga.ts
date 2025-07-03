import { all, fork } from 'redux-saga/effects'
import { watchFetchProducts } from './dataSaga'

/**
 * Root saga that combines all sagas
 * Uses fork to run sagas concurrently
 */
export function* rootSaga() {
  yield all([
    fork(watchFetchProducts),
  ])
}