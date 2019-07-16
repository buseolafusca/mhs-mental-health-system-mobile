import { BaseResponse } from "./BaseResponse";
import { Status } from "./Status";

export class QuestionnaireDetailsResponse extends BaseResponse<QuestionnaireDetailsData>{

    constructor(responseBody: any){
        super(responseBody);
    }
}

class QuestionnaireDetailsData {
    _id : string;
    title : string;
    description : string;
    status: Status;
    body: string;

    constructor(_id: string, title: string, description: string, status: Status, body: string){
        this._id = _id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.body = body;
    }
}
