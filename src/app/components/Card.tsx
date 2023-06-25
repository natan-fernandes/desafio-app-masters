import { Game } from '@/types/game';
import Image from 'next/image';

interface CardProps {
  game: Game
}

export const Card = (props: CardProps) => {
  const getReleaseDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  const game = props.game;
  return (
    <section className='flex flex-col justify-center bg-slate-200 w-full rounded-lg p-3 text-slate-800 hover:scale-105 transition-all'>
      <a 
        className='relative w-full'
        href={game.game_url}
        target='_blank'
        rel='noreferrer noopener'
      >
        <Image 
          src={game.thumbnail}
          alt={game.short_description}
          loading='lazy'
          width={256}
          height={144}
          className='rounded-lg w-full ring-1 ring-slate-500'
        />
        <div className='absolute bottom-0 p-5 rounded-md bg-gradient-to-t from-slate-950 w-full'>
          <h1 className='font-black text-3xl text-slate-200'>
            {game.title}
          </h1>
        </div>
      </a>
      <a 
        className='mt-2 font-medium px-1'
        href={game.game_url}
        target='_blank'
        rel='noreferrer noopener'
      >
        {game.short_description}
      </a>
      <div className='flex flex-col text-sm mt-1 mb-3 px-1'>
        <span>Publisher: {game.publisher}</span>
        <span>Developer: {game.developer}</span>
      </div>
      <div className='flex 2xl:flex-row flex-col justify-end items-end w-full gap-2 mt-auto px-1'>
        <span className='xl:mr-auto'>
          Release date: {getReleaseDate(game.release_date)}
        </span>
        <span className='bg-green-500 p-1 text-xs rounded-md whitespace-nowrap'>
          {game.genre}
        </span>
        <span className='bg-yellow-500 p-1 text-xs rounded-md whitespace-nowrap'>
          {game.platform}
        </span>
      </div>
    </section>
  );
};
