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

    function Image(props) {
        if (props.num === 0) {
            return <img src="https://firebasestorage.googleapis.com/v0/b/recipe-17fe2.appspot.com/o/images%2Frecipe-book.png?alt=media&token=f6fcf451-ed67-40cd-b0c2-2f808c276ddc"></img>;
        }
    }

    return (
    <div className="homePostDiv">
        {postLists.map((post) => {
            var count = 0;
            return (
                <HashLink className="homeLink" smooth to={"/recipe#" + post.postId}>
                    <div className="homePost">
                        <div className="homeHeader">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="homeImage">
                            {imageList.map((url) => {
                                if (url.includes(post.postId) && count === 0) {
                                    count++;
                                    return <img src={url} id="post_img"></img>
                                }
                            })}
                            <Image num={count} />
                        </div>
                        <div className="homeAuthor">
                            <h3>By: {post.author.name}</h3>
                        </div>
                    </div>
                </HashLink>
            )
        })}
    </div>
)};

export default Home;