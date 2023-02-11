import decode from 'jwt-decode';

class AuthService{

    getToken()
    {
        return localStorage.getItem('id_token');
    }

    getProfile()
    {
        return decode(this.getToken());
    }

    isTokenExpired(token)
    {
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now()/1000){
                return true;
            }else{
                return false;
            }
        }catch(err){
            return false;
        }
    }

    loggedIn()
    {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    login(idToken)
    {
        localStorage.setItem('id_token',idToken);
        window.location.assign('/landingpage');
    }

    logout()
    {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

}

export default new AuthService();