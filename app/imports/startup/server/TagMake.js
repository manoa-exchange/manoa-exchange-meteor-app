import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags/Tags';

/* eslint-disable no-console */

const createTag = (name) => {
  console.log(`  Creating tag ${name}.`);
  Tags.collection.insert(
    {
      name,
    },
    (error) => {
      if (error) {
        console.log('Error', error.message, 'error');
      } else {
        console.log('Success', 'Tag added successfully', 'success');
      }
    },
  );
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.settings.defaultTags) {
  console.log('Creating the default Tags');
  Meteor.settings.defaultTags.forEach(({ name }) => createTag(name));
} else {
  console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
}
