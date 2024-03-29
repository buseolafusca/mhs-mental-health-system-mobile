
var appId = 'nuT8ftiOYvrfFNaFEUyV'
var appCode = 'yNZIQaMP6fRuY1D8DKsuxw'

var baseUrl = "https://mhsbackend.azurewebsites.net/api/v1";

var fetchQuestionnaireUrl = '/questionnaire_sJS/'
var answersUrl = '/patientanswers/'
var registerUrl = '/patients/register'
var serviceUrl = '/organisations/services/'
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
  createUserAnswers,
  patientanswersUrl,
  questionnaireWithoutToken,
  authenticationUrl
}
