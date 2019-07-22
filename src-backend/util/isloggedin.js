function isloggedin() {
    
    if (window.sessionStorage.getItem("apikey")){
        return true
    } else {
        return false
    }
}

export default isloggedin