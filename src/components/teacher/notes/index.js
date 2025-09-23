import React, { useEffect, useState } from 'react';
import './index.css';
import useAuth from '../../../hooks/useAuth';

const NotesPanel = ({ student }) => {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (!student?.id) return;

    const fetchNotes = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${student.id}/notes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log('Fetched notes:', data);
        setNotes(data.data?.data || []);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, [student, token]);

  const filteredNotes = notes.filter((note) =>
    note.text?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!newNote.trim() || !student?.id) return;

    const now = new Date();
    const payload = {
      title: 'Note',
      text: newNote,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0]
    };

    try {
      const res = await fetch(`http://localhost:4000/users/${student.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('Saved note:', data);

      if (res.ok && data.data?.note) {
        setNotes([...notes, data.data.note]);
      }

      setNewNote('');
      setShowForm(false);
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <h4>Notes</h4>
        {!showForm ? (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            +
          </button>
        ) : (
          <button className="close-btn" onClick={() => setShowForm(false)}>
            ×
          </button>
        )}
      </div>

      <div className={`student-info ${showForm ? 'with-underline' : ''}`}>
        <div className="avatar">{student?.firstName?.[0] || 'S'}</div>
        <div>
          <p className="student-name">
            {student?.firstName} {student?.lastName}
          </p>
          <p className="student-course">
            {student?.course || 'Software Development'}, Cohort {student?.cohortId || 1}
          </p>
        </div>
      </div>

      {showForm ? (
        <div className="note-add-form">
          <textarea
            className="note-textarea"
            placeholder="Write your note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <div className="note-actions">
            <button className="cancel-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="notes-list">
            {filteredNotes.map((note) => (
              <div key={note.id} className="note-item">
                <p className="note-text">{note.text}</p>
                <small className="note-date">
                  {note.date} {note.time}
                </small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesPanel;
