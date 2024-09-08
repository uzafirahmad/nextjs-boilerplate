"use client";
import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation'
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const AppContext = createContext();
export default AppContext;

export const Provider = ({ children }) => {
    const router = useRouter()

    let [accessToken, setAccessToken] = useState(() =>
        getCookie("accessToken")
            ? getCookie("accessToken")
            : null
    );

    let [refreshToken, setRefreshToken] = useState(() =>
        getCookie('refreshToken')
            ? getCookie('refreshToken')
            : null
    );



    let [user, setUser] = useState(() =>
        getCookie("accessToken")
            ? jwtDecode(getCookie("accessToken"))
            : null
    );

    let logoutUser = async () => {
        router.push("/login");

        setUser(null);
        setRefreshToken(null);
        setAccessToken(null);

        deleteCookie("accessToken");
        deleteCookie("refreshToken");
    };

    const updateToken = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUser(jwtDecode(data.accessToken))

            setCookie("accessToken", data.accessToken);
            setCookie("refreshToken", data.refreshToken);
        } catch (error) {
            logoutUser();
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        let minutes = 1000 * 60 * 5;
        let interval = setInterval(() => {
            if (refreshToken && accessToken && user) {
                updateToken();
            }
        }, minutes);
        return () => clearInterval(interval);
    }, [user, accessToken, refreshToken]);


    const verifyToken = async () => {
        let accesstoken = getCookie("accessToken")

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accesstoken: accesstoken
                })
            });

            if (!response.ok) {
                updateToken()
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const onLoadApis = async (user) => {
        await verifyToken()
        // other api calls to get user data
    }

    useEffect(() => {
        if (user) {
            onLoadApis(user)
        }
    }, [user]);


    const contextData = {
        user: user,
        setUser: setUser,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        refreshToken: refreshToken,
        setRefreshToken: setRefreshToken,
        logoutUser: logoutUser,
    }

    return (
        <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
    );
};
