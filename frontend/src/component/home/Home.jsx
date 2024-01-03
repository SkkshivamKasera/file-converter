import React from 'react'
import Card from '../card/Card'
import './Home.css'
import { tools } from '../../tools'

const Home = () => {

  const array = [
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
    {
      title: "Merge Pdf",
      desc: "Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
    },
  ]
  return (
    <div className='home'>
        <div className="text_content">
          <h1>Every tool you need to work with PDFs in one place</h1>
          <p>Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
        </div>
        <div className="gridy_area">
          {
            tools && 
            tools.map((item, index) => (
              <Card key={index} title={item.title} desc={item.desc} svg={item.svg} to={item.to} />
            ))
          }
      </div>
    </div>
  )
}

export default Home
