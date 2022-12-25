import React from 'react'
import spinner from "./Rocket.gif"

const Loading = ()=> {
    return (
      <div className='text-center'>
        <img src={spinner} alt="Loading"/>
      </div>
    )
}
export default Loading;
