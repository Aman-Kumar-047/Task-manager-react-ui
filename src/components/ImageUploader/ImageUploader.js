import React, {useReducer, useEffect, useState, useMemo} from 'react';
import classes from './ImageUploader.module.css';

// import PropTypes from 'prop-types';

const imageUploaderInitialState = {
  uploadImageFileArray: [],
  uploadImageUrlArray: []
};

const setImageUploaderState = (
  state = imageUploaderInitialState,
  action
) => {
  switch (action.type) {
    case "SET_IMAGE_FILES":
      return {
        ...state,
        uploadImageFileArray: [...state.uploadImageFileArray,action.payload],
      };
    case "SET_IMAGE_URL":
      return{
        ...state,
        uploadImageUrlArray: [...state.uploadImageUrlArray,action.payload]
      };
      case "SET_IMAGE_FILE_ARRAY_EMPTY":
        return{
          ...state,
          uploadImageFileArray: []
        };
    default:
      return state;
  }
};

const ImageUploader = (props) => {

    const url = "https://api.cloudinary.com/v1_1/dev-upload/image/upload";//https://api.cloudinary.com/v1_1/${cloudName}/upload

    const [imageUploaderState, imageUploaderHandler] = useReducer(
      setImageUploaderState,
      imageUploaderInitialState
    );

    useEffect(
         () => {
            if(imageUploaderState.uploadImageFileArray.length > 0){
                for (let i = 0; i < imageUploaderState.uploadImageFileArray.length; i++) {
                  let file = imageUploaderState.uploadImageFileArray[i];
                  let formData = new FormData();
                  formData.append('upload_preset', 'ml_default');
                  formData.append("file", file);

                  fetch(url, {
                    method: "POST",
                    body: formData
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                        imageUploaderHandler({type:'SET_IMAGE_URL',payload: data.secure_url});
                    });
                }
                imageUploaderHandler({type:'SET_IMAGE_FILE_ARRAY_EMPTY'});
            }
        },[imageUploaderState.uploadImageFileArray]
    );

    const onUploadOfImages = (event) => {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          let file = files.item(i);
          imageUploaderHandler({type:'SET_IMAGE_FILES',payload: file});
        }
      };


      let uploadImageElemArray =  [];
      imageUploaderState.uploadImageUrlArray.forEach((srcUrl, index) => {
          uploadImageElemArray.push(
            <img
                className={classes.uploadImageDisplay}
              src={srcUrl}
              key={`upload_${index}`}
            />
          );
        });   


    return(
        <div className={classes.imageContainer}>
        <div className={classes.imageUploader}>
          <label htmlFor="images">
            <img src="https://img.icons8.com/fluent/50/000000/image.png" />
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={(event) => {
              onUploadOfImages(event);
            }}
          />
        </div>
        {uploadImageElemArray ? uploadImageElemArray.map((elem) => {
          return elem;
        }) : null}
      </div>
    )
};


export default ImageUploader;