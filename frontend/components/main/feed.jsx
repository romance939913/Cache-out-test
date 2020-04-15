import React from 'react';
import MainNavContainer from './nav/nav_container';
import GraphMainContainer from './graph_main_container';
import PortfolioContainer from './portfolio_container';

class MainFeed extends React.Component {

    componentDidMount() {
        this.props.clearGraphPrices()
        let holding = {
            user_id: this.props.currentUser.id
        }
        this.props.getUserBP(this.props.currentUser.id);
        this.props.receiveNews();
        this.props.receiveSnapshots(this.props.currentUser.id)
        this.props.getHoldings(holding)
            .then(holdings => {
                Object.keys(holdings.holdings).forEach((ticker, idx) => {
                    this.props.receiveRealTimePrice(ticker)
                })
            })
    }

    componentWillUnmount() {
        this.props.clearRealTimePrice()
        this.props.clearGraphPrices()
    }
    
    render() {
        if (Object.keys(this.props.price).length !== Object.keys(this.props.holdings).length) return null;
        if (this.props.cash.length === 0) return null;
        if (this.props.news.length === 0) return null;

        let newsArr = [];
        this.props.news.forEach((ele, idx) => {
            newsArr.push(
                <a key={idx} target="_blank" href={`${this.props.news[idx].url}`}>
                    <div className="news-item-wrapper">
                        <img  className="news-item-image" src={`${this.props.news[idx].urlToImage}`} alt=""/>
                        <div className="news-item-content">
                            <div>
                                <p className="news-item-website">{this.props.news[idx].source.name}</p>
                                <p className="news-item-title">{this.props.news[idx].title}</p>
                            </div>
                            <p className="news-item-description">{this.props.news[idx].description}</p>
                        </div>
                    </div>
                </a>
            )
        }) 
            
        return (
            <div>
                <MainNavContainer />
                <div className="main-page-wrapper">
                    <div className="graph-news-wrapper">
                        <GraphMainContainer 
                            tickers={Object.keys(this.props.holdings)} 
                            cash={this.props.cash}
                            price={this.props.price}
                            snapshots={this.props.snapshots}
                            holdings={this.props.holdings}
                        />
                        <h1 className="news-header">Today's Top Stories</h1>
                        <div id="news-container-feed" className="news-container">
                            {newsArr}
                        </div>
                    </div>
                    <div className="portfolio-wrapper">
                        <PortfolioContainer 
                            price={this.props.price}
                            tickers={Object.keys(this.props.holdings)}
                            graphPrices={this.props.graphPrices}
                            holdings={this.props.holdings}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainFeed;