import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const UploadWidget = ({ setUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dlqixfg1f',
      uploadPreset: 'rudaqi8t',
    }, function (error, result) {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        setUrl(result.info.secure_url);
      }
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
