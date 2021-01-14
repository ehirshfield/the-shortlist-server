import { ObjectId } from 'mongodb';
import { Request } from 'express';
import { IResolvers } from 'apollo-server-express';
import { Cloudinary, Google } from '../../../lib/api';
import { Database, Review, ReviewType, User } from '../../../lib/types';
import {
    ReviewArgs,
    ReviewsArgs,
    ReviewsData,
    ReviewsFilter,
    ReviewsQuery,
    addReviewArgs,
    addReviewInput,
} from './types';
import { authorize } from '../../../lib/utils';

const verifyAddReviewInput = ({
    title,
    body,
    type,
    rating,
    subtitle,
}: addReviewInput) => {
    if (title.length > 100) {
        throw new Error('Review title must be under 100 characters');
    }

    if (subtitle.length > 200) {
        throw new Error('Review title must be under 100 characters');
    }

    if (body.length > 9000) {
        throw new Error('Review body must be under 9000 characters');
    }

    if (type !== ReviewType.Recipe && type !== ReviewType.Restaurant) {
        throw new Error('Review type must be either a recipe or restaurant!');
    }

    if (rating < 0 || rating > 10) {
        throw new Error('Review rating must be between 1 and 10');
    }
};

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
    Mutation: {
        addReview: async (
            _root: undefined,
            { input }: addReviewArgs,
            { db, req }: { db: Database; req: Request }
        ): Promise<Review> => {
            verifyAddReviewInput(input);

            const viewer = await authorize(db, req);
            if (!viewer) {
                throw new Error('Viewer cannot be found');
            }

            let imageURL;
            try {
                imageURL = await Cloudinary.upload(input.image);
            } catch (error) {
                throw new Error(`Cloudinary upload failed! ${error}`);
            }

            let insertResult;
            if (input.type === ReviewType.Restaurant) {
                const { country, admin, city } = await Google.geocode(
                    input.address!
                );
                if (!country || !admin || !city) {
                    throw new Error('Invalid address input');
                }

                insertResult = await db.reviews.insertOne({
                    _id: new ObjectId(),
                    ...input,
                    image: imageURL,
                    country,
                    admin,
                    city,
                    author: viewer._id,
                });
            } else {
                insertResult = await db.reviews.insertOne({
                    _id: new ObjectId(),
                    ...input,
                    image: imageURL,
                    author: viewer._id,
                });
            }

            const insertedReview: Review = insertResult.ops[0];

            await db.users.updateOne(
                { _id: viewer._id },
                { $push: { reviews: insertedReview._id } }
            );

            return insertedReview;
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
