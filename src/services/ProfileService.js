
export const getProfile = async() => {
        return fetch(`https://infinite-retreat-10652.herokuapp.com/profile`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
    }


