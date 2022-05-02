import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [add, setAdd] = useState('');
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState('');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  }, []);
  const handelInputAdd = (e) => {
    setAdd(e.target.value);
  };
  const handleAddClick = () => {
    if (add !== '') {
      setData([{ id: Math.random() * 10, title: add }, ...data]);
      setAdd('');
    }
  };

  const handelDelete = (list) => {
    let remove = data.filter((a) => a.id !== list);
    setData(remove);
  };
  const handelEditClick = (list) => {
    console.log(list);
    setIsEdit(true);
    setEdit({ ...list });
  };

  const handelEditInput = (e) => {
    setEdit({ ...edit, title: e.target.value });
  };

  const handelUpdate = () => {
    handleUpdateLIst(edit.id, edit);
  };

  const handleUpdateLIst = (id, editList) => {
    const updateList = data.map((list) => {
      return list.id === id ? editList : list;
    });
    setIsEdit(false);
    setData(updateList);
  };

  return (
    <div>
      {isEdit ? (
        <div>
          <input value={edit.title} onChange={handelEditInput} />
          <button onClick={handelUpdate}>update</button>
          <button onClick={() => setIsEdit(false)}>cancal</button>
        </div>
      ) : (
        <div>
          <div>
            <input value={add} onChange={handelInputAdd} />
            <button onClick={handleAddClick}>Add</button>
          </div>
          {data
            ? data.map((list) => {
                return (
                  <div key={list.id}>
                    {list.title}
                    <button onClick={() => handelDelete(list.id)}>
                      delete
                    </button>
                    <button onClick={() => handelEditClick(list)}>edit</button>
                  </div>
                );
              })
            : null}
        </div>
      )}
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
