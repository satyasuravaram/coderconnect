import React from "react";
import { Card, CardColumns, Accordion } from "react-bootstrap";
import "./About.css";
import satya from "./images/satya.jpeg";
import ajata from "./images/ajata.jpeg";
import karthik from "./images/karthik.jpeg";
import andrew from "./images/andrew.jpg";

export default function About() {
  return (
    <div>
      <div className="about-top-container">
        <div className="about-info">
          <h1 class="title">About Us</h1>
          <hr />
          <h5 className="about-answer">
            {" "}
            We created CoderConnect to provide students with an easy way to get
            the coding help they need without having to worry about paying
            anything for tutoring.
          </h5>
        </div>
      </div>
      <div className="about-bw-container">
        <h1 className="mt-title">Meet the Team</h1>
        <div className="about-bottom-container">
          <div class="person">
            <img src={satya} alt="satya-img" class="person-image" />
            <h3 class="name">Satya Suravaram</h3>
            <p>
              Satya is a Computer Science and Business Student at the University
              of Texas at Austin who is passionate about creating technology for
              social good. In his spare time, he enjoys playing basketball and
              chess.
            </p>
          </div>
          <div class="person">
            <img src={ajata} alt="ajata-img" class="person-image" />
            <h3 class="name">Ajata Reddy</h3>
            <p>
              Ajata is currently pursuing a Bachelor’s in Computer Science at
              the University of Illinois at Urbana-Champaign (UIUC). His hobbies
              include juggling and watching anime.
            </p>
          </div>
          <div class="person">
            <img src={karthik} alt="karthik-img" class="person-image" />
            <h3 class="name">Karthik Menon</h3>
            <p>
              Karthik is a Computer Science student at Purdue University who has
              a passion for using technology to help other around him. When he’s
              not coding, you can see him playing basketball with his friends,
              practicing his cello, or watching anime on his laptop
            </p>
          </div>
          <div class="person">
            <img src={andrew} alt="andrew-img" class="person-image andrew-pic" />
            <h3 class="name">Andrew Shang</h3>
            <p>
              Andrew is at Texas A&M pursuing a major in Computer
              Science. He is passionate about creating programs for the social
              good. He wishes to blend the lines between medicine and technology
              to better improve the lives of others. In his spare time, he often
              spends his time both on the track and in the gym, and only
              occasionally spoiling himself at different restaurants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
