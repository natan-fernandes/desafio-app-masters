'use client'

import { Game } from '@/types/game';
import { useEffect, useState } from 'react'
import { Card } from './components/Card';
import { Error } from './components/Error';
import { Spinner } from './components/Spinner';
import { gameApi } from './axios';

const FAULTY_CODES = [500, 502, 503, 504, 507, 508, 509]

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [selectedGender, setSelectedGender] = useState<string | undefined>('Todos');

  const getFilteredGames = () => {
    return games.filter(game => (!filter || game.title.toLowerCase().includes(filter.toLowerCase())) &&
                                (selectedGender === 'Todos' || game.genre === selectedGender));
  }

  const getAllGenres = () => {
    const allGenres = games.map(game => game.genre);
    const distinctGenres = allGenres.filter((value, index, array) => array.indexOf(value) === index);
    return ['Todos', ...distinctGenres];
  }

  useEffect(() => {
    gameApi.get('/data').then(res => {
      const games = res.data as Game[];
      setGames(games);
    }).catch(err => {
      console.log(err)
      if (err.code === 'ECONNABORTED') {
        setError('O servidor demorou para responder, tente mais tarde.');
      } else if (FAULTY_CODES.includes(err.response.status)) {
        setError('O servidor falhou em responder, tente recarregar a página');
      } else {
        setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
      }
    });
  }, []);

  if (error) {
    return <Error message={error} />
  }

  return (
    <main className='flex flex-col min-h-screen'>
      <div className='w-full flex flex-col items-center justify-center mb-5 p-5 text-lg'>
        <h1 className='text-lime-400 font-bold'>
          Coleção muito doida de jogos
        </h1>
        {
          games.length > 0 && 
            <input
              className='mt-2 bg-transparent px-2 appearance-none focus:border-transparent focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-md'
              placeholder='Pesquisar...'
              onChange={(e) => setFilter(e.target.value)}
            />
        }
        <div className='w-full flex items-center justify-center gap-2 text-sm mt-5 flex-wrap'>
        {
          games.length > 0 && getAllGenres().map(genre => 
            <span 
              key={genre}
              className={`cursor-pointer bg-lime-400 text-slate-900 p-1 rounded-md ${selectedGender === genre && 'font-bold text-lg'}`}
              onClick={() => setSelectedGender(genre)}
            >
              {genre}
            </span>
          )
        }
        </div>
      </div>
      <div className='xl:px-60 md:px-10 px-4 py-4'>
        {
          games.length > 0 && (
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5 h-fit'>
              {
                getFilteredGames().map((game, idx) => 
                  <Card 
                    key={idx}
                    game={game}
                  />
                )
              }
            </div>
          )
        }
        {
          games.length === 0 && <Spinner/>
        }
      </div>
    </main>
  )
}
