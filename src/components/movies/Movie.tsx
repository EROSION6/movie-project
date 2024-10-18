import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import '@splidejs/react-splide/css/sea-green'
import { useEffect } from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
	getDramaMovies,
	getFamilyMovies,
	getNewMovies,
	getPopularMovies,
	getSciFiMovies,
} from '../../store/movieSlice'
import { MovieCard } from '../movie-card/MovieCard'
import './swiper.css'

export const Movie = () => {
	const dispatch = useAppDispatch()
	const { popularMovies, familyMovies, newMovies, dramaMovies, sciFiMovies } =
		useAppSelector(state => state.movie)

	useEffect(() => {
		dispatch(getPopularMovies())
		dispatch(getFamilyMovies())
		dispatch(getNewMovies())
		dispatch(getDramaMovies())
		dispatch(getSciFiMovies())
	}, [dispatch])

	const moviesCatalog = [
		{ title: 'Популярные фильмы', movies: popularMovies },
		{ title: 'Смотрим всей семьей', movies: familyMovies },
		{ title: 'Топ фильмы', movies: newMovies },
		{ title: 'Новые фильмы', movies: dramaMovies },
		{ title: 'Фантастика', movies: sciFiMovies },
	]

	return (
		<>
			{moviesCatalog.map((movieCatalog, index) => (
				<div className='w-full overflow-hidden pl-[13%] xl:pl-4' key={index}>
					<div className='flex items-center gap-3 mb-3'>
						<h2 className='text-white text-2xl font-bold transition-opacity duration-300 hover:opacity-70'>
							{movieCatalog.title}
						</h2>
						<button className='focus:outline-none transition-opacity duration-300 hover:opacity-70'>
							<FaChevronRight color='white' size={15} />
						</button>
					</div>
					<div className='w-full'>
						<Splide
							options={{ type: 'loop', perPage: 7, focus: 'left', gap: '30px' }}
						>
							{movieCatalog.movies && movieCatalog.movies.length > 0 ? (
								movieCatalog.movies.map(movie => (
									<SplideSlide key={movie.id} className='my-5 pr-60 resp_swipe'>
										<MovieCard {...movie} />
									</SplideSlide>
								))
							) : (
								<div className='text-white'>Нет доступных фильмов.</div>
							)}
						</Splide>
					</div>
				</div>
			))}
		</>
	)
}
