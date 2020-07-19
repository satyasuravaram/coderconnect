import Axios from "axios";

async function sendMessage(conversationID, message) {
  try {
    //Check if conversation already exists
    const sendMsgRes = await Axios.post(
      `http://localhost:5000/messages/${conversationID}`,
      message
    );
    console.log(sendMsgRes);
  } catch (err) {
    console.log(err);
  }
}

export default sendMessage;
