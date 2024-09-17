document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is a strong password?",
            answers: [
                { text: "123456", correct: false },
                { text: "yourname1", correct: false },
                { text: "P@ssw0rd!123", correct: true },
                { text: "password", correct: false }
            ]
        },
        {
            question: "Which of the following is a common sign of a phishing email?",
            answers: [
                { text: "Personalized greeting", correct: false },
                { text: "Asking for personal information", correct: true },
                { text: "Proper grammar", correct: false },
                { text: "Sent from a known email address", correct: false }
            ]
        },
        {
            question: "What should you do if a website looks suspicious?",
            answers: [
                { text: "Continue browsing", correct: false },
                { text: "Close the browser immediately", correct: true },
                { text: "Click on all links to check them", correct: false },
                { text: "Share the website with friends", correct: false }
            ]
        },
        {
            question: "Which of the following is the safest way to create a password?",
            answers: [
                { text: "Using your birthdate", correct: false },
                { text: "Using a mix of letters, numbers, and symbols", correct: true },
                { text: "Using your pet's name", correct: false },
                { text: "Using 'password'", correct: false }
            ]
        },
        {
            question: "How can you protect your social media accounts?",
            answers: [
                { text: "Share your password with friends", correct: false },
                { text: "Use the same password for all accounts", correct: false },
                { text: "Enable privacy settings", correct: true },
                { text: "Post personal information regularly", correct: false }
            ]
        },
        {
            question: "Why are software updates important?",
            answers: [
                { text: "They make your computer slower", correct: false },
                { text: "They add new games", correct: false },
                { text: "They fix security vulnerabilities", correct: true },
                { text: "They change your desktop background", correct: false }
            ]
        },
        {
            question: "What should you do when using public Wi-Fi?",
            answers: [
                { text: "Access sensitive accounts", correct: false },
                { text: "Use a VPN", correct: true },
                { text: "Share your connection with others", correct: false },
                { text: "Disable security features", correct: false }
            ]
        },
        {
            question: "How can you recognize a scam call?",
            answers: [
                { text: "The caller is very polite", correct: false },
                { text: "The caller asks for personal information", correct: true },
                { text: "The caller offers a free vacation", correct: false },
                { text: "The caller is from a well-known company", correct: false }
            ]
        },
        {
            question: "What does two-factor authentication (2FA) provide?",
            answers: [
                { text: "Less security", correct: false },
                { text: "Double protection", correct: true },
                { text: "Faster login", correct: false },
                { text: "No protection", correct: false }
            ]
        },
        {
            question: "How can you keep your email secure?",
            answers: [
                { text: "Use the same password for all emails", correct: false },
                { text: "Share your email password", correct: false },
                { text: "Use email filters", correct: true },
                { text: "Click on all email links", correct: false }
            ]
        },
        {
            question: "What is the best practice for device security?",
            answers: [
                { text: "Leaving it unlocked", correct: false },
                { text: "Setting a strong lock screen password", correct: true },
                { text: "Using a public charging station", correct: false },
                { text: "Sharing it with friends", correct: false }
            ]
        },
        {
            question: "How can you tell if a website is secure?",
            answers: [
                { text: "It has lots of ads", correct: false },
                { text: "The URL starts with 'http'", correct: false },
                { text: "The URL starts with 'https'", correct: true },
                { text: "It has a flashy design", correct: false }
            ]
        },
        {
            question: "Why should you avoid clicking on pop-up ads?",
            answers: [
                { text: "They are fun", correct: false },
                { text: "They often contain malware", correct: true },
                { text: "They provide useful information", correct: false },
                { text: "They lead to trusted websites", correct: false }
            ]
        },
        {
            question: "What is a phishing attack trying to do?",
            answers: [
                { text: "Entertain you", correct: false },
                { text: "Steal your personal information", correct: true },
                { text: "Improve your computer’s speed", correct: false },
                { text: "Offer you a job", correct: false }
            ]
        },
        {
            question: "Which of the following should you never do with your password?",
            answers: [
                { text: "Write it down and keep it in a safe place", correct: false },
                { text: "Share it with a trusted friend", correct: false },
                { text: "Use a password manager", correct: false },
                { text: "Use it on multiple sites", correct: true }
            ]
        },
        {
            question: "What can help you remember complex passwords?",
            answers: [
                { text: "Writing them on sticky notes", correct: false },
                { text: "Using a password manager", correct: true },
                { text: "Using simple passwords", correct: false },
                { text: "Not using passwords at all", correct: false }
            ]
        },
        {
            question: "What is the main purpose of encryption?",
            answers: [
                { text: "To speed up your internet", correct: false },
                { text: "To secure your data", correct: true },
                { text: "To make files larger", correct: false },
                { text: "To annoy hackers", correct: false }
            ]
        },
        {
            question: "How can you safely dispose of an old computer?",
            answers: [
                { text: "Throw it in the trash", correct: false },
                { text: "Wipe the hard drive and recycle", correct: true },
                { text: "Sell it without erasing data", correct: false },
                { text: "Keep it in storage", correct: false }
            ]
        },
        {
            question: "What should you do if you receive a suspicious email attachment?",
            answers: [
                { text: "Open it to see what it is", correct: false },
                { text: "Delete it immediately", correct: true },
                { text: "Forward it to friends", correct: false },
                { text: "Reply to the sender", correct: false }
            ]
        },
        {
            question: "What’s a good habit for online shopping?",
            answers: [
                { text: "Save your card details on every site", correct: false },
                { text: "Use public Wi-Fi", correct: false },
                { text: "Shop from trusted websites", correct: true },
                { text: "Ignore security warnings", correct: false }
            ]
        }
    ];

    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const timerElement = document.getElementById('timer');
    let currentQuestionIndex, shuffledQuestions, timer, timeLeft;

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startQuiz() {
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        nextButton.classList.add('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            nextButton.innerText = 'Restart';
            nextButton.classList.remove('hide');
            nextButton.addEventListener('click', startQuiz);
        }
        stopTimer();
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function startTimer() {
        timeLeft = 30;
        timerElement.innerText = `Time: ${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showTimeUpMessage();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function showTimeUpMessage() {
        alert('Time is up!');
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            nextButton.innerText = 'Restart';
            nextButton.classList.remove('hide');
        }
    }

    startQuiz();
});

