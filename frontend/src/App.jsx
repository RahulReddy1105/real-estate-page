import React, { useState, useEffect } from 'react';
import './App.css';

// Import assets
import logo from './assets/images/logo.svg'; 
import heroImage from './assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // 1. This handles typing in the input boxes
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (message.type === 'success') {
      const t = setTimeout(() => setMessage({ type: '', text: '' }), 4500);
      return () => clearTimeout(t);
    }
  }, [message.type]);

  // 2. This sends the data to your backend (uses VITE_API_URL in production)
  const validate = () => {
    if (!formData.name.trim()) { setMessage({type:'error', text:'Please enter your name.'}); return false; }
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(formData.email)) { setMessage({type:'error', text:'Please enter a valid email address.'}); return false; }
    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length < 7) { setMessage({type:'error', text:'Please enter a valid phone number.'}); return false; }
    setMessage({type:'', text:''});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Lead submitted successfully!' });
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Failed to connect to server. Is the backend deployed?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Company Logo" className="logo-img" onError={(e) => {e.target.style.display='none';}} />
          <span style={{fontWeight:'bold', fontSize:'1.2rem', marginLeft:'10px'}}>FliprRealEstate</span>
        </div>
        <div className="nav-links">
          <button onClick={() => document.getElementById('lead-form')?.scrollIntoView({behavior:'smooth'})}>Contact Us</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Home With Confidence</h1>
          <p>We connect you with the best properties and agents in the market. Get a free consultation today.</p>
          
          {/* Lead Gen Form */}
          <div className="form-container" id="lead-form">
            <h3>Get a Free Consultation</h3>
            <form onSubmit={handleSubmit} aria-describedby="form-message">
              <div role="status" aria-live="polite" id="form-message" className={`form-message ${message.type}`}>
                {message.text && <span>{message.text}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  value={formData.name}
                  placeholder="Full Name" 
                  required 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  value={formData.email}
                  placeholder="Email Address" 
                  required 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input 
                  id="phone"
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  placeholder="Phone Number" 
                  required 
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Sending...' : 'Request Call Back'}</button>
            </form>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Real Estate Consultation" loading="lazy" />
        </div>
      </section>
    </div>
  );
}

export default App;