import axios from 'axios'
import { baseUrl, fetchQuestionnaireUrl, answersUrl, getLocationByPostCodeUrl, getCategoriesByLocationUrl,
  getPlacesByCategoryLocationUrl } from '../variables/URLs'
import { appId, appCode, patientanswersUrl, authenticationUrl, questionnaireWithoutToken, backendUrl } from '../variables/general'

const getQuestionnaire = async (id) => {
  var url = baseUrl + fetchQuestionnaireUrl + id
  try {
    const response = await axios.get(url)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const postAnswers = async (ans, state) => {
  const backendURL = baseUrl + answersUrl
  axios({
    method: 'post',
    url: backendURL,
    data: {
      questionnaire_id: state.questionnaireId,
      title: JSON.parse(state.json).title,
      patient_name: 'Justin', // TODO when we implement the auth
      score: '15', // TODO
      body: JSON.stringify(ans.data),
      questionnaireBody: JSON.stringify(ans)
    }
  })
}

const getLocationGivenPostalCode = async (postal) => {
  try {
    const hereAPIURL = getLocationByPostCodeUrl
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: appId,
        app_code: appCode,
        postalcode: postal,
        country: 'gb'
      }
    })
    return response
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getCategoriesBasedOnLocation = async (loc) => {
  try {
    const hereAPIURL = getCategoriesByLocationUrl
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: appId,
        app_code: appCode,
        at: loc,
        pretty: ''
      }
    })
    return response
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const fetchPublishedQuestionnaires = async () => {
  const url = baseUrl + fetchQuestionnaireUrl
  console.log(url)
  return axios.get(url, { params: { status: 'PUBLISHED' } })
    .then(function (response) {
      const data = response.data.data
      return { 'questionnaireList': data }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const getListBasedOnCategoryAndLocation = async (loc, category, radius) => {
  loc += ';r=' + radius
  try {
    const hereAPIURL = getPlacesByCategoryLocationUrl
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: appId,
        app_code: appCode,
        in: loc,
        cat: category,
        pretty: ''
      }
    })
    return response
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getPlaceDetails = async (url) => {
  try {
    const hereAPIURL = url
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      params: {
        app_id: appId,
        app_code: appCode
      }
    })
    return response
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const fetchUserAnswers = async () => {
  console.log('fetchUserAnswers')
  var userAnswerUrl = baseUrl + answersUrl
  try {
    const response = await axios.get(userAnswerUrl)
    // console.log(response)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getAnsweredQuestionnaire = async (theId) => {
  try {
    const response = await axios.get(baseUrl + '/api/v1/' + patientanswersUrl + '/' + theId)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getAuthenticationToken = async (body) => {
  var headers = { 'Content-Type': 'application/json' }
  // var baseUrl = 'http://178.128.34.125/';
  // http://178.128.34.125/api/v1/patients/authenticate
  // console.log(baseUrl + '/' + authenticationUrl)
  var url = baseUrl + authenticationUrl
  console.log(url)
  try {
    const response = await axios({
      method: 'post',
      url: url,
      headers: headers,
      data: body
    })
    console.log('getAuthenticationToken')
    console.log(response)
    return response
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

const getQuestionnaireWithoutToken = async () => {
  try {
    console.log(baseUrl + questionnaireWithoutToken)
    const response = await axios.get(baseUrl + questionnaireWithoutToken)
    console.log('getQuestionnaireWithoutToken')
    console.log(response)
    return response
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getQuestionnaireWithToken = async (body) => {
  var headers = { 'Content-Type': 'application/json' }
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl + fetchQuestionnaireUrl,
      headers: headers,
      data: body
    })
    console.log('getAuthenticationToken')
    console.log(response.data.data)
    var token = response.data.data
    try {
      const res = await axios.get(baseUrl + questionnaireWithoutToken, {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      console.log('res.data.data')
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
    return response.data.data
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

export {
  fetchUserAnswers, getQuestionnaire, postAnswers, fetchPublishedQuestionnaires,
  getLocationGivenPostalCode, getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation, getPlaceDetails,
  getAnsweredQuestionnaire, getAuthenticationToken }
