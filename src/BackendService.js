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



const postAnswers = async(ans, questionnaire_id, title) =>{
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const backendURL = "http://mhsbackend.azurewebsites.net/api/v1/patientanswers"; 
  axios({
    method: 'post',
    url: backendURL,
    data: {
      questionnaire_id: "5d19f4108c72f5140a1b11a3", //will change TODO
      title: "The description", //TODO
      patient_name: "Draft", //TODO
      score: "15", //TODO
      timestamp: str,
      body: JSON.stringify(ans)
    }
  });
}

export {getQuestionnaire, postAnswers};