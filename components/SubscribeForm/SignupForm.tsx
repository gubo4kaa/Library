'use client'
import React, { useState } from 'react';

const SignupForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formUrl = 'https://uiscore.lemonsqueezy.com/email-subscribe/external'
  const redirectUrl = 'http://localhost:3000'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        body: new FormData(e.currentTarget),
      });

      setLoading(false);

      if (response.ok) {
        // Redirect the subscriber
        window.location.href = redirectUrl;
      } else {
        // Something went wrong subscribing the user
        alert('Sorry, we couldn\'t subscribe you.');
      }
    } catch (error) {
      setLoading(false);
      alert('Sorry, there was an issue: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label><br />
        <input type="text" name="name" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label><br />
        <input type="email" name="email" id="email" required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default SignupForm;
