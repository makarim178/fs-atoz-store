import type { RangeInputComponentPropsType } from "@/types/props"
import { useEffect, useState } from "react"
import type { ChangeEvent } from 'react'

export const RangeInputComponent = ({ id, value, getMaxValue, maxValue, title, getValue }: RangeInputComponentPropsType) => {
  const [inputVal, setInputVal] = useState<string>('')

  useEffect(() => {
    setInputVal(value.toString())
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNumbersRegex = /[^0-9]/g
    let val = e.target.value.replace(onlyNumbersRegex, '')
    if (val.length > 1 && val.charAt(0) == '0' ) val = val.substring(1)
    if (getMaxValue) {
        if (+val < maxValue) val = (maxValue + 1).toString()
    } else {
        if (+val >= maxValue) val = (maxValue - 1).toString() 
    }
    setInputVal(val)
    getValue(+val)
  }


  return (
    <>
      <label htmlFor={id} className="title-text-theme text-xs">{ title }</label>
      <input 
        id={id} 
        className='focus:outline-none input-text-theme input-color-theme p-2 rounded-md w-full' 
        type="number" 
        placeholder='0' 
        value={inputVal}
        onChange={handleChange}
      />
        
    </>
  )
}