import axios from 'axios';

class Youtube {

  // key를 모르게 하고 싶다면 
  // constructor(httpClient) {
  //   this.youtube = httpClient;
  // } 이렇게 할당만 해줘서 실제로 이것을 쓰는 곳에서(index.js) dependency를 injection해주면돼!


  constructor(key) {
    this.youtube = axios.create({ //axios에서 기본적으로 만들어줘야 되는 것
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: key }, // 공통적으로 쓰이는 params도 여기에 설정할 수 있어! 키가 공통적으로쓰이는 받아온 키사용
    }); // 기본적으로 유트브와 통신하는 베이스 유트브 클라이언트 만들어진거야
    // this.key = key;
    // this.getRequestOptions = {
    //   method: 'GET',
    //   redirect: 'follow',
    // }; -> 패치에선 필요없어!
  }

  // 가독성 올라가고, json변환안해도되고

  //fetch와 같이 json으로 변환하지 않아도 라이브러리 자체에서 json으로 변환해주기 때문에 그부분 생략가능 + axios는 이전 브라우저와 호환이 된다
  async mostPopular() {
    const response = await this.youtube.get('videos', { // videos를 받아와 그다음에 오브젝트로 params 전달
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 25,
      } // 패치는 전체적인 url작성한 반면에 이것 이용시 간단하게 params 파트 나눠서 해볼수있어 postman에서 사용한것처럼 조금더 가독성있게 사용이 가능해
    });
    return response.data.items; //data안의 items 리턴해주면돼
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
    //   this.getRequestOptions
    // );
    // const result = await response.json();
    // return result.items;
  }

  async search(query) {
    const response = await this.youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        q: query,
      }
    });
    return response.data.items.map(item => ({ ...item, id: item.id.videoId }))
    // const response = await fetch(
    //   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${this.key}`,
    //   this.getRequestOptions
    // );
    // const result = await response.json();
    // return result.items.map(item => ({ ...item, id: item.id.videoId }));
  }
}

export default Youtube;
