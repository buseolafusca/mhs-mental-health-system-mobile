import axios from 'axios'
import { nhsUrl, baseUrl, fetchQuestionnaireUrl, answersUrl, getLocationByPostCodeUrl, getCategoriesByLocationUrl,
  getPlacesByCategoryLocationUrl, registerUrl, serviceUrl } from '../variables/URLs'
import { appId, appCode, patientanswersUrl, authenticationUrl, questionnaireWithoutToken, backendUrl } from '../variables/general'

const getQuestionnaire = async (id) => {
  var url = baseUrl + fetchQuestionnaireUrl + id
  try {
    var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
    const response = await axios({
      method: 'get',
      url: url,
      headers: headers // check later
    })

    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const postAnswers = async (ans, state) => {
  const backendURL = baseUrl + answersUrl
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

  axios({
    method: 'post',
    url: backendURL,
    headers: headers, // check later
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

const registerUser = async (body) => {
  const backendURL = baseUrl + registerUrl
  console.log("backendURL")
  console.log(backendURL)
  console.log(body)
  var headers = {'Content-Type': 'application/json'}
  try {
    const response = await axios({
                      method: 'post',
                      url: backendURL,
                      headers : headers,
                      data: body
                    });
    console.log("response");
    console.log(response);
    return response;
  } catch (error) {
    console.log("POST server error: ", error);
  }
}

const getLocationGivenPostalCode = async (postal) => {
  try {
    var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

    const hereAPIURL = getLocationByPostCodeUrl
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      headers: headers, // check later
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
    var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

    const hereAPIURL = getCategoriesByLocationUrl
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      headers: headers, // check later
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
  console.log(sessionStorage.jwt)
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

  await axios({
    method: 'get',
    url: url,
    params: { is_published: true },
    headers: headers
  }).then(function (response) {
      console.log("response")
      console.log(response)
      const data = response.data.data
      return { 'questionnaireList': data }

    })
    .catch(function (error) {
      console.log(error)
    })
  // return axios.get(url, { params: { status: 'PUBLISHED' } })
  //   .then(function (response) {
  //     console.log("response")
  //     console.log(response)
  //     const data = response.data.data
  //     return { 'questionnaireList': data }
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
}

const getListBasedOnCategoryAndLocation = async (loc, category, radius) => {
  loc += ';r=' + radius
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

  try {
    const hereAPIURL = getPlacesByCategoryLocationUrl
    const response = await axios({
      method: 'get',
      headers: headers, // check later
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
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  try {
    const hereAPIURL = url
    const response = await axios({
      method: 'get',
      url: hereAPIURL,
      headers: headers, // check later
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
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  console.log('fetchUserAnswers')
  var userAnswerUrl = baseUrl + answersUrl
  try {
    const response = await axios({
      method: 'get',
      url: userAnswerUrl,
      headers: headers // check later
    })
    // console.log(response)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getAnsweredQuestionnaire = async (theId) => {

  try {
    var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

    const response = await axios({
      method: 'get',
      url: baseUrl + patientanswersUrl + '/' + theId,
      headers: headers // check later
    })
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

const getServices = async () => {
  try {
    console.log(nhsUrl + serviceUrl)
    const response = await axios.get(nhsUrl + serviceUrl)
    console.log(response)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

export {
  fetchUserAnswers, getQuestionnaire, postAnswers, fetchPublishedQuestionnaires,
  getLocationGivenPostalCode, getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation, getPlaceDetails,
  getAnsweredQuestionnaire, getAuthenticationToken, registerUser, getServices}

  