import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, TODOS_REF } from "./config.js";





export function useFireTodos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, TODOS_REF), orderBy('todoText'));

        onSnapshot(q, querySnaphot => {
            setTodos(querySnaphot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        });
    }, []);

    return todos;
}

export function addTodo(todoText, stars = 0, review, location) {
    addDoc(collection(db, TODOS_REF), { todoText, stars, review, location: location
        ? { latitude: location.latitude, longitude: location.longitude }
        : null, })
        .catch(error => console.log(error.message));
}


