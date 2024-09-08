'use client'
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect } from "react";
import './home.css'
import { getCookie } from 'cookies-next';
import AppContext from "./AppContext";


const Home = () => {
    const { } = useContext(AppContext)
    let accesstoken = getCookie("accessToken")

    return (
        <>
            Home
        </>
    )
}

export default Home
