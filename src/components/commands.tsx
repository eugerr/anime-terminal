export default function Commands() {
  return (
    <div className='flex flex-col'>
      <p>Press Esc to go back.</p>
      <div className='flex gap-x-2 md:gap-x-5 mt-10'>
        <p className='text-green-500'>help</p>-<p>check available commands</p>
      </div>
      <div className='flex gap-x-2 md:gap-x-5'>
        <p className='text-green-500'>popular</p>-<p>fetch popular anime</p>
      </div>
      <div className='flex gap-x-2 md:gap-x-5'>
        <p className='text-green-500'>random</p>-<p>fetch random anime</p>
      </div>
    </div>
  )
}
