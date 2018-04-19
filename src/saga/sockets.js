//take - filter actions, (but action have been called with reducers)
//select - get data from store
//fork - run task in background, kill another sagas on exeption
//spawn - like fork, but don't kill another sagas on exeption

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(
    types.ADD_MESSAGE, 
    (action) => {
      action.author = params.username
      params.socket.emit('my other event', action, ({err, data}) => {
      })
  })
}

/* export function addPerson(person) { // our action in actions
  return {
    type: "ADD_PERSON_REQUEST",
    payload: person
  }
} */

/* const addPersonSaga = function * (action) {
  const id = ""//some id
  yield put ({
    type: "ADD_PERSON",
    payload: {...action.payload, id}
  })
} */




/* export function signUp(email, password) { // our action in actions
  return {
    type: "SIGNUP_REQUEST",
    payload: {email, password}
  }
} */
/* export console signUpSaga = function * (){
  const action  = yield take("SIGNUP_REQUEST") //* - all actions
  
  while(true){ // listen all time for requests
    const auth = firebase.auth()

    try{
      //call auth.createUser at auth with args, (apply can use too)
      const user = yield call([auth, auth.createUser], action.payload.email, action.payload.password)

      yield put({
        type: "SIGNUP_SUCCESS",
        payload: {user}
      })
    } catch (error){
      yield put({
        type: "SIGNUP_ERROR",
        error
      })
    }
  }
  
  
} */

/* export console fetchLazySaga = function * (){
  
  while(true){ // listen all time for requests
    yield take("FETCH_LAZY_REQUEST")//

    const state = yield select(stateSelector)// stateSelector = state => state[moduleName]

    if(state.loading) continue

    //get date from server and make event
  }
  
  
} */

export const cancellableSynk = function * (){
  const task = yield fork(backgroundSynkSaga) // сага, которая вызывает другую сагу через делей
  yield delay(6000)
  yield cancel(task)// при отмене в backgroundSynkSaga нужно поставить try\finally что бы реагировать на отмену саги с помощью эффекта cancelled
  // if(yield cancelled()) - значит сага была отменена, а не просто вызвался эксепшн
}

export const saga = function * (){
  yield takeEvery("ADD_PERSON_REQUEST", addPersonSaga) // for takeEvery no need use while in generator
}

/* export const saga = function * (){
  yield spawn(signUpSaga)// тоже, что и форк, но не обвалит другие саги при эксепшине
  yield fork(signUpSaga)// не блокирующее выполнение, запустит сагу и пойдет дальше, но при эксепшине валил все остальные и поднимается вверх к рутовой
  yield all([signUpSaga])//будет выполнять саги по очереди и ждать их выполнение(блокирующее выполнение)
} */

/* function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    // yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT')
      yield cancel(task)
    yield call(Api.clearItem, 'token')
  }
} */

// yield apply(socket, socket.emit, ['test', { username: "payload.username" }]) 