import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';


function Footer() {
    return (
        <div className="footer">
            <div className="footer__container">
                <a className="footer__link-social" href="https://github.com/Sweetleo30" rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <span className="footer__copyright">&copy; 2022, Diana Rychkova. All rights reserved.
                </span>
            </div>
        </div>
    );
}

export default Footer;
