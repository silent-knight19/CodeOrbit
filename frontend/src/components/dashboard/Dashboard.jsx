import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId=localStorage.getItem("userId");
  
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        // Using the working endpoint from the logs: /api/repo/user/:userId
        const response = await fetch(`${API_BASE_URL}/repo/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // The response seems to be an array directly, not wrapped in a repositories object
        setRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to load repositories. Please try again later.');
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRepositories();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [userId]);

  const fetchSuggestedRepositories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/repo/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSuggestedRepositories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching suggested repositories:', err);
      setError('Failed to load suggested repositories. Please try again later.');
      setSuggestedRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Your Repositories</h2>
      {repositories.length === 0 ? (
        <p>No repositories found. Create your first repository to get started!</p>
      ) : (
        <ul>
          {repositories.map(repo => (
            <li key={repo._id}>
              <h3>{repo.name}</h3>
              {repo.description && <p>{repo.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;