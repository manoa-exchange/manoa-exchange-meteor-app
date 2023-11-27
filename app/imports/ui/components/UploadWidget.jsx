import React, { useEffect, useRef } from 'react';
import Meteor from 'meteor';

// eslint-disable-next-line react/prop-types
const UploadWidget = ({ setUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(
      Meteor.settings.public.cloudinary.cloud_name,
      Meteor.settings.public.cloudinary.upload_preset,
    );
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: Meteor.settings.public.cloudinary.cloud_name,
      uploadPreset: Meteor.settings.public.cloudinary.upload_preset,
    }, function (error, result) {
      console.log(error);
      console.log('cloudinary result: ', result);
      // setUrl(result);
    });
  }, []);
  return (
    // eslint-disable-next-line react/button-has-type,react/react-in-jsx-scope
    <button onClick={() => widgetRef.current.open()}>
      Upload
    </button>
  );
};
export default UploadWidget;
