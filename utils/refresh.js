import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const refresh = async (token) => {
    const refreshToken = token ? token : getCookie('refreshToken');

    if (!refreshToken) {
        return { flag: false };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Refresh failed');
        }

        const data = await response.json();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

        setCookie('accessToken', newAccessToken);
        setCookie('refreshToken', newRefreshToken);

        return {
            flag: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    } catch (error) {
        return { flag: false };
    }
};

export default refresh;