import toast from 'react-hot-toast'

export default function Home() {
  const notify = () => toast.success('Here is your toast.')
  return (
    <>
      <button onClick={notify}>Make me a toast</button>
      <p className='text-lg text-red-700 font-extrabold'>HELLO</p>
    </>
  )
}
