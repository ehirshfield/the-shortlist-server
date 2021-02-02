import { ObjectId, Collection } from 'mongodb';

export interface Viewer {
    _id?: string;
    token?: string;
    avatar?: string;
    didRequest: boolean;
    authorized?: boolean;
}

export enum ReviewType {
    Recipe = 'RECIPE',
    Restaurant = 'RESTAURANT',
}

export interface Review {
    _id: ObjectId;
    title: string;
    subtitle: string;
    image: string;
    body: string;
    rating: number;
    author: string;
    type: ReviewType;
    highlights: string[];
    lowlights: string[];
    city?: string;
    address?: string;
    url?: string;
    admin?: string;
    country?: string;
    video?: string;
}

export interface User {
    _id: string;
    token: string;
    name: string;
    avatar: string;
    contact: string;
    reviews: ObjectId[];
    authorized?: boolean;
}

export interface Database {
    reviews: Collection<Review>;
    users: Collection<User>;
}
