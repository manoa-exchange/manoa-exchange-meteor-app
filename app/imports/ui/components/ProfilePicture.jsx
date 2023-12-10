// ProfilePicture.jsx

import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profile';
import UploadWidget from './UploadWidget';

import '../css/ProfilePicture.css'; // Import the CSS for styling

const ProfilePicture = () => {
  const [updateStatus] = useState({ error: null, success: false });
  const { userProfile, subscriptionError } = useTracker(() => {
    const user = Meteor.user();
    if (!user) {
      return {
        userProfile: null,
        isLoading: false,
        subscriptionError: null,
      };
    }

    const profileSubscription = Meteor.subscribe(Profiles.userPublicationName);

    if (profileSubscription.ready()) {
      return {
        userProfile: Profiles.collection.findOne({ owner: user.emails[0].address }),
        isLoading: false,
        subscriptionError: null,
      };
    }
    return {
      userProfile: null,
      isLoading: true,
      subscriptionError: profileSubscription.error,
    };
  }, []);

  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const setImageUrl = (newUrl) => {
    setCloudinaryUrl(newUrl); // Set the cloudinaryUrl state with the new URL
    setIsImageUploaded(true); // Set isImageUploaded to true when the image URL is updated
  };

  const submit = (data) => {
    const { image } = data;
    const imageUrl = cloudinaryUrl || image;

    console.log('Image URL before submission:', imageUrl);

    if (!isImageUploaded) {
      swal('Error', 'Please upload an image before submitting', 'error');
      return;
    }
    const user = Meteor.user();
    if (!user) {
      swal('Error', 'User not logged in', 'error');
      return;
    }
    const owner = Meteor.user().username; // Use email as the owner

    console.log('Owner:', owner);

    const profile = Profiles.collection.findOne({ owner });

    console.log('User Profile:', profile);

    if (!profile) {
      swal('Error', 'User profile not found', 'error');
      return;
    }

    Profiles.collection.update(
      { _id: profile._id },
      {
        $set: {
          profilePicture: imageUrl,
        },
      },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile picture updated successfully', 'success');
          setIsImageUploaded(false);
        }
      },
    );
  };

  return (
    <div>
      {updateStatus.error && <div className="error-message">{updateStatus.error}</div>}
      {updateStatus.success && <div className="success-message">Profile picture updated successfully.</div>}
      {subscriptionError && <div className="error-message">Error loading profile: {subscriptionError.message}</div>}
      <div>
        <div>
          <h3>Current Profile Picture:</h3>
          {userProfile && userProfile.profilePicture && (
            <div className="profile-picture-preview">
              <img
                src={userProfile.profilePicture}
                alt="Current Profile"
              />
            </div>
          )}
        </div>
      </div>
      <UploadWidget setUrl={setImageUrl} />
      <button type="button" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default ProfilePicture;
