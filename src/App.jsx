import { useState, useCallback, useEffect , useRef} from 'react'
import './App.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [finalPWD, setFinalPWD] = useState('');

const pwdRef = useRef(null);

const generatePassword = useCallback( () =>{
  let password = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYSabcdefghijklmnopqrstuvwxyz' ; 
  if(numbers) {
    str+='0123456789';
  }
  if(characters){
    str+='*&#{}[]()';
  }

  let len = length;
  for(let i=1 ; i<=len; i++){
    const charNo = Math.floor(Math.random() * str.length);
    password += str.charAt(charNo); 
  }
  setFinalPWD(password);
},[numbers, characters, length])

useEffect(()=>{
   generatePassword();
},[length,numbers,characters])

const copyPwdAct = () => {
  window.navigator.clipboard.writeText(finalPWD);
  toast.success("Copied Successfully")
  pwdRef.current?.select();
}

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
            value={finalPWD}
            className='outline-none w-full py-1 px-3'
            placeholder='password...'
            readOnly
            ref={pwdRef}
          ></input>
          <button className='outline-none bg-blue-700 text-white px-3
py-0.5 shrink-0 ' 
onClick={copyPwdAct}
>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numbers}
              onChange={() => {
                setNumbers((prev) => !prev)
              }} />
            <label htmlFor="number">Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={characters}
              onChange={() => {
                setCharacters((prev) => !prev)
              }}
              name="" id="" />
            <label htmlFor="characters">Characters</label>
          </div>

        </div>
      </div>
      < ToastContainer />
    </>
  )
}

export default App
