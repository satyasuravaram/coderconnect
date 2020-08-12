import React from "react";
import { Card, CardColumns, Accordion } from "react-bootstrap";
import "./About.css";
import satya from "./images/satya.jpeg";
import ajata from "./images/ajata.jpeg";
import karthik from "./images/karthik.jpeg";

export default function About() {
  return(<div>
      <div div className="about-top-container">
        <div className="about-info">
        <h1 class="title">About Us</h1>
        <hr/>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
            Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
            magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
            Aliquam varius justo congue orci bibendum elementum. Proin lacinia</p>
        </div>
      </div>
        <h1 className="mt-title">Meet the Team</h1>
        <div className="about-bottom-container">
          <div class="person">
            <img src={satya} alt="satya-img" class="person-image" />
            <h3 class="name">Satya Suravaram</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
              Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
              magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
              Aliquam varius justo congue orci bibendum elementum. Proin lacinia
              
            </p>
          </div>
          <div class="person">
            <img src={ajata} alt="ajata-img" class="person-image" />
            <h3 class="name">Ajata Reddy</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
              Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
              magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
              Aliquam varius justo congue orci bibendum elementum. Proin lacinia
              
            </p>
          </div>
          <div class="person">
            <img src={karthik} alt="karthik-img" class="person-image" />
            <h3 class="name">Karthik Menon</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
              Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
              magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
              Aliquam varius justo congue orci bibendum elementum. Proin lacinia
              
            </p>
          </div>
          <div class="person">
            <img src={karthik} alt="andrew-img" class="person-image" />
            <h3 class="name">Andrew Shang</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
              Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
              magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
              Aliquam varius justo congue orci bibendum elementum. Proin lacinia
              
            </p>
          </div>
      </div>
    </div>
  )}
  