import './SideBar.scss'
import React, { useState } from 'react'
import { Login } from '../../Page/auth/Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../../redux/action'
import { Cart } from './cart/Cart'
import { Search } from './search/search'


export const SideBar = (props) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let id = useSelector((state) => state.auth.login.userInfor?._id)
    let accessToken = useSelector((state => state.auth.login.userInfor?.accessToken))

    let handleLogOut = () => {
        logOutUser(id, accessToken, dispatch, navigate)
    }

    let { openMenuBar, handleOpenMenu,
        openCart, openSearch } = props
    let userName = useSelector((state => state.auth.login.userInfor?.userName))
    let [showSubKeyChain, setShowSubKeyChain] = useState(false)
    let [showSubBalo, setShowSubBalo] = useState(false)

    let handleCloseSideBar = () => {
        handleOpenMenu('close')
    }

    let handleShowSubItem = (id) => {
        if (id === 'keychain') {
            setShowSubKeyChain(!showSubKeyChain)
            setShowSubBalo(false)
        }
        if (id === 'balo') {
            setShowSubBalo(!showSubBalo)
            setShowSubKeyChain(false)
        }
    }
    let handleGoToLoginPage = () => {
        navigate('/login')
    }

    return (

        <>

            <div className="sidebar-container">
                <div onClick={() => handleCloseSideBar()} className={(openMenuBar || openCart || openSearch) ? "site-overlay" : ''}></div>
                <div className={(openMenuBar || openCart || openSearch) ? " sidebar-container-content sidebar-container-content-close" : "sidebar-container-content"}>
                    {openMenuBar === true && <div className="menu-container">
                        <div className="top-content">
                            {userName ? <div className='hi-user'>Wellcome {userName} !</div>
                                : <div onClick={() => handleGoToLoginPage()} className="mobile">
                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                    &nbsp; Đăng nhập
                                </div>
                            }
                            <div className='menu-block'>
                                <span className='menu-title'>Menu</span>
                                <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                            </div>

                        </div>
                        <div className="center-content">
                            <ul> <span>Móc khóa</span>  <i onClick={() => handleShowSubItem('keychain')}>< FontAwesomeIcon icon={showSubKeyChain === false ? faChevronDown : faChevronUp} /></i>
                                {showSubKeyChain === true ?
                                    <>  <li >Móc khóa nhựa dẻo</li>
                                        <li>Móc khóa inox</li>
                                        <li>Móc khóa mika</li>
                                    </> : ''}
                            </ul>
                            <ul> <span>Balo</span> <i onClick={() => handleShowSubItem('balo')}> <FontAwesomeIcon icon={showSubBalo === false ? faChevronDown : faChevronUp} /> </i>
                                {showSubBalo === true ?
                                    <> <li>Balo học sinh</li>
                                        <li>Balo Laptop</li>
                                    </> : ''}
                            </ul>
                            <ul> <span>Túi xách</span> <i> <FontAwesomeIcon icon={faChevronDown} /></i> </ul>
                            <ul> <span>All</span> </ul>
                            <ul> <span>SALE</span> </ul>
                        </div>
                        <div className="bottom-content">
                            {userName && <div onClick={() => handleLogOut()}> Đăng xuất  <FontAwesomeIcon icon={faRightFromBracket} />  </div>}
                        </div>
                    </div>}


                    {openCart === true && <Cart handleCloseSideBarFromParent={handleCloseSideBar} />}
                    {openSearch === true && <Search handleCloseSideBarFromParent={handleCloseSideBar} />}
                </div>
            </div>

        </>
    )
}
