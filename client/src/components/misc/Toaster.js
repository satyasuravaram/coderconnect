import Swal from "sweetalert2";
import { socket } from "../../context/Socket";
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

const feedbackToast = (room) => {
  console.log("fedeback toast called");

  Swal
    .fire({
      input: 'textarea',
      title: "Would you like to provide anonymous feedback?",
      text: "Please enter any feedback regarding the tutor or session. Your response will be used to improve future sessions.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Dismiss",
      reverseButtons: false,
    })
    .then((result) => {
      console.log(result);
      if (result.isDismissed) {
        return false;
      } else {
        console.log(result.value);
        return true;
      }
    });
};

export { makeToast, endSessionToast, feedbackToast };
