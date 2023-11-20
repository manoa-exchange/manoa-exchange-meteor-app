import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
// import { Stuffs } from '../../api/stuff/Stuff.js';
import { check } from 'meteor/check';
import { Posts } from '../../api/post/Post';

// deletes post on admin level
Meteor.methods({
  'posts.remove'(postId) {
    check(postId, String);
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('admin function only.');
    }
    Posts.collection.remove(postId);
  },
});

export