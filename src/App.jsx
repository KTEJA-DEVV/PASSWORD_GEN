import React, { useCallback, useEffect, useState, useRef } from 'react'

const App = () => {
  const [Length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [Password, setPassword] = useState('')
  const [regen, setRegen] = useState(false)
  const passRef = useRef(null)

  const passwordhandle = useCallback(() => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllow) characters += '0123456789'
    if (charAllow) characters += '/\\@!$%&?'

    let pass = ''
    for (let i = 0; i < Length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length)
      pass += characters.charAt(randomIndex)
    }

    setPassword(pass)
  }, [Length, numAllow, charAllow])

  useEffect(() => {
    passwordhandle()
  }, [Length, numAllow, charAllow, passwordhandle, regen])

  const copyHandler = () => {
    navigator.clipboard.writeText(Password)
    passRef.current?.focus()
    passRef.current?.select()

  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='h-auto max-w-md bg-gray-300 p-5 rounded shadow-md '>
        <input
          type='text'
          value={Password}
          readOnly
          className='w-full p-2 mb-3 rounded outline-1  '
          ref={passRef}
        />
        <div className='flex items-center mb-3'>
          <input
            type='range'
            min={5}
            max={24}
            value={Length}
            onChange={(e) => setLength(Number(e.target.value))}
            className='mr-3'
          />
          <label className='text-sm font-medium'>Length: {Length}</label>
        </div>
        <div className='flex items-center justify-between mb-2'>
          <label className='mr-2'>Include Numbers</label>
          <input
            type='checkbox'
            checked={numAllow}
            onChange={() => setNumAllow((prev) => !prev)}
          />
        </div>
        <div className='flex items-center justify-between mb-4'>
          <label className='mr-2'>Include Special Characters</label>
          <input
            type='checkbox'
            checked={charAllow}
            onChange={() => setCharAllow((prev) => !prev)}
          />
        </div>
        <div className='flex gap-2'>
          <button
            onClick={copyHandler}

            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full cursor-pointer'
          >
            Copy
          </button>
          <button onClick={() => setRegen((prev) => (!prev))}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full cursor-pointer'
          >Regenrate</button>
        </div>
      </div>
    </div>
  )
}

export default App
