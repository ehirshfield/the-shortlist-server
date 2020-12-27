import { Review } from '../../../lib/types';

export interface UserArgs {
    id: string;
}

export interface UserReviewArgs {
    limit: number;
    page: number;
}

export interface UserReviewsData {
    total: number;
    result: Review[];
}
