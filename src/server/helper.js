


const Apifirebase = baseUrl => {

    const getList = resource => {
        var api = `${baseUrl + resource}.json`
        console.log(api)        
        return api
    }

    return {
        getList
    }

}

export default Apifirebase