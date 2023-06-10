import React from "react";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { storage } from "../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { HashLink } from 'react-router-hash-link';

function Home() {
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
        {postLists.map((post) => {
            var count = 0;
            return (
                <div className="homePostDiv">
                    <HashLink className="homeLink" smooth to={"/recipe#" + post.postId}>
                        <div className="homePost">
                            <div className="homeHeader">
                                <h1>{post.title}</h1>
                            </div>
                            <div className="homeImage">
                            {// eslint-disable-next-line
                            imageList.map((url) => {
                                if (url.includes(post.postId) && count === 0) {
                                    count++;
                                // eslint-disable-next-line
                                return <img src={url}></img>
                                }
                            })}
                            </div>
                        </div>
                    </HashLink>
                </div>
            );
        })}
    </div>
)};

export default Home;