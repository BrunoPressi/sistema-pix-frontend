export function decodeToken(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Token inválido:", e);
        return null;
    }
}

export function tratarErros(error:any, setMessage:any) {

    if (error.errorMessage != null) {
        setMessage((prev: any) => ({...prev, errorMessage: error.errorMessage}));
    } else {
        const errorsLength = error.errors.length;
        for (let i = 0; i < errorsLength; i++) {
            let pathError = error.errors[i].path;
            setMessage((prev: any) => ({...prev, [pathError]: error.errors[i].msg}));
        }
    }
}