import Axios from "axios";

async function createConnection(tutorID, userID) {
  try {
    const connectionRes = await Axios.post(
      "http://localhost:5000/messages/newConnection",
      {
        tutorId: tutorID,
        currentUserId: userID,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export default createConnection;
