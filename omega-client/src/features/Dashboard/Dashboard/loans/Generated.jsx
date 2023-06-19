import React, { useContext, useEffect, useState } from 'react'
import DashHeader from '../../../../components/Dashboard/DashHeader'
import Sidebar from '../../../../components/Dashboard/Sidebar'
import { TfiAngleDown } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import { Context } from '../../../../context/Context'
import axios from 'axios'
import { endMarkedContent } from 'pdf-lib'

const Generated = () => {
  const [loansSuccessful, setLoansSuccessful] = useState([])
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [datesOrder, setDatesOrder] = useState('ascending')

  function padZerosWithCommas(number) {
    if (typeof number !== 'number') {
      return ''
    }

    const formattedNumber = number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return formattedNumber
  }

  useEffect(() => {
    const getSuccessfulLoans = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
        const response = await axios.get(`/loans/company-loans`, config)
        console.log(response.data)
        console.log(response.data.data.loans)
        const loansList = response.data.data.loans

        const successfulLoans = loansList.filter(
          (loan) => loan.eligibility === true
        )

        setLoansSuccessful(successfulLoans)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    getSuccessfulLoans()
  }, [user, user?.access_token])

  const handleAscendingDates = () => {
    let newLoanList = []
    loansSuccessful.forEach((loan) => {
      newLoanList.push({ ...loan, createdAt: new Date(loan.createdAt) })
    })
    console.log(newLoanList)
    const sortedDates = newLoanList.sort(
      (a, b) => Number(a.createdAt) - Number(b.createdAt)
    )
    console.log(sortedDates)
    setLoansSuccessful(sortedDates)
  }

  const handleDescendingDates = () => {
    let newLoanList = []
    loansSuccessful.forEach((loan) => {
      newLoanList.push({ ...loan, createdAt: new Date(loan.createdAt) })
    })
    console.log(newLoanList)
    const sortedDates = newLoanList.sort(
      (a, b) => Number(b.createdAt) - Number(a.createdAt)
    )
    console.log(sortedDates)
    setLoansSuccessful(sortedDates)
  }

  const handleDatesOrder = (e) => {
    setDatesOrder(e.target.value)
    if (datesOrder === 'ascending') {
      handleDescendingDates()
    } else {
      handleAscendingDates()
    }
  }

  return (
    <div className='flex flex-col'>
      <DashHeader />
      <div className='flex relative'>
        <Sidebar />
        {loading === true ? (
          <div
            role='status'
            className=' flex mt-20 justify-center items-center absolute top-[212px] left-[750px]'
          >
            <svg
              aria-hidden='true'
              className='w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : loansSuccessful.length > 0 ? (
          <div className='flex flex-col lg:w-[938px] lg:h-[fit] absolute top-[112px] left-[300px] ml-[52px] '>
            <div className='flex gap-4 mt-[40px]'>
              <Link to='/dashboard'>
                <div className='text-[20px] font-[400] text-[#808080]'>
                  Dashboard
                </div>
              </Link>
              <i className='fa-solid fa-chevron-right mt-2'></i>
              <div className='text-[20px] font-[400] text-[#0267FF]'>
                Loans successful
              </div>
            </div>
            <div className='lg:w-[938px] lg:h-[fit] bg-[#FAFCFF] border border-[#CCE1FF]  mt-[40px] mb-16'>
              <div className='flex justify-between'>
                <div className='mt-5 p-5'>
                  <p className='font-[600] text-[20px] text-[#013E99] '>
                    Loans Successful
                  </p>
                  <p className='font-[500] text-[16px] text-[#04AB33] mt-5'>
                    Total Amount: {loansSuccessful?.length}
                  </p>
                </div>
                <div className='flex mt-10 p-10 mr-10 gap-2 items-center'>
                  <p className='text-[#0252CC]'>Sort by</p>
                  {/* <TfiAngleDown /> */}
                  <select
                    className='text-[#4D4D4D]'
                    onChange={handleDatesOrder}
                    value={datesOrder}
                  >
                    <option value='ascending'>Ascending</option>
                    <option value='descending'>Descending</option>
                  </select>
                </div>
              </div>
              <div>
                <div className='overflow-x-auto flex items-center justify-center mb-16'>
                  <table className='min-w-full table-fixed border-collapse'>
                    <thead>
                      <tr>
                        <th className='px-6 py-3 bg-[#E6F0FF] text-left font-[600] text-[#666666]'>
                          Borrower
                        </th>
                        <th className='px-6 py-3 bg-[#E6F0FF] text-left font-[600] text-[#666666]'>
                          Date
                        </th>
                        <th className='px-6 py-3 bg-[#E6F0FF] text-left font-[600] text-[#666666]'>
                          Status
                        </th>
                        <th className='px-6 py-3 bg-[#E6F0FF] text-left font-[600] text-[#666666]'>
                          Credit Score
                        </th>
                        <th className='px-6 py-3 bg-[#E6F0FF] text-left font-[600] text-[#666666]'>
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loansSuccessful.map((loan, index) => (
                        <tr
                          key={loan._id}
                          className={
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }
                        >
                          <td className='px-6 py-4 font-[600] text-[16px] text-[#666666]'>
                            {loan.fullname}
                          </td>
                          <td className='px-6 py-4 font-[600] text-[16px] text-[#666666]'>
                            {new Date(loan.createdAt).toLocaleDateString()}
                          </td>
                          <td className='px-6 py-4 font-[600] text-[16px] text-[#666666]'>
                            <span className={`text-[#04AB33]`}>Successful</span>
                          </td>
                          <td className='px-6 py-4 font-[600] text-[16px] text-[#666666]'>
                            {loan.creditScore}
                          </td>
                          <td className='px-6 py-4 font-[600] text-[16px] text-[#666666]'>
                            {padZerosWithCommas(loan.loanAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-[982px] justify-center items-center mt-24 font-normal relative top-[150px] left-[300px]">
            No loan applications to display, click
            <span>
              <Link className="text-blue-500" to="/borrower-data">
                &nbsp;here&nbsp;
              </Link>
            </span>
            to create a new loan application
          </div>
        )}
      </div>
    </div>
  )
}

export default Generated
