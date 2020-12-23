import { ObjectId, Collection } from 'mongodb';

export interface Viewer {
	_id?: string;
	token?: string;
	avatar?: string;
	didRequest: boolean;
}

export enum ReviewType {
	Recipe = 'RECIPE',
	Restaurant = 'RESTAURANT'
}

export interface Review {
	_id: ObjectId;
	title: string;
	image: string;
	body: string;
	rating: number;
	author: string;
	type: ReviewType;
	city?: string;
	address?: string;
	url?: string;
}

export interface User {
	_id: string;
	token: string;
	name: string;
	avatar: string;
	contact: string;
	reviews: ObjectId[];
}

export interface Database {
	reviews: Collection<Review>;
	users: Collection<User>;
}
