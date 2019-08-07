var appId = 'nuT8ftiOYvrfFNaFEUyV'
var appCode = 'yNZIQaMP6fRuY1D8DKsuxw'
var backendUrl = "mhsbackend.azurewebsites.net/api/v1";
var nhsUrl = 'http://mhsbackend.azurewebsites.net'
var baseUrl = "http://178.128.34.125/api/v1";
var fetchQuestionnaireUrl = '/questionnaire_sJS/'
var answersUrl = '/patientanswers/'
var registerUrl = '/patients/register'
var serviceUrl = '/api/v1/organisations/services/'
var patientUrl = '/patients/'
var patientanswersUrl = "/patientanswers";
var authenticationUrl = "/patients/authenticate";
var questionnaireWithoutToken = "/questionnaires";
var createUserAnswers = "/useranswers";

// HERE Related API
var getLocationByPostCodeUrl = 'https://geocoder.api.here.com/6.2/geocode.json'
var getCategoriesByLocationUrl = 'https://places.cit.api.here.com/places/v1/categories/places'
var getPlacesByCategoryLocationUrl = 'https://places.cit.api.here.com/places/v1/discover/explore'

module.exports = {
  nhsUrl,
  baseUrl,
  fetchQuestionnaireUrl,
  answersUrl,
  getLocationByPostCodeUrl,
  getCategoriesByLocationUrl,
  getPlacesByCategoryLocationUrl,
  registerUrl,
  serviceUrl,
  patientUrl,
  appCode, 
  appId,
  backendUrl,
  createUserAnswers,
  patientanswersUrl,
  questionnaireWithoutToken,
  authenticationUrl
}
