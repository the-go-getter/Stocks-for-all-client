class AdminService{
    getSession = async()=> {
        return await fetch(`https://infinite-retreat-10652.herokuapp.com/admin/profile`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json())
    }
    login = async(user) => {
        return await fetch(`https://infinite-retreat-10652.herokuapp.com/admin/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => console.log(response.json()))
    }
    logout = async() => {
        return await fetch("https://infinite-retreat-10652.herokuapp.com/logout",{
            credentials: 'include'
        })
    }
}
export default AdminService;