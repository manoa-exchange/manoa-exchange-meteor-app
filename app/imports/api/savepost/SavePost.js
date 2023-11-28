import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SavedPostsCollection. It encapsulates state and variable values for stuff.
 */
class SavePostsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SavedPostsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      id: {
        type: String,
        // eslint-disable-next-line consistent-return
        custom() {
          // eslint-disable-next-line no-use-before-define
          const existingPost = SavedPosts.collection.findOne({ id: this.value, owner: Meteor.user().username });
          if (existingPost) {
            return 'uniqueId';
          }
        },
      },
      owner: String,
      image: String,
      caption: String,
      likeCount: {
        type: Number,
        optional: true,
        defaultValue: 0,
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
 * The singleton instance of the SavePostsCollection.
 * @type {SavePostsCollection}
 */
export const SavedPosts = new SavePostsCollection();
