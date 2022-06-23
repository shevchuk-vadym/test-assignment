import React from 'react';
import s from './App.module.scss';
import './ResetCss.css';
import { Header } from '../Components/Header';
import { Main } from '../Components/Main';
import { Content } from '../Components/Content/Content';
import { useEffect } from 'react';
import { SendForm } from '../Components/SendForm/SendForm';
import { useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

export const App = () => {
  const [token, setToken] = React.useState(undefined);
  const [users, setUsers] = React.useState(undefined);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(undefined);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const addUsers = useCallback(
    (newUsers) => {
      const existsingUsers = users || [];
      const t = [...existsingUsers, ...newUsers];
      setUsers(t);
    },
    [users]
  );

  const getToken = useCallback(() => {
    fetch(`${API_URL}/token`, {
      method: 'GET',
    })
      .then((t) => {
        console.log(t);
        return t.json();
      })
      .then((user) => {
        console.log(user.token);
        setToken(user.token);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const getUsers = () => {
      fetch(`${API_URL}/users?page=${currentPage}&count=6`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw Error('Something goes wrong');
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            addUsers(data.users);
            setTotalPages(data.total_pages);
            console.log(totalPages);
            return;
          }
          throw Error('Please retry later');
        })
        .catch((e) => {
          alert(e.message);
        });
    };
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    setIsLastPage(currentPage === totalPages);
  }, [currentPage, totalPages]);

  console.log(users);

  function moreUsers() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div className={s.wrapper}>
      <Header />
      <Main getToken={getToken} />
      <Content
        users={users}
        moreUsers={moreUsers}
        isShowMoreButtonVisible={!isLastPage}
      />
      <SendForm />
    </div>
  );
};
