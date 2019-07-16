import { BaseListResponse } from "./BaseListResponse";
import { Status } from "./Status";

export class QuestionnaireListResponse extends BaseListResponse<QuestionnaireListData>{
    
    constructor(responseBody: any){
        super(responseBody);
    }
}

class QuestionnaireListData {
    _id : string;
    title : string;
    description : string;
    status: Status;

    constructor(_id: string, title: string, description: string, status: Status){
        this._id = _id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
