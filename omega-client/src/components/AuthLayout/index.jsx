import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <div className='grid lg:grid-cols-2 grid-cols-1'>
      <section className='bg-[#012966]'>{children}</section>
      <section className='hidden lg:block'>
        <div className='sectionBg'></div>
      </section>
    </div>
  )
}

export default AuthLayout
