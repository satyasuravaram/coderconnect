import Swal from "sweetalert2";
import { socket } from "../../context/Socket";
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
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
      text: "You won't be able to revert this!",
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

export { makeToast, endSessionToast };
