import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import refresh from './refresh'

const apiCall = async ({
    endpoint,
    method = 'GET',
    body = null,
    headers = {},
    retry = true,
    onSuccess = () => { },
    onError = () => { },
    setLoading = null
}) => {
    if (setLoading) {
        setLoading(true);
    }

    let accessToken = getCookie("accessToken");

    const requestOptions = {
        method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...headers
        }
    };

    if (body && method !== 'GET') {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, requestOptions);

        // Handle token expiration (401 Unauthorized)
        if (response.status === 401 && retry) {
            // Call refresh token function
            const { flag: refreshed } = await refresh();

            if (refreshed) {
                // Retry the request with new token (disable retry to prevent infinite loop)
                return apiCall({
                    endpoint,
                    method,
                    body,
                    headers,
                    retry: false,
                    onSuccess,
                    onError,
                    setLoading
                });
            } else {
                if (setLoading) {
                    setLoading(false);
                }
                onError("Session expired. Please log in again.");
                return null;
            }
        }


        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            if (setLoading) {
                setLoading(false);
            }
            onSuccess(data);
            return data;
        } else {
            const errorMessage = data.message || data.error || "Request failed";
            if (setLoading) {
                setLoading(false);
            }
            onError(errorMessage);
            return null;
        }
    } catch (error) {
        if (setLoading) {
            setLoading(false);
        }
        onError(error.message);
        return null;
    }
};

export default apiCall