import merge from "lodash.merge";
import { reviewResolvers } from "./Reviews"
import { viewerResolvers } from './Viewer'

export const resolvers = merge(reviewResolvers, viewerResolvers);
