import React, { useState } from 'react'
import AuthLayout from '../../../components/AuthLayout'
import Button from '../../../components/Button'
import TextField from '../../../components/TextField'
import Modal from '../../../components/Modal/modal'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <AuthLayout>
      <section className='mt-8  justify-center items-center px-28'>
        <div className='cursor-pointer' onClick={() => console.log('clicked')}>
          <img src='/assets/auth/backIcon.svg' alt='' />
        </div>
        <div>
          <h3 className=' mt-2 lg:text-4xl text-white text-center text-[1.5rem] leading-4'>
            Create an account
          </h3>
          <p className='my-2 text-center text-[#e5e5e5df] text-base font-normal'>
            Sign up to get an account
          </p>
          <p className='my-5 mb-10 text-center text-[#e5e5e5df] text-base font-normal'>
            Already have an account?
            <span className='font-bold text-white ml-2'>
              <Link to='/login'>Log in</Link>
            </span>
          </p>

          <div className='text-white'>
            <div className='mb-6'>
              <TextField placeholder='Name:' />
            </div>
            <div className='mb-6'>
              <TextField placeholder='Email Address:' />
            </div>
            <div className='mb-6'>
              <TextField placeholder='Password:' />
            </div>
            <div className='mb-6'>
              <TextField placeholder='Confirm Password:' />
            </div>
          </div>

          <div>
            <Button
              className='text-[#012966] mt-5 bg-white'
              onClick={() => console.log('clicked')}
              label='Sign Up'
            />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <section className='w-[500px] bg-white p-16 flex flex-col items-center justify-center'>
                <div className='mb-5'>
                  <img src='/assets/auth/modalImage.svg' alt='' />
                </div>
                <p className='text-black text-center mb-5'>
                  You now have an account, please go ahead to Log into your
                  account
                </p>
                <Button
                  className='text-white bg-[#0267FF] w-64'
                  label='Log In'
                  onClick={() => console.log('clicked')}
                />
              </section>
            </Modal>
          </div>

          <div className='grid grid-cols-3 mt-7 items-center'>
            <hr className='border-[#013E99]' />
            <p className='text-center text-[#e5e5e5df]'>Or continue with</p>
            <hr className='border-[#013E99]' />
          </div>

          <div className='grid grid-cols-3 mt-7 items-center justify-items-center'>
            <img src='/assets/auth/email.svg' alt='' />
            <img src='/assets/auth/google.svg' alt='' />
            <img src='/assets/auth/apple-icon.svg' alt='' />
          </div>
        </div>
      </section>
    </AuthLayout>
  )
}

export default SignUp
