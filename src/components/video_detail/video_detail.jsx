import React from 'react';
import styles from './video_detail.module.css';
//props로 선택된 비디오 받아와
//오류1 : index.js:1 Warning: Invalid DOM property `frameborder`. Did you mean `frameBorder`?
const VideoDetail = ({video,video: { snippet } }) =>(
    <section className={styles.detail}>
    <iframe // 유트브 ifram 받아와야해 : youtube api - video - sample- 매개변수보기
      className={styles.video}
    //   <iframe> elements must have a unique title property  jsx-a11y/iframe-has-title
      title = "youtube video player"
      type="text/html"
      width="100%" // 100프로로 변경
      height="500px"
      src={`https://www.youtube.com/embed/${video.id}`}
      frameBorder="0"
      allowFullScreen
    ></iframe>
    <h2>{snippet.title}</h2>
    <h3>{snippet.channelTitle}</h3>
    {/* pre 태그 의문제점 : 길어지면 공간 넘어가서 사이즈 계속 길어져 -> css로 해결돼 */}
    <pre className={styles.description}>{snippet.description}</pre>
  </section>
);
    
export default VideoDetail;