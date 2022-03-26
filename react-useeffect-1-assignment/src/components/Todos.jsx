import { useEffect, useState } from "react"
import axios from "axios";
// import { nanoid } from 'nanoid'

export const Todos = () => {

const [todos,setTodos] = useState("");
const [todoItem,setTodoItem] = useState([]);
const [page,setPage] = useState(1);


useEffect(()=>{
getData();
},[page])


const getData = ()=> {
axios.get(`http://localhost:3001/todoList?_limit=3&_page=${page}`).then((res)=> {
    setTodoItem(res.data);
})
}

    return (
        <div>
            <input type="text" placeholder="add something..." onChange={(e)=> setTodos(e.target.value)} />

            <button onClick={ () => {
                fetch("http://localhost:3001/todoList",{
                    method:"POST",
                    body:JSON.stringify({title:todos,status:false}),
                    headers:{
                        "content-type":"application/json",
                    }
                }).then(()=>{
                    getData();
                })
            }}>Save</button>
          
          
          {todoItem.map((e)=> (
              <h2 key={e.id}>{e.title}</h2>
          ))}

         

         <button onClick={()=> {
             if(page>=2) {
                setPage(page - 1)
             }
           
         }}>Previous</button>


        <button onClick={()=>{
            if(page>=1 && page<4) {
                setPage(page + 1)
            }
           
        }}>Next</button>
        


        </div>
    );


};











