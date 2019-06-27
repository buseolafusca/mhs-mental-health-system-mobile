import axios from "axios";

// const testUrl = "http://178.128.34.125/api/v1/useranswers/";
// const id = "5d0ce7a7fc101609e9765de6";
const testUrl = "http://178.128.34.125/api/v1/questions";
const id = "";

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

export default getQuestionnaire;