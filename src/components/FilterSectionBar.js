import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BasicSelect = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className='selectItem'>Views</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Views"
          onChange={handleChange}
        >
          <MenuItem value={10} className='selectItem'>Daily</MenuItem>
          <MenuItem value={20} className='selectItem'>Weekly</MenuItem>
          <MenuItem value={30} className='selectItem'>Monthly</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const FilterSectionBar = () => {
  const [query, setQuery] = useState('Kanpur');
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=a5a49b8519ef4ea6846155236241605&q=${query}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className='main-content'>
      <div className='dayFilter'>
        <div>
          <BasicSelect />
        </div>
        <div>
          <p>Total earning : <span className='spanO'>$57.36</span></p>
        </div>
        <div>
          <p>Total Spend : <span className='spanL'>$26.5</span></p>
        </div>
        <div>
          <p>Total Post : <span className='spanO'>72</span></p>
        </div>

      </div>
      <div className='dayFilter inputF'>
        <input type='text' placeholder='search any country or city....' onChange={handleChange} value={query} autoFocus />
      </div>
      <div className='dayFilter2'>
        <div className='d1'>
          <div className='box'>
            <h1>{weatherData?.location?.country}</h1>
            <p>{weatherData?.location?.name}</p>
          </div>
          <div className='box'>
            <h1>Temp_c</h1>
            <p>{weatherData?.current?.temp_c}°C</p>
          </div>
          <div className='box'>
            <h1>Temp_f</h1>
            <p>{weatherData?.current?.temp_f}°F</p>
          </div>
          <div className='box'>
            <h1>Condition</h1>
            <p>{weatherData?.current?.condition?.text} <span><img src={weatherData?.current?.condition?.icon} alt='img' /></span></p>
          </div>
          <div className='box'>
            <h1>Wind Direction</h1>
            <p>{weatherData?.current?.wind_dir}</p>
          </div>
          <div className='box'>
            <h1>Wind Speed</h1>
            <p>{weatherData?.current?.wind_kph} kph</p>
          </div>

        </div>
        <div className='d2'>
          <h1>More Information</h1>
          <div className='d2Info'>
           
            <div className='div1'></div>
            <p>Gust_kph:</p>
            <p>{weatherData?.current?.gust_kph}</p>
          </div>
          <div className='d2Info'>
           
            <div className='div2'></div>
            <p>Gust_Mph:</p>
            <p>{weatherData?.current?.gust_mph}</p>
          </div>
          <div className='d2Info'>
            
            <div className='div3'></div>
            <p>Pressure_in:</p>
            <p>{weatherData?.current?.pressure_in}</p>
          </div>
          <div className='d2Info'>
            
            <div className='div4'></div>
            <p>Pressure_mb:</p>
            <p>{weatherData?.current?.pressure_mb}</p>
          </div>
          <div className='d2Info'>
            
            <div className='div5'></div>
            <p>Feelslike_c:</p>
            <p>{weatherData?.current?.feelslike_c}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FilterSectionBar