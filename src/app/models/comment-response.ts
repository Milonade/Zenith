import { Comment } from "./comment";

export type commentResponse = {
    data: Comment[],
    page: number,
    pageSize: number,
    total: number
}