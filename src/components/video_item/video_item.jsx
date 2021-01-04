import React, {memo} from 'react';
import styles from './video_item.module.css';
// snippet 받아왔기때문에 video 한번 더 받아와주도록 해야해!
// prop이 바뀌지 않는다면 다시 업데이트 될 필요가 없을떄 memo이용해주면돼!
const VideoItem = memo(
  ({ video,video: { snippet } ,onVideoClick, display}) => {
    const displayType = display === 'list' ? styles.list : styles.grid;
    // 설정해주고 css에서 .container.grid & .container.list 추가해줘!
  
    return( // 바로 리턴하는 것 아니기때문에 {}코드블록으로 감싸줘
    // 클랙스 네임에 display 넣어서 해주면돼!
    <li className={`${styles.container} ${displayType}`} onClick={() => onVideoClick(video)}>
      {/* li에서 onClick되면 비디오 전달하면돼 */}
      <div className={styles.video}>
        <img
          className={styles.thumbnail}
          src={snippet.thumbnails.medium.url}
          alt="video thumbnail"
        />
        <div className={styles.metadata}>
          <p className={styles.title}>{snippet.title}</p>
          <p className={styles.channel}>{snippet.channelTitle}</p>
        </div>
      </div>
    </li>
  );}
);

export default VideoItem;
