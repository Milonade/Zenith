import { Post } from "./post";
import { User } from "./user";

export type Comment = {
    _id: string;
    description: string;
    creationDate: Date;
    modificationDate: Date;
    userId: User;
    postId: Post;
}