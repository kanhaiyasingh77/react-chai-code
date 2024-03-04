## NOTE :- Return fn can be written  as following  in js
 
```javascript 

 return(
     <div>Todos</div>
     {todos.map((todo) => (
     <>
         <li key={todo.id}>
             {todo.text}
             <button
             onClick={() => dispatch(removeTodo(todo.id))}
             >X</button>

         </li>
     ))}
     </>
 ) 
 ```