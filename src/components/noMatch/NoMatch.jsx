import { Link } from "react-router-dom";
import tumbleweed from "../../assets/img/tumbleweed.png";
import './NoMatch.scss';

export function NoMatch() {
    return (
        <div className="page">
            <div className="page__container">
                <div className="page__animation">
                    <img src={tumbleweed} className="tumbleweed" alt="tumbleweed" />
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="173" height="27" viewBox="0 0 173 27"><defs><radialGradient id="a" r="22.258%" fx="50%" fy="50%" gradientTransform="matrix(0 1 -1.41612 0 1.208 0)">
                            <stop offset="0%" stop-color="#973C00"></stop>
                            <stop offset="100%" stop-color="#FFF"></stop>
                        </radialGradient>
                            <filter id="b" width="104.5%" height="126.1%" x="-2.3%" y="-13%" filterUnits="objectBoundingBox">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="1"></feGaussianBlur>
                            </filter>
                            <radialGradient id="c" r="22.258%" fx="50%" fy="50%" gradientTransform="matrix(0 1 -2.20744 0 1.604 0)">
                                <stop offset="0%" stop-color="#973C00"></stop>
                                <stop offset="100%" stop-color="#FFF" stop-opacity="0"></stop>
                            </radialGradient>
                            <filter id="d" width="105.2%" height="119.4%" x="-2.6%" y="-9.7%" filterUnits="objectBoundingBox">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="1"></feGaussianBlur>
                            </filter>
                        </defs>
                            <g fill="none" fill-rule="evenodd">
                                <path fill="url(#a)" d="M171 16.5c0 6.351-29.773 11.5-66.5 11.5C67.773 28 38 22.851 38 16.5S67.773 5 104.5 5c36.727 0 66.5 5.149 66.5 11.5" filter="url(#b)" opacity=".263" transform="translate(0 -3)"></path>
                                <path fill="url(#c)" d="M115 15.5C115 24.06 89.256 31 57.5 31S0 24.06 0 15.5C0 6.94 25.744 0 57.5 0S115 6.94 115 15.5" filter="url(#d)" opacity=".196" transform="translate(0 -3)"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="page__content">
                    <h1 className="page__title">404</h1>
                    <p className="page__text">This page could not be found</p>
                    <Link to="/" className="page__btn">GO back Home</Link>
                </div>
            </div>
        </div>
    );
}

