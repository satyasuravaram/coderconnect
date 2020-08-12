import Axios from "axios";

async function sendFeedback(data, tutorId) {
  try {
    //Check if conversation already exists
    const sendFeedbackRes = await Axios.post(`/users/feedback`, { data, tutorId });
    console.log(sendFeedbackRes);
  } catch (err) {
    console.log(err);
  }
}

export default sendFeedback;
