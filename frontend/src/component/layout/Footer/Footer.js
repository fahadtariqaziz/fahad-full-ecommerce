import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import "./Footer.css"

function Footer() {
  return (
    <footer id = "footer">
    <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
    <p>&copy; FAHAD EC 2023</p>
    <img src= {playStore} alt ="playstore"/>
    <img src= {appStore} alt ="Appstore"/>
    </div>

    <div className="midFooter">
    <h1>FAHAD EC.</h1>
    <p>High Quality is our first priority</p>
    <p>Copyrights 2021 &copy; MeFahadTariq </p>
    
    </div>

    <div className="rightFooter">
    <h4>Follow Me</h4>
    <a href='https://www.instagram.com/_im.fahad/'> Instagram </a>
    <a href='https://www.facebook.com/profile.php?id=100009158169566'> FaceBook </a>
    <a href='https://www.linkedin.com/in/fahad-tariq-aziz-57675719a/'> LinkedIn </a>
    </div>

    </footer>
  );
};

export default Footer;