import { useEffect, useRef } from 'react'
import { TabLayoutApiRef } from '../../../global'
import {
  useSearchParamsSafe,
  useTabReactive,
  useTabStatic,
} from '../../../components/tab-layout'

export default function Form() {
  useEffect(() => {
    console.log('Form Mount')
    return () => {
      console.log('Form Unmount')
    }
  }, [])

  const searchParams = useSearchParamsSafe()
  const data = searchParams.get('data')

  const { tab } = useTabReactive()
  useEffect(() => {
    TabLayoutApiRef.current?.updateTab(tab.key, {
      label: data ?? '(None)',
    })
  }, [tab.key, data])

  const inputElRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    TabLayoutApiRef.current?.updateTab(tab.key, {
      closeBlocker: async () => {
        if (inputElRef.current && inputElRef.current.value) {
          const ok = confirm('Input has value, sure to close?')
          return !ok
        }
        return false
      },
    })
  }, [tab.key])

  const { scope } = useTabStatic()

  return (
    <div>
      <h1>Form</h1>
      <input className="border" ref={inputElRef}></input>
      <div>Data: {data}</div>
      <button
        className="border p-2"
        onClick={() => {
          console.log(scope)
          scope.count++
          console.log(scope.count)
        }}
      >
        Add Counter
      </button>
    </div>
  )
}
