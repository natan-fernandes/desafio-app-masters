import Image from 'next/image';
import LoadingSpinner from '../../../public/loading-spinner.svg';

export const Spinner = () => {
  return (
    <div className='w-full flex justify-center items-center mt-2'>
      <Image
        priority
        src={LoadingSpinner}
        alt='Loading'
        className='w-10 animate-spin text-white'
      />
    </div>
  );
};
