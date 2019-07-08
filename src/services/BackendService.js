import axios from "axios";
import { baseUrl, fetchQuestionnaireUrl, answersUrl, getLocationByPostCodeUrl, getCategoriesByLocationUrl,
  getPlacesByCategoryLocationUrl } from '../variables/URLs'


const getQuestionnaire = async (id) => {
  var url = baseUrl + fetchQuestionnaireUrl + id;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const postAnswers = async (ans, state) => {
  console.log(state);
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const backendURL = baseUrl + answersUrl;
  axios({
    method: 'post',
    url: backendURL,
    data: {
      questionnaire_id: state.questionnaireId,
      title: JSON.parse(state.json).title,
      patient_name: "Justin", //TODO
      score: "15", //TODO
      timestamp: str,
      body: JSON.stringify(ans)
    }
  });
}



const getLocationGivenPostalCode = async (postal) => {
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


const getCategoriesBasedOnLocation = async (loc) => {
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
  const url = fetchQuestionnaireUrl;
  return await axios.get(url, { params: { status: 'PUBLISHED' } })
    .then(function (response) {

      const data = response.data.data;
      return { 'questionnaireList': data };
    })
    .catch(function (error) {
      console.log(error);
    });
}


const getListBasedOnCategoryAndLocation = async (loc, category,radius) => {
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



const getPlaceDetails = async (url) => {
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
  getQuestionnaire, postAnswers, fetchPublishedQuestionnaires,
  getLocationGivenPostalCode, getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation, getPlaceDetails
};