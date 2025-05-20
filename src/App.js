import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function PaymentBoard() {
  const [chain, setChain] = useState([]);
  const [weekdayTotals, setWeekdayTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetch('http://localhost:3000/chain')
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setChain(data);
        setLoading(false);
        processWeekdayTotals(data);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const processWeekdayTotals = (chainData) => {
    const totals = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0
    };

    chainData.forEach(block => {
      block.transactions.forEach(tx => {
        const day = new Date(tx.timestamp).getDay();
        const dayName = WEEKDAYS[day];
        totals[dayName] += Number(tx.amount);
      });
    });

    setWeekdayTotals(totals);
  };

  const lineChartData = {
    labels: WEEKDAYS,
    datasets: [
      {
        label: 'Total Payments by Weekday',
        data: WEEKDAYS.map(day => weekdayTotals[day] || 0),
        borderColor: '#4b6cb7',
        backgroundColor: 'rgba(75, 108, 183, 0.2)',
        pointBackgroundColor: '#4b6cb7',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50
        }
      }
    }
  };

  if (loading) return <p style={styles.loading}>Loading payments...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Dashboard</h2>

      <div style={styles.card}>
        <h3 style={styles.subheading}>Total Payments by Weekday</h3>
        <Line data={lineChartData} options={chartOptions} />
      </div>

      <h3 style={styles.subheading}>All Transactions</h3>
      {chain.map((block, index) => (
        <div key={block.hash || index} style={styles.blockCard}>
          {/* Display block hash or timestamp instead of index */}
          <h4 style={styles.blockTitle}>Block at {new Date(block.timestamp).toLocaleString()}</h4>
          <p><strong>Hash:</strong> {block.hash}</p>
          <p><strong>Previous Hash:</strong> {block.previousHash}</p>

          {block.transactions.length === 0 ? (
            <p>No transactions in this block.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>From (Name)</th>
                    <th style={styles.th}>To (Name)</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Message</th>
                    <th style={styles.th}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {block.transactions.map((tx, idx) => (
                    <tr key={idx}>
                      <td style={styles.td}>{tx.fromUser || tx.from || '—'}</td>
                      <td style={styles.td}>{tx.toUser || tx.to || '—'}</td>
                      <td style={styles.td}>{tx.amount}</td>
                      <td style={styles.td}>{tx.message}</td>
                      <td style={styles.td}>{new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333'
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1.5rem'
  },
  subheading: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #ccc',
    paddingBottom: '0.5rem'
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    marginBottom: '2rem'
  },
  blockCard: {
    backgroundColor: '#f5f7fa',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid #ddd'
  },
  blockTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#eaeaea',
    borderBottom: '2px solid #ccc'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  },
  loading: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem'
  }
};

export default PaymentBoard;
