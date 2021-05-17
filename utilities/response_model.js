//@Functionality: Common API Response model
class ResponseModel {
    //Need to take params from API's, as Input
    static show(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
        return {
            success: this.success,
            data: this.data,
            message: this.message,
        };
    }
}

module.exports = ResponseModel;