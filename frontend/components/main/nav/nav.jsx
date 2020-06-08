import React from 'react';
import NavSearchContainer from './nav_search_container';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: '',
      mode: 'light'
    };
    this.changeTheme = this.changeTheme.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.receiveStocks();
  }

  handleLogout() {
    this.props.logout();
    let docBody = document.body;
    docBody.setAttribute("data-theme", "light");
  }

  changeTheme() {
    let currentTheme = document.body.getAttribute("data-theme")
    let themeEle = document.getElementById("dark-mode");
    var docBody = document.body
    if (currentTheme === "light") {
      docBody.setAttribute("data-theme", "dark");
      themeEle.textContent = "Light Mode";
      this.setState({ mode: "dark" });
    }
    else {
      docBody.setAttribute("data-theme", "light");
      themeEle.textContent = "Dark Mode";
      this.setState({ mode: "light" });
    }
  }

  render() {
    if (this.props.stocks.length === 0) return null;

    return (
      <div className="nav-bar">
        <div className="nav-left">
          <Link to="/feed" className="nav-right-ele">
            <svg  width="30px" height="34px" viewBox="0 0 21 28" version="1.1" className="home-svg-logo">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <path d="M 8.72363 21.75 L 8.5395 21.8113 C 7.35375 22.2036 5.60025 22.8073 4.02563 23.5282 C 3.94125 23.5674 3.88613 23.6772 3.88613 23.6772 C 3.8565 23.7451 3.81975 23.828 3.77813 23.9217 L 3.77325 23.9337 C 3.59588 24.3335 3.3525 24.9349 3.24975 25.1791 L 3.168 25.3721 C 3.15525 25.4031 3.16313 25.4382 3.18638 25.461 C 3.20138 25.4751 3.2205 25.483 3.24038 25.4837 C 3.25275 25.4837 3.26513 25.4811 3.27675 25.4751 L 3.4665 25.3855 C 3.8985 25.1813 4.44225 24.8718 5.01487 24.6012 L 5.03438 24.5922 C 6.12225 24.0789 7.34963 23.4991 8.08762 23.1482 C 8.08838 23.1478 8.20725 23.0851 8.26688 22.9663 L 8.82038 21.8617 C 8.835 21.8329 8.8305 21.7982 8.80912 21.7735 C 8.78887 21.7489 8.75362 21.7403 8.72363 21.75"></path>
                <path d="M 4.30312 20.0379 C 4.38037 19.8863 4.73887 19.1994 4.82025 19.0456 L 4.83525 19.0195 C 7.23637 14.5096 10.1629 10.2558 13.5319 6.37691 L 13.6252 6.26939 C 13.6545 6.23579 13.6594 6.18837 13.638 6.14917 C 13.6166 6.10997 13.5728 6.08869 13.5289 6.09429 L 13.3886 6.11371 C 11.1772 6.41685 8.94038 6.83648 6.73612 7.36101 C 6.5175 7.42149 6.37575 7.56373 6.34538 7.59696 C 4.69575 9.56331 3.13313 11.6342 1.70025 13.7551 C 1.62825 13.8619 1.62037 14.1187 1.62037 14.1187 C 1.62037 14.1187 1.98187 16.8806 2.50763 18.9164 C 1.20413 22.6471 0.04125 27.5628 0.04125 27.5628 C 0.03225 27.5946 0.03825 27.6293 0.058125 27.6558 C 0.078 27.6823 0.10875 27.6983 0.142125 27.6998 L 0.88425 27.6998 C 0.930375 27.7006 0.972 27.6726 0.987375 27.6297 L 1.03875 27.4911 C 1.79662 25.4352 2.65875 23.4058 3.6135 21.4278 C 3.83588 20.9675 4.30312 20.0379 4.30312 20.0379"></path>
                <path d="M 14.6198 7.18293 L 14.6182 7.04256 C 14.6171 6.99813 14.5898 6.95856 14.5478 6.94363 C 14.5061 6.92832 14.4589 6.93989 14.4296 6.97349 L 14.337 7.08027 C 10.4089 11.6032 7.10775 16.6242 4.52362 22.0017 L 4.46362 22.1275 C 4.44525 22.167 4.45237 22.2148 4.48275 22.2462 C 4.503 22.2678 4.53 22.2794 4.5585 22.2802 C 4.57275 22.2802 4.58775 22.2775 4.60162 22.2719 L 4.731 22.2186 C 6.93713 21.3087 9.19125 20.5195 11.4292 19.8755 C 11.5635 19.8374 11.6764 19.7441 11.7405 19.6205 C 12.723 17.7165 14.9996 14.0302 14.9996 14.0302 C 15.0577 13.9466 15.0435 13.8238 15.0435 13.8238 C 15.0435 13.8238 14.6449 9.41435 14.6198 7.18293"></path>
                <path d="M 17.0756 0.0888533 C 15.9353 0.0645867 14.5796 0.308747 13.0436 0.81312 C 12.8134 0.89376 12.6315 1.02032 12.4669 1.18123 C 10.9061 2.64096 9.38625 4.18917 7.95 5.78891 L 7.84013 5.91061 C 7.809 5.94496 7.8045 5.99536 7.82775 6.03531 C 7.85138 6.07525 7.8975 6.09579 7.94287 6.08608 L 8.10262 6.05173 C 10.4186 5.55893 12.7541 5.18224 15.0461 4.93285 C 15.1973 4.91643 15.3529 4.96683 15.4654 5.06912 C 15.5794 5.17216 15.6431 5.31925 15.6401 5.47232 C 15.6015 7.73696 15.6844 10.0132 15.8876 12.2375 L 15.9011 12.3827 C 15.9052 12.4275 15.9364 12.4645 15.9799 12.4761 C 16.0406 12.4809 16.0744 12.4641 16.0958 12.4342 L 16.1798 12.3151 C 17.472 10.481 18.8764 8.69717 20.3561 7.0112 C 20.5193 6.82304 20.5635 6.70469 20.5946 6.53408 C 21.06 3.56981 20.3411 1.37835 19.6987 0.823573 C 19.1411 0.34272 18.3319 0.116107 17.0756 0.0888533 Z"></path>
              </g>
            </svg>
          </Link>
        </div>
        <div className="nav-search-box">
          <NavSearchContainer stocks={this.props.stocks} />
        </div>
        <div className="nav-right">
          <Link to="/feed" className="nav-right-ele">Home</Link>
          <p className="nav-right-ele" id="dark-mode" onClick={this.changeTheme}>Dark Mode</p>
          <a className="nav-right-ele" onClick={this.handleLogout}>Logout</a>
        </div>
      </div>
    );
  }
}

export default MainNav;