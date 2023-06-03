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
            return (
                <div>
                    <HashLink smooth to={"/recipe#" + post.postId}>
                        Link to Hash Fragment
                    </HashLink>;
                </div>
            );
        })}
    </div>
)};

export default Home;