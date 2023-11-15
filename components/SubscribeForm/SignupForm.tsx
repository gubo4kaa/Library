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
      if (response.ok) {
        console.log(response)
        // window.location.href = redirectUrl;
        setLoading(false)
      } else {
        // Something went wrong subscribing the user
        alert('Sorry, we couldn\'t subscribe you.');
      }
    } catch (error) {
      alert('Sorry, there was an issue: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
