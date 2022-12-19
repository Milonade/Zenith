import { Post } from "./post";
import { User } from "./user";

export type Comment = {
    description: string;
    creationDate: Date;
    modificationDate: Date;
    userId: User | string;
    postId: Post | string;
}