const API_KEY = '354af52aee70782be0a6e4c9d4057d64';
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w200/';

export const movieApi = {
  /** @function getMovies
   * 왼쪽 화면에 카드 이미지와 제목을 불러와 렌더링하는 함수
   * @param {path} path 받아오고자 하는 영화의 종류
   * @param {position} position 카드리리스트 배열의 위치
   */
    getMovies: async (path, position) => {
        let movies = [];

        await fetch(`${BASE_URL}/movie/${path}?api_key=${API_KEY}&language=ko&region=KR`)
            .then((res) => res.json())
            .then((data) => movies = data.results)
            .catch((err) => console.error('API 에러: ', err));
            
        const a = Math.floor(Math.random() * 10);
        const createList = movies.slice(a, a+3).map((movie) => {
          function titlelimit(title){
            if(title.length>12){
              return title = title.substr(0,12) + '...';
            } else{
              return title;
            }
          }
            const imageUrl = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
            return `<li class="event-li hover:scale-[1.1] transition duration-500" data-id="${movie.id}">
                 <div class="poster shadow-[10px_1px_11px_-5px_rgba(0,0,0,0.3)]" style="background-image: url(${imageUrl});"></div>
                 <h3 class="poster-title dark:text-white">${titlelimit(movie.title)}</h3>
                </li>`;
        });
        
        document.querySelectorAll('.card-list')[position].innerHTML = createList;

        document.querySelectorAll('.card-list')[0].addEventListener('click', (event) => {
            movieApi.getDetail(event.target.parentNode.dataset.id);
        });

        document.querySelectorAll('.card-list')[1].addEventListener('click', (event) => {
            movieApi.getDetail(event.target.parentNode.dataset.id);
        });
    },
    /** function getDetail
     * 카드를 클릭했을 때 우측 화면에 detail 값들을 렌더링 해주는 함수
     * @param {*} movieId 내재되어있던 ID 값
     */
    getDetail: async (movieId) => {
        let movieTitle;
        let content;
        let rating;
        let backBgPath;
        let posterBgPath;

        await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko&region=KR`)
            .then((res) => res.json())
            .then(({ title, overview, vote_average, poster_path, backdrop_path }) => {
                movieTitle = title;
                content = overview;
                rating = vote_average;
                posterBgPath = BASE_IMG_URL + poster_path;
                backBgPath = BASE_IMG_URL + backdrop_path;
            })
            .catch((err) => console.error(err));

        // 배경 이미지 html 설계 오류 - 수정 필요
        // <div class="rt-poster-container" style="background-image: url(${backBgPath})"></div>
        /** function contentlimit
         * @param {*} content 길이를 제한하고자 하는 string 
         * @returns {string} 90자 이하의 string
         */
        function contentlimit(content){
          if(content.length>90){
            return content = content.substr(0,90) + '...';
          } else{
            return content
          }
        }
        function titlelimit(title){
          if(title.length>12){
            return title = title.substr(0,12) + '...';
          } else{
            return title;
          }
        }
        const template = `<div class="container-rt-child" style="background-image: url(${backBgPath})">
        <div class="container-rt-blur">
          <div class="rt-poster-container">
            <div class="rt-poster" style="background-image: url(${posterBgPath})"></div>
            <div class="rt-poster-detail">
              <div class="rt-poster-detail__title">
                <p>${titlelimit(movieTitle)}</p>
              </div>
              <div class="rt-poster-detail__description">
                <p>
                  ${contentlimit(content)}
                </p>
              </div>
              <div class="rt-poster-detail-plus">
                <div class="rt-poster-detail-plus__star">
                  <i class="fa-solid fa-star fa-xs"></i> ${rating.toFixed(1)}/10
                </div>
                <div class="rt-poster-detail-plus__distribution">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;
        document.querySelector('.container-rt').innerHTML = template;
    }
};

