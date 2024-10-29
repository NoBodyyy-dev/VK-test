import PostContainer from "./components/Post/PostContainer.tsx";
import {rootStore, StoreContext} from "./store/store.ts";

function Layout() {

    return (
        <>
            <StoreContext.Provider value={rootStore}>
                <PostContainer/>
            </StoreContext.Provider>
        </>
    )
}

export default Layout
