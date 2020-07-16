import Axios from "axios";

async function createConnection(tutorID, userID, history) {
  try {
    //Check if conversation already exists
    const conversationRes = await Axios.post(
      "http://localhost:5000/messages/findExisting",
      {
        tutorID: tutorID,
        userID: userID,
      }
    );

    if (conversationRes.data === false) {
      //Create new Connection and Conversation
      const connectionRes = await Axios.post(
        "http://localhost:5000/messages/newConnection",
        {
          tutorId: tutorID,
          currentUserId: userID,
        }
      );
      console.log("New conversation created");
      history.push(`/app/messages/${connectionRes.data}`)
    } else {
      console.log("Conversation already exists");
      history.push(`/app/messages/${conversationRes.data}`)
    }
  } catch (err) {
    console.log(err);
  }
}

export default createConnection;
