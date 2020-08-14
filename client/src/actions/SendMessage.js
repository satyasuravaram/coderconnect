import Axios from "axios";
import ec2url from "../context/Config";
async function sendMessage(conversationID, message) {
  try {
    let url = "";
    if (process.env.NODE_ENV === "production") {
      url = ec2url + "/messages/" + conversationID;
    } else {
      url = `/messages/${conversationID}`;
    }
    //Check if conversation already exists
    const sendMsgRes = await Axios.post(url, message);
    console.log(sendMsgRes);
  } catch (err) {
    console.log(err);
  }
}

export default sendMessage;
