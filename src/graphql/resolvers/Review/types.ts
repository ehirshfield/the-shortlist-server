import { Review, ReviewType } from '../../../lib/types';

export enum ReviewsFilter {
    RATING_LOW_TO_HIGH = 'RATING_LOW_TO_HIGH',
    RATING_HIGH_TO_LOW = 'RATING_HIGH_TO_LOW',
    NEWEST = 'NEWEST',
}

export enum TypesFilter {
    ALL = 'ALL',
    RESTAURANT = 'RESTAURANT',
    RECIPE = 'RECIPE',
    PRODUCT = 'PRODUCT',
}

export interface ReviewArgs {
    id: string;
}

export interface ReviewsArgs {
    location: string | null;
    filter: ReviewsFilter;
    typesFilter: TypesFilter;
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
    highlights: string[];
    lowlights: string[];
    address?: string;
    url?: string;
    video?: string;
}

export interface addReviewArgs {
    input: addReviewInput;
}
