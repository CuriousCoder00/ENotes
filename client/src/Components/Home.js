import React from 'react'
import Notes from './Notes'
const Home = (props) => {
  return (
    <>
    <div className='container mt-3'>
      <Notes theme={props.theme}/>
    </div>
    </>
  )
}

export default Home
