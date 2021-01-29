import { Request } from 'express';
import {
    ReviewsFilter,
    TypesFilter,
} from '../../graphql/resolvers/Review/types';
import { Database, User } from '../types';

const authorizedUsers = [
    process.env.USER_TOM,
    process.env.USER_SPENSER,
    process.env.USER_ERIC,
];

export const authorize = async (
    db: Database,
    req: Request
): Promise<User | null> => {
    let viewer = null;

    const userArray = authorizedUsers.filter(
        (id) => id === req.signedCookies.viewer
    );

    if (userArray.length === 1 && userArray[0] === req.signedCookies.viewer) {
        viewer = await db.users.findOne({
            _id: req.signedCookies.viewer,
        });
    }

    return viewer;
};

export const authorizeToken = async (
    db: Database,
    req: Request
): Promise<User | null> => {
    let viewer = null;
    const token = req.get('X-CSRF-TOKEN');

    const userArray = authorizedUsers.filter(
        (id) => id === req.signedCookies.viewer
    );

    if (userArray.length === 1 && userArray[0] === req.signedCookies.viewer) {
        viewer = await db.users.findOne({
            _id: req.signedCookies.viewer,
            token,
        });
    }

    return viewer;
};

export const filterSort = (cursor: any, filter: ReviewsFilter) => {
    let filterQuery;
    switch (filter) {
        case ReviewsFilter.RATING_LOW_TO_HIGH:
            filterQuery = { rating: 1 };
            break;
        case ReviewsFilter.RATING_HIGH_TO_LOW:
            filterQuery = { rating: -1 };
            break;
        case ReviewsFilter.NEWEST:
            filterQuery = { $natural: -1 };
            break;
        default:
            break;
    }

    const query = {
        ...filterQuery,
    };

    return cursor.sort(query);
};

export const typeQuery = (typeFilter: TypesFilter) => {
    switch (typeFilter) {
        case TypesFilter.RECIPE:
            return { type: TypesFilter.RECIPE };
        case TypesFilter.RESTAURANT:
            return { type: TypesFilter.RESTAURANT };
        case TypesFilter.ALL:
            return {};
        default:
            return {};
    }
};
