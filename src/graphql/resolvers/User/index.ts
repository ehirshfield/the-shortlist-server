import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import { Database, User } from '../../../lib/types';
import { authorize } from '../../../lib/utils';
import { UserArgs, UserReviewArgs, UserReviewsData } from './types';

export const userResolvers: IResolvers = {
    Query: {
        user: async (
            _root: undefined,
            { id }: UserArgs,
            { db, req }: { db: Database; req: Request }
        ): Promise<User> => {
            try {
                const user = await db.users.findOne({ _id: id });

                if (!user) {
                    throw new Error('Failed to find user in db');
                }

                const viewer = await authorize(db, req);
                if (viewer && viewer._id === user._id) {
                    user.authorized = true;
                }

                return user;
            } catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        },
    },
    User: {
        id: (user: User): string => user._id,
        reviews: async (
            user: User,
            { limit, page }: UserReviewArgs,
            { db }: { db: Database }
        ): Promise<UserReviewsData | null> => {
            try {
                const data: UserReviewsData = {
                    total: 0,
                    result: [],
                };

                let cursor = await db.reviews.find({
                    _id: { $in: user.reviews },
                });

                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();

                return data;
            } catch (error) {
                throw new Error(`Failed to get user reviews: ${error}`);
            }
        },
    },
};
