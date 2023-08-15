import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

function Recipe({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, "images/");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getPosts();
    });

    useEffect(() => {
        listAll(imageListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url]);
            });
          });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <div>
        <div>
            {isAuth ? <Link to="/recipepost" className="site-name">M&M Recipe Book</Link> : <></>}
        </div>
        {postLists.map((post) => {
            var count = 0;
            return (
                <div className="post">
                    <section id={post.postId}>
                    <div className="postHeader">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="postImage">
                        {// eslint-disable-next-line
                        imageList.map((url) => {
                            if (url.includes(post.postId) && count === 0) {
                                count++;
                                // eslint-disable-next-line
                                return <img src={url}></img>;
                            }
                        })}
                    </div>
                    <br/>
                    <div className="postIngredient">
                        <h2>Ingredients:</h2>
                        <ul>
                            {post.postIngredient.map((ingredient) => {
                                return <li>{ingredient}</li>
                            })}
                        </ul>
                    </div>
                    <br/>
                    <div className="postDirection">
                        <h2>Directions:</h2>
                        <ul>
                        {post.postDirection.map((direction) => {
                            return <li>{direction}</li>
                        })}
                        </ul>
                    </div>
                    <br/>
                    <div className="postAuthor">
                        <h3>By:</h3>
                        <h3>{post.author.name}</h3>
                    </div>
                    </section>
                </div>
                
            );
        })}
    </div>
)};

export default Recipe;