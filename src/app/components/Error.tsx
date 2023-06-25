interface ErrorProps {
  message: string
}

export const Error = (props: ErrorProps) => {
  return (
    <main className='flex justify-center items-center w-screen h-screen'>
      <div className='bg-slate-800 text-red-500 p-4 m-10 rounded-md'>
        {props.message}
      </div>
    </main>
  )
}
