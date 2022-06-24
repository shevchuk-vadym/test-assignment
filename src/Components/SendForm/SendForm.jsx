import React, { useEffect } from 'react';
import { Input } from '../Input/Input';
import ImageUploading from 'react-images-uploading';
import s from './SendForm.module.scss';
import { Button } from '../Button';
import { SuccessfullRegister } from '../SuccessfullRegister/SuccessfullRegister';

const getRequiredFieldMessage = (field) => `${field} is required`;

const API_URL = process.env.REACT_APP_API_URL;
const validators = {
  name: (v) => {
    if (!v) {
      return getRequiredFieldMessage('Name');
    }
    if (v.length < 2 || v.length >= 60) {
      return 'Name should be more then 2 digest length';
    }
  },
  email: (v) => {
    if (!v) {
      return getRequiredFieldMessage('Email');
    }
    if (
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
        v
      ) === false
    ) {
      return 'Email should be name@subname';
    }
  },
  phone: (v) => {
    if (!v) {
      return getRequiredFieldMessage('Phone');
    }
    if (/^[+]380/.test(v) === false) {
      return 'Phone should start from +380';
    }
  },
  photo: (v) => {
    if (!v) {
      return getRequiredFieldMessage('Photo');
    }
    const SIZE_LIMIT_5_MB = 5000000;
    if (v.size > SIZE_LIMIT_5_MB) {
      return 'Image size should les then 5mb';
    }
    const types = ['image/jpg', 'image/jpeg'];
    if (types.indexOf(v.type) === -1) {
      return 'Image should be jpeg/jpg';
    }
  },
  position_id: (v) => {
    if (!v) {
      return getRequiredFieldMessage('Position');
    }
  },
};

const validate = (formData) => {
  const errors = {};
  for (let key in formData) {
    if (formData.hasOwnProperty(key)) {
      const errorMessage = validators[key](formData[key]);
      if (errorMessage) {
        errors[key] = errorMessage;
      }
    }
  }

  return errors;
};

const FORM_STATE = {
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};
export const SendForm = ({ token, getToken, onSuccessSubmit }) => {
  const [positions, setPositions] = React.useState(undefined);
  const [images, setImages] = React.useState([]);
  const [submitError, setSubmitError] = React.useState('EMPTY');
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    position_id: '',
    photo: '',
  });

  const [errors, setErrors] = React.useState({});
  const [formState, setFormState] = React.useState(FORM_STATE.EMPTY);

  useEffect(() => {
    const getPositions = () => {
      fetch(`${API_URL}/positions`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPositions(data.positions);
        });
    };
    getPositions();
  }, []);

  const onSubmitHandler = React.useCallback(
    (e) => {
      e.preventDefault();
      const validationErrors = validate(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const requestData = new FormData();
      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          requestData.append(key, formData[key]);
        }
      }

      fetch(`${API_URL}/users`, {
        method: 'POST',
        body: requestData,
        headers: {
          Token: token,
        },
      })
        .then((r) => {
          return r.json();
        })
        .then((d) => {
          if (d.success === false) {
            setSubmitError(d.message);
            setFormState(FORM_STATE.ERROR);
          } else {
            setSubmitError('');
            setFormState(FORM_STATE.SUCCESS);
            onSuccessSubmit(d.user_id);
          }
        })
        .catch((e) => {
          setSubmitError(e.message);
          setFormState(FORM_STATE.ERROR);
        });
    },
    [formData, token]
  );

  const onChangeInput = (field) => {
    return (e) => {
      const value = e.target.value;
      if (errors[field]) {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
      }

      setFormData({ ...formData, [field]: value });
    };
  };

  const onChange = React.useCallback(
    (imageList, addUpdateIndex) => {
      if (errors['photo']) {
        const { photo, ...rest } = errors;
        setErrors(rest);
      }
      setImages(imageList);
      setFormData({ ...formData, photo: imageList[0].file });
    },
    [errors, formData]
  );

  function renderContent() {
    switch (formState) {
      case FORM_STATE.EMPTY:
        return (
          <form onSubmit={onSubmitHandler} className={s.sendForm_form}>
            <Input
              value={formData['name']}
              type='text'
              placeholder={'Your name'}
              errorMessage={errors['name']}
              onChange={onChangeInput('name')}
            />
            <Input
              value={formData['email']}
              type='text'
              placeholder='Email'
              errorMessage={errors['email']}
              onChange={onChangeInput('email')}
            />
            <Input
              value={formData['phone']}
              type='tel'
              placeholder='Phone'
              onChange={onChangeInput('phone')}
              errorMessage={errors['phone']}
              helpText='+38(XXX)XXX-XX-XX'
            />
            <div className={s.sendForm_form__radio}>
              <span>Select your position</span>
              <div className={s.input_radio}>
                {positions
                  ? positions.map((position) => (
                      <label id={position.id}>
                        <input
                          className={s.input_radio__button}
                          type='radio'
                          onChange={(e) => {
                            const { position_id, ...rest } = errors;
                            setErrors(rest);
                            setFormData({
                              ...formData,
                              position_id: e.target.value,
                            });
                          }}
                          key={position.id}
                          value={position.id}
                          name='position_id'
                        />
                        <span>{position.name}</span>
                      </label>
                    ))
                  : null}
                {errors['position_id'] && (
                  <span className={s.error_link}>{errors['position_id']}</span>
                )}
              </div>
            </div>
            <div className={s.sendForm_form__uploadPhoto}>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={1}
                dataURLKey='data_url'
              >
                {({ imageList, onImageUpload, onImageRemove }) => (
                  // write your building UI
                  <div className='upload__image-wrapper'>
                    <div
                      className={`${s.upload_link} ${
                        errors['photo'] && s.error
                      }`}
                    >
                      <button onClick={onImageUpload}>Upload</button>
                      <span>Upload your photo</span>
                    </div>
                    {errors['photo'] && (
                      <span className={s.error_link}>{errors['photo']}</span>
                    )}
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
            <div className={`${s.sendForm_button}`}>
              <Button
                disabled={Object.keys(errors).length > 0}
                text='Sign up'
              />
            </div>
          </form>
        );
      case FORM_STATE.SUCCESS:
        return <SuccessfullRegister />;
      case FORM_STATE.ERROR:
        return <span>{submitError}</span>;
    }
  }

  return (
    <div className={s.sendForm} id='sendForm'>
      <div className={s.sendForm_header}>
        <h1>Working with POST request</h1>
      </div>
      <>{renderContent()}</>
    </div>
  );
};
