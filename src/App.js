import logo from './logo.svg';
import React,{useState} from 'react';
// import './App.css';

function App() {
  const [taskInput,setTaskInput]=useState('')
  const [listArr,setListArr] = useState([])

  const addtask=(e)=>{
    setTaskInput(e.target.value);
    // console.log(taskInput)
  }

  const createlist =()=>{
    setListArr((previousList)=>{
      return [...previousList,{text:taskInput,completed:false,isEditing:false}];
    })
    setTaskInput('')
  }

  const deleteTodoItem = (i)=>{
    console.log("delete")
    setListArr((previousList)=>{
        return (
          previousList.filter((arryitem,index)=>{
            return index !== i
          })
        ) 
    })

  }

  const setCompleted = (i)=>{
    let allTodos = listArr.map((element,index)=>{
      if(index === i){
        element.completed = !element.completed
        return element
      }else{
        return element
      }
    })
    setListArr(allTodos)
  }

  const changeTaskValue = (e)=>{
      let allTodos = listArr.map((element, index) => {
        if (element.isEditing) {
          element.text = e.target.value;
          return element;
        } 
          return element;
      });
      console.log(allTodos)
      setListArr(allTodos);
  }
  const editTask = (i)=>{
      let allTodos = listArr.map((element, index) => {
        if (index === i) {
          element.isEditing = true;
          return element;
        } else {
          element.isEditing = false;
          return element
        }
      });
      setListArr(allTodos);
  }

  const setDone = (i)=>{
    console.log(i)
          let allTodos = listArr.filter((element, index) => {
              element.isEditing = false;
              if(element.text) return element;
              return false
          });
        setListArr(allTodos);
  }

  return (
    <div className="min-h-screen flex justify-center">
      <section className="pt-20 border shadow-xl w-1/4 text-center bg-gray-300 overflow-hidden flex justfiy-center flex-col my-10 rounded-md">
        <h2 className=" text-4xl font-bold">Todo List</h2>
        <input
          value={taskInput}
          type="text"
          placeholder="Add a task here"
          className="block rounded-md border-black foucs:ring-blue-500 text-2xl p-4 mt-5 mb-3 mx-5"
          onChange={(e)=>{addtask(e)}}
          />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-10" onClick={createlist}>
          Add to List
        </button>
        <div>
          <h3 className="text-2xl font-semibold text-left mt-5 px-6">
            Task List
          </h3>
          <ul className='text-left ml-10'>
            {listArr.map((item,index)=>{
              return (
                <div
                  key={index}
                  id={index}
                  className="flex justify-between w-full text-right mb-2 border-b-2 p-5"
                >
                  {!item.isEditing ? (
                    <li
                      onClick={() => setCompleted(index)}
                      className={`text-xl ${item.completed && "line-through"} text-left`}
                    >
                      {item.text}
                    </li>
                  ) : (
                    <li className='flex justify-between'>
                      <input
                        className="rounded-md text-left text-xl mr-1 p-2 text-left"
                        onChange={(e) => changeTaskValue(e)}
                        value={  listArr[index].text}
                      />
                      <button
                        onClick={() => setDone(index)}
                        className="text-xl mr-5 cursor-pointer bg-blue-500 hover:bg-blue-700 p-1 rounded-md "
                      >
                        done
                      </button>
                    </li>
                  )}
                  <div>

                  <span
                    className="text-xl mr-5 cursor-pointer bg-blue-500 hover:bg-blue-700 p-1 ml-3 rounded-md"
                    onClick={(e) => deleteTodoItem(index)}
                  >
                    X
                  </span>
                  <span
                    className="text-xl mr-5 cursor-pointer bg-blue-500 hover:bg-blue-700 p-1 rounded-md"
                    onClick={(e) => editTask(index)}
                  >
                    Edit
                  </span>
                  </div>
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
