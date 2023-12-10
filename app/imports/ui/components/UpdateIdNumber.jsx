import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';

const UpdateIdNumber = () => {
  const [newIdNumber, setNewIdNumber] = useState('');
  const [updateStatus, setUpdateStatus] = useState({ error: null, success: false });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('profiles.updateIdNumber', newIdNumber, (error) => {
      if (error) {
        setUpdateStatus({ error: error.message, success: false });
      } else {
        setUpdateStatus({ error: null, success: true });
        setNewIdNumber(''); // Reset form on success
      }
    });
  };

  return (
    <div>
      <h2>Current ID Number: {userProfile?.idNumber}</h2>
      {updateStatus.error && <div className="error-message">{updateStatus.error}</div>}
      {updateStatus.success && <div className="success-message">ID number updated successfully.</div>}
      {subscriptionError && <div className="error-message">Error loading profile: {subscriptionError.message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newIdNumber}
          onChange={(e) => setNewIdNumber(e.target.value)}
          placeholder="Enter new ID number"
        />
        <button type="submit">Update ID Number</button>
      </form>
    </div>
  );
};

export default UpdateIdNumber;
