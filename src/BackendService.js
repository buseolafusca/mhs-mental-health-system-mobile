import axios from "axios";


const getQuestionnaire = async (testUrl) => {

  try {
    const response = await axios.get(testUrl);
    return response.data.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }

  // axios.get(testUrl)
  //   .then(function (response) {
  //     console.log(response);
  //     var questions = response.data.data;
  //     console.log(questions);
  //     return questions;

  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     return 0;
  //   });

};

const postAnswers = async (ans, state) => {
  console.log(state);
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const backendURL = "http://mhsbackend.azurewebsites.net/api/v1/patientanswers";
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



const getLocationgivenPostalCode = async (postal) => {
  try {
    const hereAPIURL = "https://geocoder.api.here.com/6.2/geocode.json";
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
    const hereAPIURL = "https://places.cit.api.here.com/places/v1/categories/places";
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: "nuT8ftiOYvrfFNaFEUyV", //Nick's Credentials
        app_code: "yNZIQaMP6fRuY1D8DKsuxw", //Nick's Credentials
        at: loc,
        pretty:''
      }
    });
    return response;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}

const fetchPublishedQuestionnaires = async () => {
  const url = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS";
  return await axios.get(url,{ params: {status: 'PUBLISHED' }})
  .then(function(response){

    const data = response.data.data;
    return {'questionnaireList': data};
  })
  .catch(function (error){
    console.log(error);
  });
}


export { getQuestionnaire, postAnswers,fetchPublishedQuestionnaires, 
  getLocationgivenPostalCode,getCategoriesBasedOnLocation };