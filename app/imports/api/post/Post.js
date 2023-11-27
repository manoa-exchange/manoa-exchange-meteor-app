import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class PostsCollection {
  constructor() {
    this.name = 'PostsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      name: {
        type: String,
        // eslint-disable-next-line consistent-return
        custom() {
          // eslint-disable-next-line no-use-before-define
          const existingPost = Posts.collection.findOne({ name: this.value });
          if (existingPost) {
            return 'uniqueName';
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
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Posts = new PostsCollection();
