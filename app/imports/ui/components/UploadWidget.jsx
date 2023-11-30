import React, { useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const UploadWidget = ({ setUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: Meteor.settings.public.cloudinary.cloud_name,
        uploadPreset: Meteor.settings.public.cloudinary.upload_preset,
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          setUrl(result.info.secure_url);
        } else {
          console.log('Error upload image: ', error);
        }
      },
    );
  }, [setUrl]);

  if (!widgetRef.current) {
    return (
      <LoadingSpinner />
    );
  }

  UploadWidget.propTypes = {
    setUrl: PropTypes.func.isRequired,
  };
  return (
    <button type="button" onClick={() => widgetRef.current.open()}>
      Upload
    </button>
  );
};
export default UploadWidget;
