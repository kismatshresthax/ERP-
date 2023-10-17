import React from 'react';

const Footer = (props) => {
    return ( 
       <div className="footer">
      <div  style={{backgroundColor:"#ffff"}}className="site-footer">
                   
      <div className="copyright">
        <small>
          All rights reserved. Copyright &copy;{" "}
          {new Date().getFullYear()}{" "}
          <a href="https://www.smtechme.com/" target="_blank">
            SMTech Software
          </a>
        </small>
      </div>
    </div>
     </div>
       
     );
}
 
export default Footer;