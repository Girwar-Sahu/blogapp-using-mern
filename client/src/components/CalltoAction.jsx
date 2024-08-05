import { Button } from 'flowbite-react';
import React from 'react'

function CalltoAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
         <h2 className='text-2xl '>Want to learn more about JavaScript ?</h2>
         <p className='text-gray-500 my-2'>Checkout these resources with 100 JavaScript projects</p>
         <Button className='rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-none' gradientDuoTone="purpleToPink"><a href="#">100 JS Projects</a></Button>
      </div>
      <div className='flex-1'>
        <img
        className='p-7'
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
        />
      </div>
    </div>
  );
}

export default CalltoAction