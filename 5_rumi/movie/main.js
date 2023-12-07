// 메인
import { movieApi } from "./api/movieApi.js";

movieApi.getMovies('popular', 0);
movieApi.getMovies('upcoming', 1);