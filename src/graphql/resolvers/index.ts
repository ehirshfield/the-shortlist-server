import merge from "lodash.merge";
import { listingResolvers } from "./Listings";
import { reviewResolvers } from "./Reviews"

export const resolvers = merge(listingResolvers, reviewResolvers);
