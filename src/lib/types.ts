import { ObjectId, Collection } from 'mongodb';

export interface Listing {
	_id: ObjectId;
	title: string;
	image: string;
	address: string;
	price: number;
	numOfGuests: number;
	numOfBeds: number;
	numOfBaths: number;
	rating: number;
}

export interface Review {
	_id: ObjectId;
	title: string;
	image: string;
	body: string;
	rating: number;
}

export interface Database {
	listings: Collection<Listing>;
	reviews: Collection<Review>;
}
