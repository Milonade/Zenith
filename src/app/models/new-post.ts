import { User } from "./user";

export type NewPost = {
  picture: {
    url: string;
  };
  location: {
    type: 'Point';
      coordinates: number[];
  };
  description: string;
  creationDate: Date;
  visitDate: Date;
  modificationDate: Date;
  visible: boolean;
  userId: User | string;
};