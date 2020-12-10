import { MongoClient } from 'mongodb';
import { Database, User, Review } from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = client.db('main');

	return {
		reviews: db.collection<Review>('reviews'),
		users: db.collection<User>('users')
	};
};
