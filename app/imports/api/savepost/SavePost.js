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
      uniqueId: {
        type: String, // You can change the data type as needed
        optional: true, // Make uniqueId optional
        defaultValue: '', // You can also set a default value
      },
      name: {
        type: String,
        optional: true, // Make likeCount optional
        defaultValue: '', // You can also set a default value
      },
      owner: String,
      image: {
        type: String,
        optional: true, // Make likeCount optional
        defaultValue: '', // You can also set a default value
      },
      caption: {
        type: String,
        optional: true, // Make likeCount optional
        defaultValue: '', // You can also set a default value
      },
      likeCount: {
        type: Number,
        optional: true, // Make likeCount optional
        defaultValue: 0, // You can also set a default value
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
 * @type {SavePostsCollection}
 */
export const SavedPosts = new SavePostsCollection();
