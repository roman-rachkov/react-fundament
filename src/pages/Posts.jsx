import React, {useEffect, useState} from "react";
import "../styles/app.css"
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import classes from "../components/UI/modal/MyModal.module.css";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePost";
import PostService from "../api/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import Toast from "../components/UI/toast/Toast";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: 'id', query: ''});
    const [showForm, setShowForm] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const searchInSortedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    useEffect(() => {
        fetchPosts();
    }, [page]);

    return (
        <div className="App">
            <MyModal visible={showForm} setVisible={setShowForm}>
                <PostForm className={classes.modal__content} create={post => {
                    setPosts([...posts, post]);
                    setShowForm(false);
                }}/>

            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MyButton onClick={() => setShowForm(true)}>Add Post</MyButton>
            <hr style={{margin: "10px auto"}}/>
            {postError &&
                <Toast type={'error'} time={5000}>
                    {postError}
                </Toast>
            }
            {
                isPostLoading
                    ? <div style={{justifyContent: "center", display: "flex"}}><Loader/></div>
                    : <PostList posts={searchInSortedPosts}
                                deletePost={id => setPosts(posts.filter(post => post.id !== id))}/>
            }

            <Pagination totalPages={totalPages} currentPage={page} setPage={page => setPage(page)}/>


        </div>
    );
}

export default Posts;
