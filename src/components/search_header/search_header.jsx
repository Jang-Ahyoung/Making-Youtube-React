import styles from './search_header.module.css';
import React, { memo, useRef } from 'react';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Skeleton from '../skeleton/skeleton';
//memo는 전달되는 props 변경되지 않으면 리렌더 되지않고 props 바뀌면 다시 렌더링 되는 아이
// 즉 onSearch 계속 새로운 것을 바뀌면 렌더 계속 발생할수있다는 이야기! -> app으로가
const SearchHeader = memo(({ onSearch, isLoading }) => {
  const inputRef = useRef();
  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  };
  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">
          <img className={styles.img} src="/images/logo.png" alt="logo" />
        </a>
      </div>
      <div className={styles.searchsection}>
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          placeholder="Search..."
          onKeyPress={onKeyPress}
        />
        <div className={styles.button} type="submit" onClick={onClick}>
          <img
            className={styles.buttonImg}
            src="/images/search.png"
            alt="search"
          />
        </div>
      </div>
      {isLoading ? <Skeleton type="top" />
        :
        <div className={styles.rightMenu}>
          <VideoCallIcon />
          <AppsIcon />
          <NotificationsIcon />
          <img></img>
        </div>
      }
    </header>
  );
});
export default SearchHeader;
