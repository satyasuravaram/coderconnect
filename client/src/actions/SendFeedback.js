import Axios from "axios";
import ec2url from "../context/Config";
async function sendFeedback(data, tutorId) {
  try {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = ec2url + "/users/feedback";
    } else {
      url = "/users/feedback";
    }
    //Check if conversation already exists
    const sendFeedbackRes = await Axios.post(url, {
      data,
      tutorId,
    });
    console.log(sendFeedbackRes);
  } catch (err) {
    console.log(err);
  }
}

export default sendFeedback;
