class ApiResponce {
    constructor(
        statusCode,
        data,
        message = "succes"
    ){
        this.statusCode = statusCode,
        this.message = message,
        this.data = data,
        this.success = statusCode < 400
    }
}

export {ApiResponce};