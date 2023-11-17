import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from '../../api/post/Post';

/* eslint-disable no-console */
Meteor.methods({
  'posts.logLikeCount'(postId) {
    check(postId, String);
    const post = Posts.collection.findOne({ _id: postId });
    if (post) {
      console.log(`Like count for post ${postId}:`, post.likeCount);
    } else {
      console.log('Post not found');
    }
  },
  'posts.incrementLike'(postId) {
    check(postId, String);
    Posts.collection.update(postId, {
      $inc: { likeCount: 1 },
    });
  },
  'posts.decrementLike'(postId) {
    check(postId, String);
    Posts.collection.update(postId, {
      $inc: { likeCount: -1 },
    });
  },
});

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Posts.collection.insert(data);
};

// Initialize the Posts collection if empty.
if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosts) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
