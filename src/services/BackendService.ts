import axios from "axios";
import { baseUrl, fetchQuestionnaireUrl, answersUrl, getLocationByPostCodeUrl, getCategoriesByLocationUrl,
  getPlacesByCategoryLocationUrl } from '../variables/URLs'
import { QuestionnaireListResponse } from "../dto/QuestionnaireListResponse";
import { QuestionnaireDetailsResponse } from "../dto/QuestionnaireDetailsResponse";
import { Status } from "../dto/Status";



const getQuestionnaireById = async (id: string) => {
  var url = baseUrl + fetchQuestionnaireUrl + id;
  console.log(id);
  try {

    const responseBody = await axios.get(url);
    var response: QuestionnaireDetailsResponse = new QuestionnaireDetailsResponse(responseBody);
    var questionnaireDetails = response.data;
    return questionnaireDetails;

  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const postAnswers = async (ans: any, state: any) => {
  console.log(state);
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const backendURL = baseUrl + answersUrl;
  axios({
    method: 'post',
    url: backendURL,
    data: 
    {
      questionnaire_id: state.questionnaireId,
      title: JSON.parse(state.json).title,
      patient_name: "Justin", //TODO
      score: "15", //TODO
      timestamp: str,
      body: JSON.stringify(ans)
    }
  });
}



const getLocationGivenPostalCode = async (postal: any) => {
  try {
    const hereAPIURL = getLocationByPostCodeUrl;
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: "nuT8ftiOYvrfFNaFEUyV", //Nick's Credentials
        app_code: "yNZIQaMP6fRuY1D8DKsuxw", //Nick's Credentials
        postalcode: postal,
        country: "gb"
      }
    });
    return response;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}


const getCategoriesBasedOnLocation = async (loc: any) => {
  try {
    const hereAPIURL = getCategoriesByLocationUrl;
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: "nuT8ftiOYvrfFNaFEUyV", //Nick's Credentials
        app_code: "yNZIQaMP6fRuY1D8DKsuxw", //Nick's Credentials
        at: loc,
        pretty: ''
      }
    });
    return response;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}

const fetchPublishedQuestionnaires = async () => {
  const url = baseUrl+ fetchQuestionnaireUrl;
  return await axios.get(url, 
    { params: { status: Status.PUBLISHED } 
    })
    .then(function (responseBody) {
      var response: QuestionnaireListResponse = new QuestionnaireListResponse(responseBody);
      var questionnaireList = response.data;
      return questionnaireList;
    })
    .catch(function (error) {
      console.log(error);
    });
}


const getListBasedOnCategoryAndLocation = async (loc: any, category: any,radius: any) => {
  loc+=';r='+radius;
  try {
    const hereAPIURL = getPlacesByCategoryLocationUrl;
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: "nuT8ftiOYvrfFNaFEUyV", //Nick's Credentials
        app_code: "yNZIQaMP6fRuY1D8DKsuxw", //Nick's Credentials
        in: loc,
        cat: category,
        pretty: ''
      }
    });
    return response;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}



const getPlaceDetails = async (url: string) => {
  try {
    const hereAPIURL = url;
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: "nuT8ftiOYvrfFNaFEUyV", //Nick's Credentials
        app_code: "yNZIQaMP6fRuY1D8DKsuxw", //Nick's Credentials
      }
    });
    return response;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}

export {
  getQuestionnaireById as getQuestionnaire, postAnswers, fetchPublishedQuestionnaires,
  getLocationGivenPostalCode, getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation, getPlaceDetails
};