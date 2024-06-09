export default function LoaderText({ text }: { text: string | undefined }) {
  if (!text) return null

  return (
    <div className='flex items-center'>
      <p>
        Fetching <span className='text-green-500'>{text}</span>
      </p>
      <div className='flex'>
        <div className='animate-bounce delay-100'>.</div>
        <div className='animate-bounce delay-200'>.</div>
        <div className='animate-bounce'>.</div>
      </div>
    </div>
  )
}
