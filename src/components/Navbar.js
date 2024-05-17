import React, { useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/slices/UserSlice';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";






const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()





    //logOut user
    const logOutUser = () => {
        localStorage.removeItem("user")
        dispatch(setUserData(null))
        googleLogout();
        setTimeout(() => {
            navigate("/")
        }, 1000)

    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        dispatch(setUserData(items))
    }, [dispatch]);


    //getting userdata from redux
    const userData = useSelector((state) => {
        return state.user;

    })

  





    return (

        <header>
            <nav>
                <div className='sidebar'>
                    <div className='top-sidebar'>
                        <h1>Platform</h1>
                        <div className='sidebar-content'>

                            <NavLink to="/" className={({ isActive }) => (isActive ? "link-active" : "none")}><div className='navitem'>
                                <LuLayoutDashboard /> Dashboard</div></NavLink>
                            <NavLink to="/connect" className={({ isActive }) => (isActive ? "link-active" : "none")}> <div className='navitem'>
                                <HiOutlineUsers /> Connect
                            </div> </NavLink>

                            <NavLink to="/report" className={({ isActive }) => (isActive ? "link-active" : "none")}><div className='navitem'>
                                <TbReport /> Report
                            </div></NavLink>

                            <NavLink to="/setting" className={({ isActive }) => (isActive ? "link-active" : "none")} > <div className='navitem'>
                                <IoIosSettings /> Settings
                            </div></NavLink>
                            {userData.setUser[0] === null && <>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? "link-active" : "none")}><div className='navitem'>
                                    <BiLogIn /> Sign in
                                </div></NavLink>

                                <NavLink to="/signup" className={({ isActive }) => (isActive ? "link-active" : "none")}><div className='navitem'>
                                    <SiGnuprivacyguard /> Sign up
                                </div></NavLink></>}
                            {userData.setUser[0] !== null && <button onClick={logOutUser}>Logout</button>}

                        </div>
                    </div>
                    <div className='bottom-sidebar'>
                        <h1>Assigment</h1>
                    </div>

                </div>
            </nav>
        </header>

    )
}

export default Navbar