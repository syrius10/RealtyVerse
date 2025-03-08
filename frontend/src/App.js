import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PropertyDetails from './components/PropertyDetails';
import Login from './components/Login';
import Register from './components/Register';
import VirtualTour from './components/VirtualTour';
import ARVisualization from './components/ARVisualization';
import Valuation from './components/Valuation';
import Payment from './components/Payment';
import Search from './components/Search';
import Chat from './components/Chat';
import VideoConference from './components/VideoConference';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import SmartHome from './components/SmartHome';
import LoyaltyProgram from './components/LoyaltyProgram';
import Subscription from './components/Subscription';
import Advertisement from './components/Advertisement';
import Transaction from './components/Transaction';
import Partnership from './components/Partnership';
import Localization from './components/Localization';
import Compliance from './components/Compliance';
import Feedback from './components/Feedback';
import Update from './components/Update';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import Notifications from './components/Notifications';
import Forums from './components/Forums';
import Discussions from './components/Discussions';
import Events from './components/Events';
import SupportTickets from './components/SupportTickets';
import FAQs from './components/FAQs';
import ChatSupport from './components/ChatSupport';
import './App.css';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="RealtyVerse Logo" />
        <h1>RealtyVerse</h1>
      </header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/property/:id" exact component={PropertyDetails} />
        <Route path="/property/:id/virtual-tour" component={VirtualTour} />
        <Route path="/property/:id/ar-visualization" component={ARVisualization} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/valuation" component={Valuation} />
        <Route path="/payment" component={Payment} />
        <Route path="/search" component={Search} />
        <Route path="/chat/:userId" component={Chat} />
        <Route path="/video-conference" component={VideoConference} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/smart-home" component={SmartHome} />
        <Route path="/loyalty-program" component={LoyaltyProgram} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/advertisement" component={Advertisement} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/partnership" component={Partnership} />
        <Route path="/localization" component={Localization} />
        <Route path="/compliance" component={Compliance} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/update" component={Update} />
        <Route path="/user-preferences" component={UserPreferences} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/forums" component={Forums} />
        <Route path="/forum/:forumId/discussions" component={Discussions} />
        <Route path="/events" component={Events} />
        <Route path="/support-tickets" component={SupportTickets} />
        <Route path="/faqs" component={FAQs} />
        <Route path="/chat-support" component={ChatSupport} />
      </Switch>
      <Chatbot />
      <footer>
        <p>&copy; 2025 RealtyVerse. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;