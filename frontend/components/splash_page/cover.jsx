import React from 'react';
import { Link } from 'react-router-dom'

class SplashCover extends React.Component {
  constructor(props) {
    super(props);
    this.handleDemoSignin = this.handleDemoSignin.bind(this);
  }

  handleDemoSignin() {
    this.props.login({
      username: 'demo',
      password: 'password'
    })
  }

  render() {
    return(
      <div>
        <div className="splash-jumbotron">
          <div className="splash-jumbotron-mission">
            <p className="splash-jumbotron-header">It's Time to Do Money</p>
            <p className="splash-jumbotron-text">Cache Out lets you practice investing in the stock market, consequence free!</p>
            <p className="splash-jumbotron-signup" onClick={this.handleDemoSignin}>Demo</p>
          </div>
          <div className="gif-holder">
            <video autoPlay loop muted preload="auto" className="video-cont">
              <source
                className="gif-iphone"
                src={window.iphone_vid}
                type="video/mp4"
              />
            </video>
            <div className="iphone-img-holder">
              <img
                className="img-iphone"
                src={window.iphone_splash_pic}
                role="presentation"
                draggable="false"
              />
            </div>
          </div>
        </div>
        <div className="splash-content">
          <h2 className="splash-content-header">Sharpen your skills and track your portfolio</h2>
          <p className="splash-content-text">Make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial.
      The same goes for buying and selling cryptocurrencies with Robinhood Crypto. Zero commission fees.</p>
        </div>
      </div>
    )
  }
}

export default SplashCover;
