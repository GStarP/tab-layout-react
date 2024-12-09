import { useEffect } from 'react'

export default function Welcome() {
  useEffect(() => {
    console.log('Welcome Mount')
    return () => {
      console.log('Welcome Unmount')
    }
  }, [])

  return (
    <div>
      <h2>Welcome</h2>
      <input className="border"></input>
    </div>
  )
}
