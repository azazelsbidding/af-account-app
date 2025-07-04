import React, { useState, useEffect } from 'react';

import './App.css';

interface FormData {
  first: string;
  middle: string;
  last: string;
  email: string;
  date: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first: '',
    middle: '',
    last: '',
    email: '',
    date: '',
  });

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // Autofill date with today's date on mount
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (): boolean => {
    return (
      formData.first.trim() !== '' &&
      formData.last.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.date.trim() !== ''
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setSubmittedData(formData);
  };

  return (
  <div>
    <h1>Dynamic Webform App</h1>
    <p className="intro-text">
      Please fill out the form below. First Name, Last Name, Email, and Date are required fields.
    </p>

    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="first"
        placeholder="First Name *"
        value={formData.first}
        onChange={handleChange}
      />
      <input
        type="text"
        name="middle"
        placeholder="Middle Name"
        value={formData.middle}
        onChange={handleChange}
      />
      <input
        type="text"
        name="last"
        placeholder="Last Name *"
        value={formData.last}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address *"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        placeholder="Date *"
        value={formData.date}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={!isFormValid()}
        className="submit-button"
      >
        Submit
      </button>
    </form>

    {submittedData && (
      <div className="submitted-data">
        <h2>Submitted Data:</h2>
        <p><strong>First Name:</strong> {submittedData.first}</p>
        <p><strong>Middle Name:</strong> {submittedData.middle}</p>
        <p><strong>Last Name:</strong> {submittedData.last}</p>
        <p><strong>Email:</strong> {submittedData.email}</p>
        <p><strong>Date:</strong> {submittedData.date}</p>
      </div>
    )}
  </div>
);

};

export default App;
