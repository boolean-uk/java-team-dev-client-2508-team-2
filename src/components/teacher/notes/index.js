import React, { useState } from 'react';
import './index.css';
import SearchIcon from '../../../assets/icons/searchIcon';

const NotesPanel = ({ student }) => {
    const [notes] = useState([
        { id: 1, text: 'Student is gemotiveerd en werkt zelfstandig', date: '2025-09-10' },
        { id: 2, text: 'Let op aanwezigheid bij ochtendsessies', date: '2025-09-12' },
        { id: 3, text: 'Goed samengewerkt in projectgroep', date: '2025-09-14' },
    ]);

    const [search, setSearch] = useState('');

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="notes-panel">
            <div className="notes-header">
                <h4>Notes</h4>
                <button className="add-btn">+</button>
            </div>

            <div className="student-info">
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

            <div className="search-wrapper">
                <span className="search-icon">
                    <SearchIcon width={12} height={12} />
                </span>
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
                        <small className="note-date">{note.date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesPanel;
