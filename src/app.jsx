import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import Skeleton from './components/skeleton/skeleton';

import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

//App 컴포넌트는 function 컴포넌트 이기때문에  관련된 state나 props이 바뀌면 우리가 여기에 정의한 멤버변수가 다시 만들어진다
// 그말은 여기 콜백함수들이 새롭게 만들어진다는 이야기!
// 즉 state 바뀔때마다 search는 새로운 함수 가리키게 되고 search는 setSelectedVideo에 전달되기떄문에
// 새로운 props전달되는 거랑 동일하기떄문에 memo썼음에도 계속 적 렌더 발생 => 방지하기위해 usecallback사용!

//경고 1 : React Hook useEffect has a missing dependency: 'youtube'.
// 우리는 컴포넌트가 마운트 되었을떄만 쓰고 싶지만 그럴 일은 없지만 PROPS 바뀌었을떄도 업데이트되어 새로운 데이터 받아오고 싶을 수 있으니 [youtube] 넣어주면돼
function App({ youtube }) {

  //1. 우선 비디오의 목록 받아올 수 있는 state가 있어야해
  // 함수 컨포넌트에서 state사용 방법 - useState api 이용
  const [videos, setVideos] = useState([]); //videos에 변수 저장, 업그레이드 할수있는 setVideos 선언 후 useState선언하는 업데이트 할수있는 함수가 각각 할당돼어져
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 비디오 저장
  //비디오 선택되었을떄 핸들링하는 콜백함수 필요 
  const selectVideo = video => {
    setSelectedVideo(video); //비디오 받아지면 함수 업데이트 해줄거야
    // 이 함수를 비디오 리스트에 전달할거야!!!
  };
  //useCallback은 한단계 감싸준 뒤 useEffect와 마찬가지로 두번쨰 인자에 dependency list를 전달하지 않으면 계속해서 새로운것 만들고 , []텅텅빈 배열 전달시 한번만 만들고 계속 동일한 오브젝트 반복해서 사용!!
  // 하지만 useCallback은 한번 만들면 메모리상에 계속 보관하기때문에 메모리에 영향줘
  // -> 자식 컴포넌트에 props으로 전달할때 자식 컴포넌트가 다시 리렌더 발생할 수 있으니 그럴때만 useCallback 사용
  const search = useCallback(query => {
    youtube
      .search(query) //
      // .then(videos => setVideos(videos)); 
      // 비디오가 검색이 됐다면 다시 videos 선택하고 나서
      .then(videos => {
        setVideos(videos);
        setSelectedVideo(null);
      })
  }, [youtube]); // 유트브 바뀔때마다 업데이트되어도 상관없으니 워닝 지우기위해 넣어줘

  useEffect(() => { //2. mount, 콜백되었을때 쓸수있는 함수 여기에 원하는 함수 등록
    const getVideos = async () => {
      setIsLoading(true);
      try {
        await youtube
          .mostPopular()
          .then(videos => setVideos(videos));
      } catch (err) { }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    getVideos();
  }, [youtube]); // 컴포넌트 업데이트 될때마다 네트워크 통신하는 것은 좋지않아
  // 텅텅빈 배열 2번쨰 인자로 전달시마운트 되었을때만 이부분이 호출돼
  //useState네임 비끨때마다 호출되었음 좋겠어 -> []안에 name만 전달해주면돼
  console.log(videos)
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} isLoading={isLoading} />
      <section className={styles.content}>
        {selectedVideo ? ( // 선택된 비디오가 있다면~ VideoDetail컴포넌트 이용해서 비디오에 전달
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div> // 검색될때마다 목록으로 다시 돌아가야되지만 랜더부분에서 셀렉티드된게 없으면 보이지 않도록 상태에따라 볼수있게 정의되있기때문에 상태만 업데이트해주면돼!! 초간단쓰 ㅎㅎ
        )
          :
          <div className={styles.navbar}>
            <HomeIcon /> <p>홈</p>
            <ExploreIcon /> <p>탐색</p>
            <SubscriptionsIcon /> <p>구독</p>
            <VideoLibraryIcon /> <p>보관함</p>
          </div>
        }
        {isLoading
          ? (
            <div className={styles.skeleton}>
              <Skeleton type="feed"></Skeleton>
            </div>)
          :
          <div className={styles.list}>
            <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} selectedVideo={selectedVideo} />
            {/* 새로운 prop 만들어서 selectedVideo있으면 list로 보여주고 아니면 1줄에 2개씩 나오도록 해주는것! */}
          </div>
        }
      </section>
    </div >
  );
}

export default App;
