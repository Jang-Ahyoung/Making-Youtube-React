import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

// deconstructing이용해 props에 비디오들도 전달받고 onVideoClick도 전달받아 -> VideoItem 클릭되면 여기서 처리돼
// const VideoList =({ videos, onVideoClick}) => (
//   <ul className={styles.videos}>
//     {videos.map(video => (
//       <VideoItem key={video.id} video={video} onVideoClick={onVideoClick}/>
//       // onVideoClick={onVideoClick} 이렇게 한단계더 전달해줘
//     ))}
//   </ul>
// );

// export default VideoList;

const VideoList = ({ videos, onVideoClick, display }) => (
  <ul className={styles.videos}>
    {videos.map(video => (
      <VideoItem
        key={video.id}
        video={video}
        onVideoClick={onVideoClick}
        display={display}
      />
    ))}
  </ul>
);

export default VideoList;