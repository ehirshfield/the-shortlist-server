import { Review } from '../../../lib/types';

export enum ReviewsFilter {
    RATING_LOW_TO_HIGH = 'RATING_LOW_TO_HIGH',
    RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
}

export interface ReviewArgs {
    id: string;
}

export interface ReviewsArgs {
    filter: ReviewsFilter;
    limit: number;
    page: number;
}

export interface ReviewsData {
    total: number;
    result: Review[];
}
