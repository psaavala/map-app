import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, TODOS_REF } from "./config";





export function useFireTodos(){
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        const q = query(collection(db, TODOS_REF), orderBy('todoText'));

        onSnapshot(q, querySnaphot => {
            setTodos( querySnaphot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        } );
    }, []);

    return todos;
}

export function addTodo(todoText){
    addDoc( collection(db, TODOS_REF), {done: false, todoText } )
        .catch(error => console.log(error.message));
}


