import { Review, ReviewType } from '../../../lib/types';

export enum ReviewsFilter {
    RATING_LOW_TO_HIGH = 'RATING_LOW_TO_HIGH',
    RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
}

export interface ReviewArgs {
    id: string;
}

export interface ReviewsArgs {
    location: string | null;
    filter: ReviewsFilter;
    limit: number;
    page: number;
}

export interface ReviewsData {
    region: string | null;
    total: number;
    result: Review[];
}

export interface ReviewsQuery {
    country?: string;
    admin?: string;
    city?: string;
}

export interface addReviewInput {
    title: string;
    subtitle: string;
    body: string;
    image: string;
    type: ReviewType;
    rating: number;
    address?: string;
    url?: string;
}

export interface addReviewArgs {
    input: addReviewInput;
}
