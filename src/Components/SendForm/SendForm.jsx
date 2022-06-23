import React, { useEffect } from 'react';
import { Input } from '../Input/Input';
import s from './SendForm.module.scss';

export const SendForm = () => {
  const [positions, setPositions] = React.useState(undefined);
  const [name, setName] = React.useState('');
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
  return (
    <div className={s.sendForm}>
      <div className={s.sendForm_header}>
        <h1>Working with POST request</h1>
      </div>
      <form onSubmit={onSubmitHandler} className={s.sendForm_form}>
        <Input value={name} onChange={onNameChnageHandler} />
        <div className={`${s.sendForm_form__email} ${s.input}`}>
          <input type='email' placeholder='Email' />
        </div>
        <div className={`${s.sendForm_form__phone} ${s.input}`}>
          <input type='tel' placeholder='Phone' />
          <span>+38(XXX)XXX-XX-XX</span>
        </div>
        <div className={s.sendForm_form__radio}>
          <span>Select your position</span>
          <div className={s.input_radio}>
            {positions
              ? positions.map((position) => (
                  <label id={position.id}>
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
          <h5>HERE WILL BE UPLOAD PHOTO</h5>
        </div>
      </form>
    </div>
  );
};
