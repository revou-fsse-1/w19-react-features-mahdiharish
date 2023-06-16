import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';

function Dashboard() {
  const [data, setData] = useState('');
  const { token } = useContext(UserContext); // Retrieve the token from UserContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mock-api.arikmpt.com/api/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.text();
          setData(data);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [token]); // Add token as a dependency to re-fetch data when the token changes

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
