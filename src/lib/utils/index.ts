import { Request } from 'express';
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
    const token = req.get('X-CSRF-TOKEN');

    const userArray = authorizedUsers.filter(
        (id) => id === req.signedCookies.viewer
    );

    console.log('csrf token :>> ', token);

    if (userArray[0] === req.signedCookies.viewer) {
        viewer = await db.users.findOne({
            _id: req.signedCookies.viewer,
        });
    }

    console.log('viewer :>> ', viewer);

    return viewer;
};
