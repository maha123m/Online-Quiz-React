import React from 'react';
import { QuizProvider } from './components/Online Quiz/QuizProvider'; 
import Quiz from './components/Online Quiz/Quiz';

const App = () => {
    return (
        <QuizProvider>
            <Quiz />
        </QuizProvider>
    );
};

export default App;
