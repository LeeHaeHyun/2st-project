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
 /** @function getMovies
   * @param {path} path 받아오고자 하는 영화의 종류
   * @param {position} position 카드리리스트 배열의 위치
   */
 getMovies: async (path, position) => {
  let movies = [];

  await fetch(`${BASE_URL}/movie/${path}?api_key=${API_KEY}&language=ko`)
      .then((res) => res.json())
      .then((data) => movies = data.results)
      .catch((err) => console.error('API 에러: ', err));

  const createList = movies.slice(0, 3).map((movie) => {

      const imageUrl = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
      return `<li class="event-li hover:scale-[1.15] transition duration-700" data-id="${movie.id}">
           <div class="poster" style="background-image: url(${imageUrl});"></div>
           <h3 class="poster-title dark:text-white">${movie.title}</h3>
          </li>`;
  });

  document.querySelectorAll('.card-list')[position].innerHTML = createList;

  document.querySelectorAll('.card-list')[0].addEventListener('click', (event) => {
      movieApi.getDetail(event.target.parentNode.dataset.id);
  });

  document.querySelectorAll('.card-list')[1].addEventListener('click', (event) => {
      movieApi.getDetail(event.target.parentNode.dataset.id);
  });
}