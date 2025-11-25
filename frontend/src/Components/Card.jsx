import React from 'react'

const Card = (props) => {
  return (
    <div className='bg-white p-7 text-center space-y-2 inline-block rounded cursor-pointer w-90 hover:border-2 border-blue-600 '>
      <h1 className='text-2xl font-bold'>{props.user}</h1>
      <h2 className='text-lg'>{props.name}</h2>
    </div>
  )
}

export default Card
