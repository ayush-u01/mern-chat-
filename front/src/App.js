
import { Route } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
// import chatpage from './pages/chatpage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
        <Route path='/' component={Homepage} exact />
        <Route path='/chats' component={ChatPage} />

    </div>
  );
}

export default App;
