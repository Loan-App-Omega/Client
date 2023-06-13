import React, { useEffect, useContext, useState } from "react";
import DashHeader from "../../../components/Dashboard/DashHeader";
import Sidebar from "../../../components/Dashboard/Sidebar";
import LoanCard from "../../../components/Dashboard/LoanCard";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Donut from "./Donut";
import Graph from "./Graph";
import { Context } from "../../../context/Context";
import axios from "axios";
Chart.register(CategoryScale);

const Dashboard = () => {
   const { user } = useContext(Context);
   const [loanData, setLoanData] = useState([])
   const [loansSuccessful, setLoansSuccessful] = useState([])
    const [loansDeclined, setLoansDeclined] = useState([]);
    const [monthlyData, setMonthlyData] = useState({
      January: {
        generated: "",
        successful: "",
        declined: "",
      },
      February: {
        generated: "",
        successful: "",
        declined: "",
      },
      March: {
        generated: "",
        successful: "",
        declined: "",
      },
      April: {
        generated: "",
        successful: "",
        declined: "",
      },
      May: {
        generated: "",
        successful: "",
        declined: "",
      },
      June: {
        generated: "",
        successful: "",
        declined: "",
      },
      July: {
        generated: "",
        successful: "",
        declined: "",
      },
      August: {
        generated: "",
        successful: "",
        declined: "",
      },
      September: {
        generated: "",
        successful: "",
        declined: "",
      },
      October: {
        generated: "",
        successful: "",
        declined: "",
      },
      November: {
        generated: "",
        successful: "",
        declined: "",
      },
      December: {
        generated: "",
        successful: "",
        declined: "",
      },
    });

  const status =[
    "generated",
    "successful",
    "declined"
  ]

 
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

    useEffect(() => {
    console.log(monthlyData);
  }, [monthlyData]);

  const datasets = status.map((status) => {
    const data = labels.map(
      (month) => monthlyData[month][status.toLowerCase()]
    );
    const backgroundColor =
      status === "generated"
        ? "#3585FF"
        : status === "successful"
        ? "#4ED273"
        : "#FF2727";
    return {
      label: status,
      data: data,
      backgroundColor: backgroundColor,
      borderWidth: 1,
      borderRadius: 6,
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Loan Monthly Frequency",
        align: "start",
        color: "#1A1A1A",
        font: {
          size: 20,
          weight: 500,
        },
        padding:30,
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 50,
        },
        align: "end",
      },
    },
    indexAxis: "x",
    barPercentage: 1.2,
    categoryPercentage: 0.6,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  useEffect(()=> {
    const handleSubmit = async () => {
      const loans = axios.create({
        baseURL: `https://nodebtdev.onrender.com/api`,
      });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        };
        const response = await loans.get(
          `/loans/company-loans`,
          config
        );
        console.log(response.data);
        console.log(response.data.data.loans)
        const loansList = response.data.data.loans
        setLoanData(loansList)
         const declinedLoansCount = loansList.filter(
           (loan) => loan.eligibility === false
         ).length;
         setLoansDeclined(declinedLoansCount);

         // Count the number of successful loans
         const successfulLoansCount = loansList.filter(
           (loan) => loan.eligibility === true
         ).length;
         setLoansSuccessful(successfulLoansCount);


          const updatedMonthlyData = {
            January: { generated: 0, successful: 0, declined: 0 },
            February: { generated: 0, successful: 0, declined: 0 },
            March: { generated: 0, successful: 0, declined: 0 },
            April: { generated: 0, successful: 0, declined: 0 },
            May: { generated: 0, successful: 0, declined: 0 },
            June: { generated: 0, successful: 0, declined: 0 },
            July: { generated: 0, successful: 0, declined: 0 },
            August: { generated: 0, successful: 0, declined: 0 },
            September: { generated: 0, successful: 0, declined: 0 },
            October: { generated: 0, successful: 0, declined: 0 },
            November: { generated: 0, successful: 0, declined: 0 },
            December: { generated: 0, successful: 0, declined: 0 },
          };

          loansList.forEach((loan) => {
            const createdAt = new Date(loan.createdAt);
            const month = createdAt.toLocaleString("en-US", { month: "long" });
            console.log(month)

            updatedMonthlyData[month].generated += 1;

            if (loan.eligibility === true) {
              updatedMonthlyData[month].successful += 1;
            } else {
              updatedMonthlyData[month].declined += 1;
            }
            
          });
          console.log(updatedMonthlyData)

          setMonthlyData(updatedMonthlyData);
           


        
      } catch (error) {
        console.log(error);
      }
    }; handleSubmit()
      console.log(monthlyData);

  }, [])

  useEffect(() => {
    console.log(monthlyData);
    localStorage.setItem("monthlyData", JSON.stringify(monthlyData));
         
  }, [monthlyData]);

   

  return (
    <div className="flex flex-col">
      <DashHeader />
      <div className="flex gap-8 relative">
        <Sidebar />
        <div className=" max-w-[calc(100% - 323px)] lg:pt-[40px] lg:pl-[49px] absolute top-[112px] left-[300px]">
          <div className="mb-[24px] text-[24px] font-[600] text-[#0267FF]">
            Dashboard
          </div>
          <div className="text-[#4D4D4D] text-[20px] font-[500]">Analysis</div>
          <div className="flex flex-wrap gap-[17px]">
            <Link to="/loan-applications">
              {" "}
              <LoanCard
                status="generated"
                amount={loanData.length}
                percent="2.15%"
              />
            </Link>
            <Link to="/loans-successful">
              {" "}
              <LoanCard
                status="successful"
                amount={loansSuccessful}
                percent="2.15%"
              />
            </Link>
            <Link to="/loans-declined">
              {" "}
              <LoanCard
                status={"declined"}
                amount={loansDeclined}
                percent="2.15%"
              />
            </Link>
          </div>
          <div className="flex items-center w-[890px] bg-[#F9F9F96B] border border-[#E6F0FF] pl-[55px] mt-[91px]  pt-[12px] pb-[35px] mb-[92px]">
            <div className="w-[790px]">
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="flex gap-[31px] mb-12 w-[890px]">
            <div className="w-[575px] h-[318px] border py-[20px] border-[#E6F0FF]">
              <Graph monthlyData={monthlyData} />
            </div>
            <div className=" flex border border-[#E6F0FF] py-[40px] items-center justify-center w-[300px] h-[318px] bg-[#FAFCFF] relative">
              <div className="flex flex-col items-center justify-center absolute top-[85px] left-[118px]">
                <div className="font-[600] text-[24px] text-[#0267FF]">85%</div>
                <div className="font-[400] text-[16px] text-[#808080]">
                  Positive
                </div>
              </div>
              <Donut successful={loansSuccessful} declined={loansDeclined} generated={loanData.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
