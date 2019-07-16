export class BaseResponse<T> {
    data: T;
    message: string;

    constructor(responseBody: any){
        this.data = responseBody.data.data;
        this.message = responseBody.data.message;
    }
}