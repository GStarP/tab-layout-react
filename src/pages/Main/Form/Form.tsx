import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export default function Form() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    console.log('Form Mount')
    return () => {
      console.log('Form Unmount')
    }
  }, [])

  return (
    <div>
      <h1>Form</h1>
      <input className="border"></input>
      <div>Key: {searchParams.get('key')}</div>
    </div>
  )
}
