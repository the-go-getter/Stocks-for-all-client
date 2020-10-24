class UserService{
    getSession = async()=> {
        return await fetch(`https://infinite-retreat-10652.herokuapp.com/profile`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json())
    }
    login = async (user) => {
        return await fetch(`https://infinite-retreat-10652.herokuapp.com/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => response.json())
    }
    logout = async() => {
        return await fetch("https://infinite-retreat-10652.herokuapp.com/logout",{
            credentials: 'include'
        })
    }
}
export default UserService;
