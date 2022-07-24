import React, { useEffect, useState } from 'react';
import store from '~/store';
import { changeInputAction, getToDoSagaList, addItemAction, delItemAction, getToDoList } from '~/store/actions';
import TodoListUi from '~/components/todoListUi';
export default function Home() {
  const state = store.getState();
  const [num, setNum] = useState(1);
  useEffect(() => {
    const action = getToDoSagaList();
    store.dispatch(action);
  }, []);
  const storeChange = () => {
    setNum(num + 1);
  };
  const submit = () => {
    store.dispatch(addItemAction());
  };
  store.subscribe(storeChange);

  const handleInput = e => {
    store.dispatch(changeInputAction(e.target.value));
  };
  const delItem = index => {
    store.dispatch(delItemAction(index));
  };
  return <TodoListUi state={state} submit={submit} handleInput={handleInput} delItem={delItem}></TodoListUi>;
}
