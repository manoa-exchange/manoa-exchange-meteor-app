import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ReportsCollection. It encapsulates state and variable values for stuff.
 */
class ReportsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReportsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      uniqueId: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      name: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      owner: String,
      image: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      caption: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      likeCount: {
        type: Number,
        optional: true,
        defaultValue: 0,
      },
      createdAt: {
        type: Date,
        // eslint-disable-next-line consistent-return
        autoValue: function () {
          if (this.isInsert) {
            return new Date();
          } if (this.isUpsert) {
            return { $setOnInsert: new Date() };
          }
          this.unset(); // Prevent user from supplying their own value

        },
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the PostsCollection.
 * @type {ReportsCollection}
 */
export const Reports = new ReportsCollection();