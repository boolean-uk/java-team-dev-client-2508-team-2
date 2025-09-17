import React from 'react';
import Card from '../card';
import './index.css';

const ExercisesCard = () => {
    const exercisesData = {
        // Hardcoded for now
        modules: '2/7 completed',
        units: '4/10 completed',
        exercises: '34/58 completed',
    };

    return (
        <Card>
            <h3>My Exercises</h3>
            <ul className="exercises-list">
                <li><strong>Modules:</strong> {exercisesData.modules}</li>
                <li><strong>Units:</strong> {exercisesData.units}</li>
                <li><strong>Exercises:</strong> {exercisesData.exercises}</li>
            </ul>
            <button className="exercises-button">See Exercises</button>
        </Card>
    );
};

export default ExercisesCard;
