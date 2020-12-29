import merge from 'lodash.merge';
import { reviewResolvers } from './Review';
import { viewerResolvers } from './Viewer';
import { userResolvers } from './User';

export const resolvers = merge(reviewResolvers, viewerResolvers, userResolvers);
