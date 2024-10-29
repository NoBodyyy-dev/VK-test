import { useEffect } from 'react';
import { observer } from 'mobx-react';
import {useStore} from '../../store/store.ts';
import {Post} from "../../interfaces/PostInterfaces";

const PostsList = observer(() => {
    const {postStore} = useStore();

    useEffect(() => {
        postStore.fetchPosts();

        const handleScroll = () => {
            const { scrollTop, scrollHeight } = document.documentElement;
            const clientHeight = window.innerHeight;

            if (scrollHeight - scrollTop === clientHeight) {
                postStore.fetchPosts();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [postStore]);


    return (
        <div>
            {postStore.posts.map((post: Post, index: number) => (
                <div key={post.id}>
                    <h1>{index}</h1>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
            {postStore.loading && <p>Loading...</p>}
            {!postStore.hasMore && <p>No more posts to load.</p>}
        </div>
    );
});

export default PostsList;