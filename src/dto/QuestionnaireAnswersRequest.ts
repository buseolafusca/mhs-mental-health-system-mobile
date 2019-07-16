export class QuestionnaireAnswersRequest {
    questionnaire_id: string;
    title: string;
    patient_name: string;
    score: string;
    timestamp: string;
    body: string;

    constructor(questionnaire_id: string, title: string, patient_name: string, 
        score: string, timestamp: string, body: string){
        this.questionnaire_id = questionnaire_id;
        this.title = title;
        this.patient_name = patient_name;
        this.score = score;
        this.timestamp = timestamp;
        this.body = body;
    }
}