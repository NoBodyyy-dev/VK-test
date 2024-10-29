// stores/rootStore.ts
import { createContext, useContext } from 'react';
import {PostStore} from './postStore';

class RootStore {
    postStore: PostStore;

    constructor() {
        this.postStore = new PostStore();
    }
}

const rootStore = new RootStore();
const StoreContext = createContext<RootStore>(rootStore);

export const useStore = () => useContext(StoreContext);
export { StoreContext, rootStore };