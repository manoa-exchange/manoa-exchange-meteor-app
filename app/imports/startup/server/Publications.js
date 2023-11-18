import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
// import { Stuffs } from '../../api/stuff/Stuff.js';
import { Posts } from '../../api/post/Post';
import { SavedPosts } from '../../api/savepost/SavePost';
import { Profiles } from '../../api/profile/Profile';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
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

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Posts.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Posts.collection.find();
  }
  return this.ready();
});

// Admin level publication for profile collection
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
