import { retrieveCommentsByPostId } from '../services/comment';
import { JsonObj } from './utils';

export interface IPost {
  id: number;
  title: string;
  author: string;
}

export default class Post implements IPost {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly author: string,
  ) {}

  static fromJson(json: JsonObj) {
    return new Post(json.id, json.title, json.author);
  }

  toJson(): IPost {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
    }
  }

  get comments() {
    return retrieveCommentsByPostId(this.id);
  }
}
