import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The PostsCollection. It encapsulates state and variable values for stuff.
 */
class PostsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PostsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
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
 * @type {PostsCollection}
 */
export const Posts = new PostsCollection();
