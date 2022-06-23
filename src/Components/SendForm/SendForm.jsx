import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { Button } from '../Button';

import { Input } from '../Input';
import s from './SendForm.module.scss';

export const SendForm = () => {
  const [positions, setPositions] = React.useState(undefined);
  const [image, setImage] = React.useState([]);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState('');
  useEffect(() => {
    const getPositions = () => {
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setPositions(data.positions);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getPositions();
  }, []);
  console.log(positions);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onNameChnageHandler = (e) => {
    console.log(e.target);
    const value = e.target.value;
    setName(value);
  };
  const onEmailChangeHandler = (e) => {
    console.log(e.target);
    const value = e.target.value;
    setEmail(value);
  };
  const onPhoneChangeHandler = (e) => {
    console.log(e.target);
    const value = e.target.value;
    setNumber(value);
  };
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
  };
  return (
    <div className={s.sendForm}>
      <div className={s.sendForm_header}>
        <h1>Working with POST request</h1>
      </div>
      <form onSubmit={onSubmitHandler} className={s.sendForm_form}>
        <Input
          placeholder='Your name'
          value={name}
          onChange={onNameChnageHandler}
        />
        <Input
          placeholder='Email'
          value={email}
          onChange={onEmailChangeHandler}
        />
        <div className={s.phone}>
          <Input
            placeholder='Phone number'
            value={number}
            onChange={onPhoneChangeHandler}
          />
          <span>+38(XXX)XXX-XX-XX</span>
        </div>
        <div className={s.sendForm_form__radio}>
          <span>Select your position</span>
          <div className={s.input_radio}>
            {positions
              ? positions.map((position) => (
                  <label id={position.id} className={s.radio}>
                    <input
                      type='radio'
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                      key={position.id}
                      value={position.name}
                      name='position'
                    />
                    <span>{position.name}</span>
                  </label>
                ))
              : null}
          </div>
        </div>
        <div className={s.sendForm_form__uploadPhoto}>
          <ImageUploading
            multiple
            value={image}
            onChange={onChange}
            dataURLKey='data_url'
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <div className='upload__image-wrapper'>
                <div className={s.upload_link}>
                  <button onClick={onImageUpload}>Upload</button>
                  <span>Upload your photo</span>
                </div>
                {imageList.map((image, index) => (
                  <div key={index} className='image-item'>
                    <img src={image['data_url']} alt='' width='100' />
                    <div className='image-item__btn-wrapper'>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
        <div className={s.sendForm_button}>
          <Button />
        </div>
      </form>
    </div>
  );
};
