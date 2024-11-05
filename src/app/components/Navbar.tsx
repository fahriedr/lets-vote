import React from 'react'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-40 bg-[#393E46] flex justify-center'>
        <div className='flex w-[70%] h-[4rem] items-center px-4 justify-between'>
            <div className='flex items-center truncate'>
                <a href='/' className='text-2xl font-bold'>Let's Vote</a>
                <div className='hidden lg:flex lg:ml-6 lg:space-x-8 font-bold items-center'>
                    <a href='/'>Create Polling</a>
                    <a href='/search'>Search Polling</a>
                    <a href='/about'>About</a>
                </div>
            </div>
            <div className='flex items-center gap-4'>
              <a href='/login' className='flex items-center font-semibold text-sm'>Login</a>
              <a href='/register' className='flex items-center bg-blue-500 px-4 py-2 rounded-md font-semibold text-sm'>Sign Up</a>
            </div>
        </div>
    </header>
  )
}

export default Navbar