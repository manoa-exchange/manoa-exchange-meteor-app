import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from '../../api/post/Post';
import { Reports } from '../../api/report/Report';
import { SavedPosts } from '../../api/savepost/SavePost';

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
  'posts.delete'(postId) {
    check(postId, String);

    // Additional checks can be added here (like user permissions)

    // Delete the post
    Posts.collection.remove(postId);
    Reports.collection.remove(postId);
    SavedPosts.collection.remove(postId);
  },
  'reports.refresh'() {
    // You can put any necessary logic here to refresh the reports data.
    // For example, you can fetch the updated reports data and return it.
    // Make sure to publish the reports data in your publication.
    // Example:
    const updatedReportsData = Reports.collection.find({}).fetch();
    return updatedReportsData;
  },
});
// Initialize the database with a default data document.
const addPost = (post) => {
  try {
    console.log(`  Adding: ${post.name} (${post.owner})`);
    Posts.collection.insert(post);
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

// Initialize the Posts collection if empty.
if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosts) {
    console.log('Creating default data.');
    Meteor.settings.defaultPosts.forEach(post => addPost(post));
  }
}
