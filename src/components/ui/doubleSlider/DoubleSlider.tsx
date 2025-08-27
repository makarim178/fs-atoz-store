import { PRICE_RANGE } from '@/constants/globalConstants';
import { useProductContext } from '@/providers/ProductsContext';
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useState } from 'react';

function valueText(value: number) {
  return `$${value}`
}

export const DoubleSlider = () => {
    const {searchQuery, setSearchQuery} = useProductContext()
    const [value, setValue] = useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number[]) => {
      setValue(newValue);
      setSearchQuery({...searchQuery, minPrice: newValue[0], maxPrice: newValue[1]})
    };

    return (
      <div className='flex flex-col w-full justify-center content-center my-4'>
          <div>
              <span>Price range: </span>
              <span>{`$${value[0]} - $${value[1]}`}</span>
          </div>
          <div className='flex justify-center content-center w-full'>
              <Box sx={{ width: 300 }}>
              <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  max={PRICE_RANGE.MAX}
                  getAriaValueText={valueText}
              />
              </Box>
          </div>
      </div>
    )
}