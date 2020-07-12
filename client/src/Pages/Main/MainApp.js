import React from "react";
import { useParams } from "react-router-dom";

export default function MainApp() {
  const { connectid } = useParams();

  return (
    <div>
      <div class="container" style={{ marginTop: "2%" }}>
        <div class="row">
          <div
            class="col-4"
            style={{ backgroundColor: "black", color: "lightgreen" }}
          >
            <h2>Ajata Reddy</h2>
            <p>Some chatting here</p>
          </div>
          <div
            class="col-8"
            style={{ backgroundColor: "darkblue", color: "white" }}
          >
            This is where the screenshare stuff goes
          </div>
        </div>
      </div>
    </div>
  );
}
