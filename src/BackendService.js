import axios from "axios";

// const testUrl = "http://178.128.34.125/api/v1/useranswers/";
// const id = "5d0ce7a7fc101609e9765de6";
const testUrl = "http://178.128.34.125/api/v1/questions";
const id = "";

const getQuestionnaire = async (id) => {

  axios.get(testUrl)
    .then(function (response) {
      console.log(response);
      var questions = response.data.data;
      console.log(questions);

    })
    .catch(function (error) {
      console.log(error);
    });

};

export default getQuestionnaire;