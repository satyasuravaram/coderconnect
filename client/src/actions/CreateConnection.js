import Axios from "axios";
import ec2url from "../context/Config";

async function createConnection(tutorID, userID, history) {
  try {
    //Check if conversation already exists
    let outerUrl = "";
    if (process.env.NODE_ENV === "production") {
      outerUrl = ec2url + "/messages/findExisting";
    } else {
      outerUrl = "/messages/findExisting";
    }
    const conversationRes = await Axios.post(outerUrl, {
      tutorID: tutorID,
      userID: userID,
    });

    if (conversationRes.data === false) {
      //Create new Connection and Conversation
      let url = "";
      if (process.env.NODE_ENV === "production") {
        url = ec2url + "/messages/newConnection";
      } else {
        url = "/messages/newConnection";
      }
      const connectionRes = await Axios.post(url, {
        tutorId: tutorID,
        currentUserId: userID,
      });
      console.log("New conversation created");
      history.push(`/app/messages/${connectionRes.data}`);
    } else {
      console.log("Conversation already exists");
      history.push(`/app/messages/${conversationRes.data}`);
    }
  } catch (err) {
    console.log(err);
  }
}

export default createConnection;
