import axios from "axios";

const testUrl = "http://178.128.34.125/api/v1/questionnaires/";
const id = "5d0ce7a7fc101609e9765de6";

const getQuestionnaire = async (id) => {

  axios.get(testUrl + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

};

export default getQuestionnaire;