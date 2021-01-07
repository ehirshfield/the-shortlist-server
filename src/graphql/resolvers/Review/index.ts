import { ObjectId } from 'mongodb';
import { IResolvers } from 'apollo-server-express';
import { Google } from '../../../lib/api';
import { Database, Review, User } from '../../../lib/types';
import {
    ReviewArgs,
    ReviewsArgs,
    ReviewsData,
    ReviewsFilter,
    ReviewsQuery,
} from './types';

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
        reviews: async (
            _root: undefined,
            { location, filter, limit, page }: ReviewsArgs,
            { db }: { db: Database }
        ): Promise<ReviewsData> => {
            try {
                const query: ReviewsQuery = {};
                const data: ReviewsData = {
                    region: null,
                    total: 0,
                    result: [],
                };

                if (location) {
                    const { country, admin, city } = await Google.geocode(
                        location
                    );

                    if (city) query.city = city;
                    if (admin) query.admin = admin;
                    if (country) {
                        query.country = country;
                    } else {
                        throw new Error('No country found');
                    }

                    const cityText = city ? `${city}, ` : '';
                    const adminText = admin ? `${admin}, ` : '';
                    data.region = `${cityText}${adminText}${country}`;
                }

                let cursor = await db.reviews.find(query);

                if (filter && filter === ReviewsFilter.RATING_LOW_TO_HIGH) {
                    cursor = cursor.sort({
                        rating: 1,
                    });
                }

                if (filter && filter === ReviewsFilter.RATING_HIGH_TO_LOW) {
                    cursor = cursor.sort({
                        rating: -1,
                    });
                }

                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();

                return data;
            } catch (error) {
                throw new Error(`Failed to query all reviews: ${error}`);
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
