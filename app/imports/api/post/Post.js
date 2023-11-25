import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class PostsCollection {
  constructor() {
    this.name = 'PostsCollection';
    this.collection = new Mongo.Collection(this.name);

    const collection = this.collection; // Capture the collection in a variable for use in the custom function

    this.schema = new SimpleSchema({
      uniqueId: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      name: {
        type: String,
        optional: true, // Make likeCount optional
        defaultValue: '', // You can also set a default value
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

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Posts = new PostsCollection();
