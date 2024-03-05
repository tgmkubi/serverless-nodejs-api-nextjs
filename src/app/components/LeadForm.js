import React, { useState } from "react";

function LeadForm() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, description }),
      });

      if (response.ok) {
        setSuccessMessage("Lead created successfully!");
        setEmail("");
        setDescription("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      setErrorMessage("An error occurred while creating lead.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "black" }}>
      <h2>Create Lead</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <label htmlFor="email" style={{ color: "red" }}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description" style={{ color: "red" }}>Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ color: "red", padding: "20px", background: "pink" }}>Create Lead</button>
    </form>
  );
}

export default LeadForm;
