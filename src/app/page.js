"use client";
import { useState, useEffect } from "react";
import LeadForm from "../components/LeadForm";

export default function Home() {
  const [leadData, setLeadData] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(
          "/api/leads"
        );
        const data = await response.json();
        setLeadData(data.results);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>LEADS</h1>
      {leadData.length > 0 ? (
        <ul>
          {leadData.map((lead) => (
            <li key={lead.id}>
              <p>Email: {lead.email}</p>
              <p>Description: {lead.description}</p>
              <p>Created At: {new Date(lead.createdAt).toLocaleString()}</p>
              <p>-------------------------------------</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Loading...</h2>
      )}
      <LeadForm></LeadForm>
    </main>
  );
}
