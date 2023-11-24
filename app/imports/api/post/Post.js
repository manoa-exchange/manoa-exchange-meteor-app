import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class PostsCollection {
  constructor() {
    this.name = 'PostsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      uniqueId: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      title: { // Assuming you meant 'title' instead of the second 'name'
        type: String,
        optional: true,
        defaultValue: '',
      },
      name: {
        type: String,
        custom() {
          const existingPost = this.collection.findOne({ name: this.value });
          if (existingPost) {
            return 'uniqueName';
          }
        },
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
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Posts = new PostsCollection();
