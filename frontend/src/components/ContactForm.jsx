import React, { useState } from 'react';

const API_BASE =
  import.meta.env.VITE_API_URL || 'https://ngoassignment.onrender.com/api';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setLoading(true);

    try {
      let token = localStorage.getItem('ngo_token');
      
      if (!token) {
        // Step 1: Clean username from name input
        const cleanUsername = name.trim().replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
        let authRes = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: cleanUsername, email, password })
        });

        let authData = await authRes.json();

        // Fallback to login if user already exists
        if (!authRes.ok && (authData.message?.includes('exists') || authData.message?.includes('taken') || authData.message?.includes('credentials'))) {
          authRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          authData = await authRes.json();
        }

        if (!authRes.ok) {
          throw new Error(authData.message || 'Authentication failed');
        }

        token = authData.token;
        localStorage.setItem('ngo_token', token);
      }

      // Step 2: Form Submission
      const res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('ngo_token');
          throw new Error('Session expired. Please click submit again to reconnect.');
        }
        throw new Error(data.message || 'Submission failed');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setPassword('');
      setMessage('');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card">
        <div className="success-screen">
          <div className="success-icon-wrapper">✔</div>
          <h3>Form Submitted Successfully</h3>
          <p>
            Thank you for connecting with the <strong>She Can Foundation</strong>. Your response has been securely saved.
          </p>
          <button className="btn-primary" onClick={() => setSubmitted(false)}>
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2>Get in Touch</h2>
        <p>She Can Foundation — Empowering women in tech and leadership</p>
      </div>

      {apiError && (
        <div className="alert alert-error">
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Submission Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter a security password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Message / Inquiry</label>
          <textarea
            className="form-input"
            placeholder="How can we help you or support your journey?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Submit Response'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
