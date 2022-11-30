// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import {AiOutlineDelete} from "react-icons/ai"
// import './App.css';

function App() {
  const getLocalStorageData = () => {
    let allList = localStorage.getItem("mylist");
    if (allList) {
      return JSON.parse(localStorage.getItem("mylist"));
    } else {
      return [];
    }
  };
  const [taskInput, setTaskInput] = useState("");
  const [listArr, setListArr] = useState(getLocalStorageData());
  const [Open,setOpen]=useState(false);

  const addtask = (e) => {
    setTaskInput(e.target.value);
    // console.log(taskInput)
  };

  const createlist = (e) => {
    if(taskInput){
      setListArr((previousList) => {
        return [
          ...previousList,
          { text: taskInput, completed: false, isEditing: false },
        ];
      });
}else{
  
    setTimeout(() => {
    setOpen(false);
    }, 3000);
    setOpen(true)
}
    // console.log(listArr);
    setTaskInput("");
    e.preventDefault();

  };

  //add to local storage

  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(listArr));
  }, [listArr]);

  const deleteTodoItem = (i) => {
    // console.log("delete");
    setListArr((previousList) => {
      return previousList.filter((arryitem, index) => {
        return index !== i;
      });
    });
  };

  const setCompleted = (i) => {
    let allTodos = listArr.map((element, index) => {
      if (index === i) {
        element.completed = !element.completed;
        return element;
      } else {
        return element;
      }
    });
    setListArr(allTodos);
  };

  const changeTaskValue = (e) => {
    let allTodos = listArr.map((element, index) => {
      if (element.isEditing) {
        element.text = e.target.value;
        return element;
      }
      return element;
    });
    setListArr(allTodos);
  };
  const editTask = (i) => {
    let allTodos = listArr.map((element, index) => {
      if (index === i) {
        element.isEditing = true;
        return element;
      } else {
        element.isEditing = false;
        return element;
      }
    });
    setListArr(allTodos);
  };

  const setDone = (i) => {
    console.log(i);
    let allTodos = listArr.filter((element, index) => {
      element.isEditing = false;
      if (element.text) return element;
      return false;
    });
    setListArr(allTodos);
  };

  return (
    <div className="min-h-screen flex justify-center ">
      <section className="  mx-5 sm:pt-20 border shadow-xl md:w-2/4 sm:3/4 lg:1/4 w-full  text-center bg-gray-300 overflow-hidden flex justfiy-center flex-col my-10 rounded-md">
        <form
          onSubmit={(e) => createlist(e)}
          className="flex flex-col justify-center"
        >
          <h2 className=" text-4xl font-bold">Todo List</h2>
          <input
            value={taskInput}
            type="text"
            placeholder={Open ? "Please add any task..." : "Add task here..."}
            className={`block rounded-md  foucs:ring-blue-500 text-2xl p-4 mt-5 mb-3 mx-5 ${
              Open &&
              "invalid:border-rose-600 border-2 placeholder:text-red-500 placeholder:italic "
            } `}
            onChange={(e) => {
              addtask(e);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-10"
            onClick={createlist}
            type="submit"
          >
            Add to List
          </button>
        </form>

        <div>
          <h3 className="text-2xl font-semibold text-left mt-5 px-6">
            Task List
          </h3>
          <ul className="text-left ml-10">
            {listArr.map((item, index) => {
              return (
                <div
                  key={index}
                  id={index}
                  className="flex justify-between w-full text-right mb-2 border-b-2 p-2 items-center"
                >
                  {!item.isEditing ? (
                    <>
                      <li
                        onDoubleClick={() => setCompleted(index)}
                        className={`text-xl ${
                          item.completed && "bg-green-500"
                        } text-left rounded-md p-3`}
                      >
                        {item.text}
                      </li>
                      <div className="flex ">
                        <span
                          className="text-xl mr-5   p-1 ml-3 "
                          onClick={(e) => deleteTodoItem(index)}
                        >
                          <AiOutlineDelete className="transition ease-in-out delay-100 fill-red-500 rounded-md cursor-pointer text-3xl hover:-translate-1 hover:scale-125 duration-300" />
                        </span>
                        <span
                          className="text-xl mr-5 cursor-pointer bg-blue-500 hover:bg-blue-700 p-1 rounded-md text-white"
                          onClick={(e) => editTask(index)}
                        >
                          Edit
                        </span>
                      </div>
                    </>
                  ) : (
                    <li className="w-full flex justify-between">
                      <input
                        className="rounded-md text-left text-xl mr-1 p-2 text-left w-full"
                        onChange={(e) => changeTaskValue(e)}
                        value={listArr[index].text}
                      />

                      <button
                        onClick={() => setDone(index)}
                        className="text-xl mr-5 cursor-pointer bg-blue-500 hover:bg-blue-700 p-1 rounded-md text-white "
                      >
                        done
                      </button>
                    </li>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
