import React, { useContext } from 'react';
import { QuizContext } from './QuizProvider'; 
import Question from './Question';
import Result from './Results';
import './style.css'; 

const Quiz = () => {
    const { questions, quizFinished } = useContext(QuizContext); 

    if (!questions || questions.length === 0) {
        return <div>No questions available</div>;
    }

    return (
        <div>
            {!quizFinished ? <Question /> : <Result />} {}
        </div>
    );
};

export default Quiz;
