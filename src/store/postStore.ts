import { observable, action, computed, makeObservable } from 'mobx';
import {Post} from "../interfaces/PostInterfaces";

export class PostStore {
    @observable posts: Post[] = [];
    @observable loading: boolean = false;
    @observable page: number = 1;
    @observable limit: number = 10;
    @observable hasMore: boolean = true;

    constructor() {
        makeObservable(this);
    }

    @action
    async fetchPosts() {
        if (this.loading || !this.hasMore) return;

        this.setLoading(true);

        try {
            // Здесь вы можете заменить на реальный API-запрос
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`);
            const newPosts: Post[] = await response.json();

            if (newPosts.length === 0) {
                this.setHasMore(false);
            } else {
                this.addPosts(newPosts);
                this.setPage(this.page + 1);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            this.setLoading(false);
        }
    }

    @action
    setLoading(value: boolean) {
        this.loading = value;
    }

    @action
    setHasMore(value: boolean) {
        this.hasMore = value;
    }

    @action
    setPage(value: number) {
        this.page = value;
    }

    @action
    addPosts(newPosts: Post[]) {
        this.posts = [...this.posts, ...newPosts];
    }

    @computed
    get totalPosts(): number {
        return this.posts.length;
    }
}