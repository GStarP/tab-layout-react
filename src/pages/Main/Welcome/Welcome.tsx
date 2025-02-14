import { useEffect } from 'react'
import { useSearchParamsSafe } from '../../../components/tab-layout'

export default function Welcome() {
  useEffect(() => {
    console.log('Welcome Mount')
    return () => {
      console.log('Welcome Unmount')
    }
  }, [])

  const searchParams = useSearchParamsSafe()
  const data = searchParams.get('data')

  return (
    <div className="overflow-y-auto h-screen">
      <h2>Welcome</h2>
      <input className="border"></input>
      <div>Data: {data}</div>
      <div className="h-[1000px]"></div>
    </div>
  )
}
