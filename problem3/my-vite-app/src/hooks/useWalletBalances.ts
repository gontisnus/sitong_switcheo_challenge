import { useEffect, useState } from 'react'

function useWalletBalances() {
    const [balances, setBalances] = useState([]);
  
    useEffect(() => {
      // Fetch data from the local JSON file, pretend there is database for balance
      const fetchBalances = async () => {
        try {
          const response = await fetch('/balances.json'); 
          if (!response.ok) {
            throw new Error('Failed to fetch from json');
          }
          const data = await response.json();
          setBalances(data);
        } catch (error) {
          console.error('Failed to fetch balances:', error);
        }
      };
  
      fetchBalances();
    }, []);
  
    return balances;
  }
  
  export default useWalletBalances;