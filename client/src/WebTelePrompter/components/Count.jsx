import React, { useEffect, useState } from 'react'
import useInterval from 'beautiful-react-hooks/useInterval';
const Count = ({ currentStoryNumber }) => {
  const [count, setCount] = useState(0)
  useInterval(() => {
    setCount(val => val + 1)
  }, 1000);
  useEffect(() => {
    setCount(0);
  }, [currentStoryNumber])
  return (
    <div style={{ color: 'black', backgroundColor: 'white', minWidth: 50, textAlign: 'center' }}>
      {count}
    </div>
  )
}
export default Count
