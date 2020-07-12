import React from 'react';
import {Card, CardColumns, Accordion} from 'react-bootstrap';
import './About.css';
import satya from "./images/satya.jpeg";
import ajata from "./images/ajata.jpeg"
import karthik from "./images/karthik.jpeg";


export default function About () {
    return <div class="container">
        <h2 class="title">About Us</h2>
        <div class="person">
            <img src={satya} alt="satya-img" class="person-image"/>
            <h3 class="name">Satya Suravaram</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam. Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam magna justo, tempor eget nisl ullamcorper, euismod vulputate est. Aliquam varius justo congue orci bibendum elementum. Proin lacinia convallis nisi in congue. Curabitur faucibus ultrices eros vel faucibus. Ut suscipit nibh mattis sem condimentum, in feugiat orci luctus. Sed vel condimentum massa. Praesent id leo facilisis, tempor diam vitae, tristique eros. Fusce vitae dui in augue dictum dapibus nec a enim. Integer sed tellus non metus ullamcorper tempus. Integer rutrum ut massa in hendrerit. Aenean volutpat ac arcu tincidunt porta.</p>
        </div>
        <div class="person">
            <img src={ajata} alt="ajata-img" class="person-image"/>
            <h3 class="name">Ajata Reddy</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam. Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam magna justo, tempor eget nisl ullamcorper, euismod vulputate est. Aliquam varius justo congue orci bibendum elementum. Proin lacinia convallis nisi in congue. Curabitur faucibus ultrices eros vel faucibus. Ut suscipit nibh mattis sem condimentum, in feugiat orci luctus. Sed vel condimentum massa. Praesent id leo facilisis, tempor diam vitae, tristique eros. Fusce vitae dui in augue dictum dapibus nec a enim. Integer sed tellus non metus ullamcorper tempus. Integer rutrum ut massa in hendrerit. Aenean volutpat ac arcu tincidunt porta.</p>
        </div>
        <div class="person">
            <img src={karthik} alt="karthik-img" class="person-image"/>
            <h3 class="name">Karthik Menon</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam. Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam magna justo, tempor eget nisl ullamcorper, euismod vulputate est. Aliquam varius justo congue orci bibendum elementum. Proin lacinia convallis nisi in congue. Curabitur faucibus ultrices eros vel faucibus. Ut suscipit nibh mattis sem condimentum, in feugiat orci luctus. Sed vel condimentum massa. Praesent id leo facilisis, tempor diam vitae, tristique eros. Fusce vitae dui in augue dictum dapibus nec a enim. Integer sed tellus non metus ullamcorper tempus. Integer rutrum ut massa in hendrerit. Aenean volutpat ac arcu tincidunt porta.</p>
        </div>

        </div>;
};