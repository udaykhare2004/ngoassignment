import React from 'react';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <span className="logo-text">She Can Foundation</span>
      </header>

      <main>
        <ContactForm />
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} She Can Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
