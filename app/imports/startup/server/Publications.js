import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Posts } from '../../api/post/Post';
import { SavedPosts } from '../../api/savepost/SavePost';
import { Profiles } from '../../api/profile/Profile';
import { Reports } from '../../api/report/Report';
import { Comments } from '../../api/comment/Comment.js';
import { Tags } from '../../api/tags/Tags';
import { PostTags } from '../../api/post/PostTags';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Tags.adminPublicationName, function () {
  if (this.userId) {
    return Tags.collection.find();
  }
  return this.ready();
});
Meteor.publish(PostTags.adminPublicationName, function () {
  if (this.userId) {
    return PostTags.collection.find();
  }
  return this.ready();
});
Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Posts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(SavedPosts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return SavedPosts.collection.find({ owner: username });
  }
  return this.ready();
});
// User level publication for Profile Collection
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Reports.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    if (Reports.collection) {
      return Reports.collection.find({ owner: username });
    }
    console.error('Reports collection is undefined');

  }
  return this.ready();
});

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) { // <-- Fixed this line, changed from this.userID to this.userId
    const username = Meteor.users.findOne(this.userId).username;
    return Comments.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Posts.adminPublicationName, function () {
  if (this.userId) {
    return Posts.collection.find();
  }
  return this.ready();
});

// Admin level publication for profile collection
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reports.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    // Assuming Reports collection contains reported post IDs
    const reportedPostsIds = Reports.collection.find({}, { fields: { uniqueId: 1 } }).fetch().map(report => report.uniqueId);
    return Posts.collection.find({ uniqueId: { $in: reportedPostsIds } });
  }
  return this.ready();
});

Meteor.publish(Comments.adminPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});

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
// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});