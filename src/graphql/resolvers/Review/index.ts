import { ObjectId } from 'mongodb';
import { IResolvers } from 'apollo-server-express';
import { Database, Review, User } from '../../../lib/types';
import { ReviewArgs } from './types';

export const reviewResolvers: IResolvers = {
    Query: {
        review: async (
            _root: undefined,
            { id }: ReviewArgs,
            { db }: { db: Database }
        ): Promise<Review> => {
            try {
                const review = await db.reviews.findOne({
                    _id: new ObjectId(id),
                });
                if (!review) {
                    throw new Error('review cannot be found!');
                }
                return review;
            } catch (error) {
                throw new Error(`Failed to query reviews: ${error}`);
            }
        },
    },
    Review: {
        id: (review: Review): string => review._id.toString(),
        author: async (
            review: Review,
            _args: {},
            { db }: { db: Database }
        ): Promise<User> => {
            const author = await db.users.findOne({ _id: review.author });
            if (!author) {
                throw new Error("author can't be found");
            }
            return author;
        },
    },
};
