import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Review } from "../../../lib/types";

export const reviewResolvers: IResolvers = {
  Query: {
    reviews: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Review[]> => {
      return await db.reviews.find({}).toArray();
    }
  },
  Mutation: {
    deleteReview: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Review> => {
      const deleteRes = await db.reviews.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error("failed to delete review");
      }

      return deleteRes.value;
    }
  },
  Review: {
    id: (review: Review): string => review._id.toString()
  }
};
