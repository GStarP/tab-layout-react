import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import {
  useCloseBlocker,
  useTabLayoutContext,
} from '../../../components/tab-layout'

export default function Form() {
  const [searchParams] = useSearchParams()
  const key = searchParams.get('key')

  const { useTabLabel } = useTabLayoutContext()
  useTabLabel(key ?? undefined)

  useCloseBlocker(async () => {
    const ok = confirm('Are you sure to close current Page ?')
    return !ok
  })

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
      <div>Key: {}</div>
    </div>
  )
}
