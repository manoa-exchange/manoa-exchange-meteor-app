import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from '../../api/post/Post';
import { Reports } from '../../api/report/Report';
import { SavedPosts } from '../../api/savepost/SavePost';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */
Meteor.methods({
  'profiles.updateIdNumber'(newIdNumber) {
    check(newIdNumber, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    // Get the user's email
    const user = Meteor.user();
    if (!user || !user.emails || user.emails.length === 0) {
      throw new Meteor.Error('User not found.');
    }
    const userEmail = user.emails[0].address;

    // Update the profile
    const result = Profiles.collection.update({ owner: userEmail }, { $set: { idNumber: newIdNumber } });
    if (result === 0) {
      throw new Meteor.Error('ID number not updated.');
    }

    console.log('Updating ID number for user:', userEmail);
  },
  updateProfilePicture(imageUrl) {
    check(imageUrl, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const owner = Meteor.user().emails[0].address; // Use email as the owner

    // Find the document by owner's email and update the profilePicture field
    Profiles.collection.update(
      { owner },
      { $set: { profilePicture: imageUrl } },
      (error) => {
        if (error) {
          throw new Meteor.Error('Update failed', error.message);
        }
      },
    );
  },
  'posts.update': function (_id, updateData) {
    check(_id, String);
    const updateDataPattern = {
      caption: String,
      // Include other fields and their types as necessary
    };

    check(updateData, updateDataPattern);
    // Ensure that updateData only contains fields that should be updated
    return Posts.collection.update(_id, { $set: updateData });
  },

  'posts.logLikeCount'(uniqueId) {
    check(uniqueId, String);
    const post = Posts.collection.findOne({ _id: uniqueId });
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

    Posts.collection.remove(uniqueId);
  },
  'saveposts.delete'(uniqueId) {
    check(uniqueId, String);

    SavedPosts.collection.remove(uniqueId);
  },
  'reports.delete'(uniqueId) {
    check(uniqueId, String);

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
