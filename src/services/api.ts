import axios from 'axios';

import Comment, { IComment } from '../models/comment';
import Post, { IPost } from '../models/post';

const instance = axios.create({ baseURL: 'http://localhost:5000' })

export default class Api {
  static post = {
    async fetchPosts() {
      const { data } = await instance.get('/posts');
      const posts: Post[] = data.map(Post.fromJson);
      return posts;
    },
    async createPost(post: Omit<IPost, 'id'>) {
      const { data } = await instance.post('/posts', post);
      return Post.fromJson(data);
    },
    async deletePost(id: number) {
      await instance.delete(`/posts/${id}`);
    },
  };

  static comment = {
    async createComment(comment: Omit<IComment, 'id'>): Promise<Comment> {
      const { data } = await instance.post('/comments', comment);
      return Comment.fromJson(data);
    },
    async fetchComments() {
      const { data } = await instance.get('/comments');
      const comments: Comment[] = data.map(Comment.fromJson);
      return comments;
    },
    async deleteComment(id: number) {
      await instance.delete(`/comments/${id}`);
    },
  };
}