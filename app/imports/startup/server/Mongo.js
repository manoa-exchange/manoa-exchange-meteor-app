import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from '../../api/post/Post';
import { Reports } from '../../api/report/Report';
import { SavedPosts } from '../../api/savepost/SavePost';

/* eslint-disable no-console */
Meteor.methods({
  'posts.logLikeCount'(uniqueId) {
    check(uniqueId, String);
    const post = Posts.collection.findOne({ uniqueId: uniqueId });
    if (post) {
      console.log(`Like count for post ${uniqueId}:`, post.likeCount);
    } else {
      console.log('Post not found');
    }
  },
  'posts.incrementLike'(uniqueId) {
    check(uniqueId, String);
    Posts.collection.update(uniqueId, {
      $inc: { likeCount: 1 },
    });
  },
  'posts.decrementLike'(uniqueId) {
    check(uniqueId, String);
    Posts.collection.update(uniqueId, {
      $inc: { likeCount: -1 },
    });
  },
  'posts.delete'(uniqueId) {
    check(uniqueId, String);
    console.log('Post Deleted');
    Posts.collection.remove(uniqueId);
  },
  'savePosts.delete'(uniqueId) {
    check(uniqueId, String);
    console.log('Saved Post Deleted');
    SavedPosts.collection.remove(uniqueId);
  },
  'reports.delete'(uniqueId) {
    check(uniqueId, String);
    console.log('Reported Post Deleted');
    Reports.collection.remove(uniqueId);
  },
  'reports.refresh'() {
    // You can put any necessary logic here to refresh the reports' data.
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
