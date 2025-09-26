import React, { useEffect, useState } from 'react';
import './index.css';
import useAuth from '../../../hooks/useAuth';

const DeliveryLogs = ({ cohortId, showForm, setShowForm, searchTerm }) => {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLog, setNewLog] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`http://localhost:4000/logs/cohorts/${cohortId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setLogs(data.data?.deliveryLogs || []);
      } catch (err) {
        console.error('Error fetching delivery logs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (cohortId) {
      fetchLogs();
    }
  }, [cohortId, token]);

  const handleSave = async () => {
    if (!newLog.title.trim() || !newLog.content.trim()) return;
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const localDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      const res = await fetch(`http://localhost:4000/logs/cohorts/${cohortId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newLog.title,
          content: newLog.content,
          date: localDateTime
        })
      });

      if (!res.ok) throw new Error('Failed to create log');

      const data = await res.json();
      setLogs((prev) => [...prev, data.data.deliveryLog]);
      setNewLog({ title: '', content: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error saving delivery log:', err);
    }
  };

  if (loading) return <p>Loading delivery logs...</p>;

  const filteredLogs = logs.filter(
    (log) =>
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="delivery-logs">
      {showForm ? (
        <div className="log-add-form">
          <input
            type="text"
            placeholder="Log title"
            value={newLog.title}
            onChange={(e) => setNewLog({ ...newLog, title: e.target.value })}
          />
          <textarea
            placeholder="Write the log..."
            value={newLog.content}
            onChange={(e) => setNewLog({ ...newLog, content: e.target.value })}
          />
          <div className="log-actions">
            <button className="cancel-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="logs-list">
          {filteredLogs.map((log) => (
            <div key={log.id} className="log-item">
              <div className="log-header">
                <span className="log-date">
                  {new Date(log.date).toLocaleDateString('nl-NL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}{' '}
                  {new Date(log.date).toLocaleTimeString('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </span>
                {log.edited && <span className="log-edited">Edited</span>}
              </div>
              <h5 className="log-title">{log.title}</h5>
              <p className="log-content">{log.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryLogs;
