import React from 'react'
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer__logo-box">
            </div>
            <div className="footer-links-container">
                <div className="col-1-of-2">
                    <div className="footer-page__navigation">
                        <ul className="footer-page__list">
                            <li className="footer-page__item"><a href="/become-a-tutor" className="footer-page__link">Become a Tutor</a></li>
                            <li className="footer-page__item"><a href="/about" className="footer-page__link">About</a></li>
                            <li className="footer-page__item"><a href="/faq" className="footer-page__link">Frequently Asked Questions</a></li>
                            <li className="footer-page__item"><a href="/contact" className="footer-page__link">Contact us</a></li>
                            <li className="footer-page__item"><a href="#" className="footer-page__link">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-2">
                    <p className="footer__copyright">
                        CoderConnect &#169; 2020 
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
