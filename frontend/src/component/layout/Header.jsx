import React, { Fragment, useState } from 'react'
import logo from '../../img/logo.svg'
import user from '../../img/user.png'
import { Link } from 'react-router-dom'
import { FaBars, FaCaretDown } from 'react-icons/fa6'
import './Header.css'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { convertFromPdf, convertToPdf } from '../../tools'

const Header = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleVisible = () => {
        setIsVisible(!isVisible)
    }
    return (
        <div className='header'>
            <Link to={"/"}><img src={logo} alt='app_logo' /></Link>
            <div className='menu'>
                <ul>
                    <li><Link to={"/merger_pdf"}>merge pdf</Link></li>
                    <li><Link to={"/split_pdf"}>split pdf</Link></li>
                    <li><Link to={"/compress_pdf"}>compress pdf</Link></li>
                    <li className='has-dropdown' onMouseEnter={handleVisible}>
                        <span className='active link_title'>convert pdf <FaCaretDown /></span>
                        {
                            isVisible &&
                            (
                                <Fragment>
                                    <div className="shape"></div>
                                    <div className="dropdown" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
                                        <ul>
                                            <li><div className='nav_title'>convert to pdf</div></li>
                                            {
                                                convertToPdf &&
                                                convertToPdf.map((item, index) => (
                                                    <li key={index}><Link to={`/${item.to}`}>{item.svg}{item.title}</Link></li>
                                                ))
                                            }
                                        </ul>
                                        <ul>
                                            <li><div className='nav_title'>convert from pdf</div></li>
                                            {
                                                convertFromPdf &&
                                                convertFromPdf.map((item, index) => (
                                                    <li key={index}><Link to={`/${item.to}`}>{item.svg}{item.title}</Link></li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </Fragment>
                            )
                        }
                    </li>
                </ul>
            </div>
            <div className="user_account">
                <img src={user} alt='user logo' />
                <FaBars />
            </div>
        </div>
    )
}

export default Header