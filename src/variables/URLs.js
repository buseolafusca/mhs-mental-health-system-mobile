
var baseUrl = 'http://178.128.34.125'
var fetchQuestionnaireUrl = '/api/v1/questionnaire_sJS/'
var answersUrl = '/api/v1/patientanswers/'


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
  getPlacesByCategoryLocationUrl
}
