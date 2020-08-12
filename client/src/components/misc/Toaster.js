import Swal from "sweetalert2";
import { socket } from "../../context/Socket";
import sendFeedback from "../../actions/SendFeedback";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const makeToast = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: true,
});

const endSessionToast = (room) => {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "This will end the session for both users!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "End Session",
      cancelButtonText: "Cancel",
      reverseButtons: false,
    })
    .then((result) => {
      console.log(result);
      if (result.isDismissed) {
        return false;
      } else {
        socket.emit("endSession", { room: room });
        return true;
      }
    });
};

const feedbackToast = (room, otherUserCurrID) => {
  Swal.fire({
    input: "textarea",
    title: "Would you like to provide anonymous feedback?",
    text:
      "Please enter any feedback regarding the tutor or session. Your response will be used to improve future sessions.",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Dismiss",
    reverseButtons: false,
  }).then((result) => {
    if (result.isDismissed) {
      return false;
    } else {
      if (result.value.length > 10) {
        sendFeedback(result.value, otherUserCurrID);
      }
      Swal.fire({
        title: "Thanks for your feedback!",
        icon: "success",
      }).then((result) => {});
      return true;
    }
  });
};

export { makeToast, endSessionToast, feedbackToast };
