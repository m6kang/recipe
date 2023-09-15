import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db,auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";

function RecipePost({ isAuth }) {
    const [title, setTitle] = useState('');
    const [postIngredient, setPostIngredient] = useState([]);
    const [postDirection, setPostDirection] = useState([]);
    const [imageUpload, setImageUpload] = useState('');

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();
    const createPost = async () => {
        const postId = Math.random();
        console.log(postIngredient);
        await addDoc(postsCollectionRef, {title, postIngredient, postDirection, postId, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}});
        navigate("/");
        if (imageUpload != null) {
            const imageRef = ref(storage, `images/${postId}`);
            uploadBytes(imageRef, imageUpload).then(() => {

            });
        }
    };

    const addIngredient = () => {
        setPostIngredient([...postIngredient, ""]);
    }

    const changeIngredient = (e, index) => {
        const list = [...postIngredient];
        list[index] = e.target.value;
        setPostIngredient(list);
    }

    const removeIngredient = (index) => {
        const list = [...postIngredient];
        list.splice(index, 1);
        setPostIngredient(list);
    }

    const addDirection = () => {
        setPostDirection([...postDirection, ""]);
    }

    const changeDirection = (e, index) => {
        const list = [...postDirection];
        list[index] = e.target.value;
        setPostDirection(list);
    }

    const removeDirection = (index) => {
        const list = [...postDirection];
        list.splice(index, 1);
        setPostDirection(list);
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }
    });

    return (
    <div className="recipePostPage"> 
        <div className="rpContainer">
            <h2>Create A Post</h2>
            <div className="inputTitle">
                <label> Title: </label>
                <input placeholder="Title..." onChange={(event) => {
                    setTitle(event.target.value);
                }}/>
            </div>
            <div className="inputIngredient">
                <label> Ingredients:</label>
                {postIngredient.map((data, i) => {
                    return (
                        <div>
                            <input value = {data.value} 
                                   onChange = {(e) => changeIngredient(e, i)}>
                            </input>
                            <button onClick = {() => removeIngredient(i)}>X</button>
                        </div>
                    )
                })}
                <button onClick= {() => {
                    addIngredient();
                }}>Add</button>
            </div>
            <div className="inputDirection">
                <label>Directions:</label>
                {postDirection.map((data, i) => {
                    return (
                        <div>
                            <input value = {data.value} 
                                   onChange = {(e) => changeDirection(e, i)}>
                            </input>
                            <button onClick = {() => removeDirection(i)}>X</button>
                        </div>
                    )
                })}
                <button onClick= {() => {
                    addDirection();
                }}>Add</button>
            </div>
            <div className="inputImage">
                <label>Image:</label>
                <input type="file" onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}/>
            </div>
            <button className="postSubmitBtn" onClick={createPost}>Submit Post</button>
        </div>
    </div>
    );
}

export default RecipePost;