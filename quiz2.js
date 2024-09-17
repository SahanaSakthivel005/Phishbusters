document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const endButton = document.getElementById('end-btn'); // Add this line
    const questionContainerElement = document.getElementById('quiz-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const timerElement = document.getElementById('timer');

    let shuffledQuestions, currentQuestionIndex;
    let timeLeft, timerInterval;
    let score = 0; // Add this line to keep track of the score

    const questions = [
        {
            question: "What does a DDoS attack primarily target?",
            answers: [
                { text: "Confidentiality of data", correct: false },
                { text: "Integrity of data", correct: false },
                { text: "Availability of services", correct: true },
                { text: "Authentication of users", correct: false }
            ]
        },
        {
            question: "Which of the following best describes a Man-in-the-Middle (MitM) attack?",
            answers: [
                { text: "An attacker intercepts and alters communication between two parties", correct: true },
                { text: "An attacker floods a network with excessive traffic", correct: false },
                { text: "An attacker gains unauthorized access to a system", correct: false },
                { text: "An attacker steals passwords using phishing emails", correct: false }
            ]
        },
        {
            question: "What is the primary function of a firewall?",
            answers: [
                { text: "To block unauthorized access while permitting outward communication", correct: true },
                { text: "To encrypt data on a network", correct: false },
                { text: "To detect malware on a system", correct: false },
                { text: "To manage user accounts", correct: false }
            ]
        },
        {
            question: "How does a VPN enhance network security?",
            answers: [
                { text: "By blocking all incoming traffic", correct: false },
                { text: "By encrypting data transmitted over the internet", correct: true },
                { text: "By storing data in a secure location", correct: false },
                { text: "By providing faster internet speeds", correct: false }
            ]
        },
        {
            question: "What type of encryption uses the same key for both encryption and decryption?",
            answers: [
                { text: "Asymmetric encryption", correct: false },
                { text: "Symmetric encryption", correct: true },
                { text: "Hashing", correct: false },
                { text: "Digital signatures", correct: false }
            ]
        },
        {
            question: "Which algorithm is an example of asymmetric encryption?",
            answers: [
                { text: "AES", correct: false },
                { text: "DES", correct: false },
                { text: "RSA", correct: true },
                { text: "MD5", correct: false }
            ]
        },
        {
            question: "What is the primary use of hashing in cybersecurity?",
            answers: [
                { text: "To encrypt data for secure communication", correct: false },
                { text: "To verify the integrity of data", correct: true },
                { text: "To compress large files", correct: false },
                { text: "To manage network traffic", correct: false }
            ]
        },
        {
            question: "Digital certificates are used primarily for:",
            answers: [
                { text: "Encrypting large files", correct: false },
                { text: "Authenticating the identity of websites and users", correct: true },
                { text: "Blocking unauthorized access to networks", correct: false },
                { text: "Scanning for malware", correct: false }
            ]
        },
        {
            question: "Which practice helps prevent SQL Injection attacks?",
            answers: [
                { text: "Using encryption for data storage", correct: false },
                { text: "Implementing prepared statements with parameterized queries", correct: true },
                { text: "Setting strong passwords", correct: false },
                { text: "Using HTTPS for communication", correct: false }
            ]
        },
        {
            question: "What is a common mitigation for Cross-Site Scripting (XSS) attacks?",
            answers: [
                { text: "Enabling two-factor authentication", correct: false },
                { text: "Sanitizing and validating user input", correct: true },
                { text: "Using a VPN", correct: false },
                { text: "Encrypting database backups", correct: false }
            ]
        },
        {
            question: "Which of the following is NOT a function of an Intrusion Detection System (IDS)?",
            answers: [
                { text: "Detecting malicious activity", correct: false },
                { text: "Blocking malicious traffic", correct: true },
                { text: "Logging security events", correct: false },
                { text: "Alerting administrators of suspicious activity", correct: false }
            ]
        },
        {
            question: "What does network segmentation aim to achieve?",
            answers: [
                { text: "Increasing network speed", correct: false },
                { text: "Isolating critical parts of the network to enhance security", correct: true },
                { text: "Simplifying network management", correct: false },
                { text: "Reducing network costs", correct: false }
            ]
        },
        {
            question: "Which of the following is NOT a characteristic of hashing functions?",
            answers: [
                { text: "They produce a fixed-size output", correct: false },
                { text: "They are reversible", correct: true },
                { text: "They are unique for different inputs", correct: false },
                { text: "They can be used for data integrity verification", correct: false }
            ]
        },
        {
            question: "Which encryption algorithm is widely used for securing email communication?",
            answers: [
                { text: "AES", correct: false },
                { text: "RSA", correct: false },
                { text: "PGP", correct: true },
                { text: "DES", correct: false }
            ]
        },
        {
            question: "What is the purpose of security headers in web applications?",
            answers: [
                { text: "To increase the speed of the website", correct: false },
                { text: "To provide additional layers of security by instructing the browser on how to handle content", correct: true },
                { text: "To enable user authentication", correct: false },
                { text: "To store user credentials securely", correct: false }
            ]
        },
        {
            question: "Which protocol ensures secure communication over the internet by encrypting the data exchanged between a web server and a browser?",
            answers: [
                { text: "HTTP", correct: false },
                { text: "FTP", correct: false },
                { text: "HTTPS", correct: true },
                { text: "SMTP", correct: false }
            ]
        },
        {
            question: "What is the primary function of Endpoint Detection and Response (EDR) solutions?",
            answers: [
                { text: "To block all incoming traffic", correct: false },
                { text: "To monitor and respond to suspicious activities on endpoints", correct: true },
                { text: "To provide secure communication tunnels", correct: false },
                { text: "To encrypt data on storage devices", correct: false }
            ]
        },
        {
            question: "Which of the following is NOT typically part of a secure endpoint configuration?",
            answers: [
                { text: "Disabling unnecessary services", correct: false },
                { text: "Regularly updating software and applying patches", correct: false },
                { text: "Using default passwords", correct: true },
                { text: "Enforcing strict access controls", correct: false }
            ]
        },
        {
            question: "What is the first step in the incident response process?",
            answers: [
                { text: "Eradication", correct: false },
                { text: "Recovery", correct: false },
                { text: "Preparation", correct: true },
                { text: "Containment", correct: false }
            ]
        },
        {
            question: "What is the main goal of post-incident analysis?",
            answers: [
                { text: "To blame the responsible party", correct: false },
                { text: "To improve future incident response and prevent recurrence", correct: true },
                { text: "To delete all affected data", correct: false },
                { text: "To restore systems to normal operation", correct: false }
            ]
        }
    ];

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    endButton.addEventListener('click', endQuiz); // Add this line

    function startQuiz() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
        startTimer();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
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

        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            nextButton.classList.add('hide');
            endButton.classList.remove('hide'); // Show the end button on the last question
        } else {
            nextButton.classList.remove('hide');
            endButton.classList.add('hide'); // Hide the end button if it's not the last question
        }
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
        if (correct) {
            score++; // Increment score if the answer is correct
        }
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
            clearInterval(timerInterval); // Stop the timer when the quiz ends
        }
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
        timeLeft = 300;
        timerElement.innerText = `Time left: ${timeLeft}`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `Time left: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                selectAnswer({ target: { dataset: {} } }); // Automatically select a wrong answer when time is up
                if (shuffledQuestions.length > currentQuestionIndex + 1) {
                    currentQuestionIndex++;
                    setNextQuestion();
                    startTimer();
                } else { 
                    startButton.innerText = 'Restart';
                    startButton.classList.remove('hide');
                }
            }
        }, 1000);
    }

    function endQuiz() { // Add this function to handle the end of the quiz
        clearInterval(timerInterval); // Stop the timer
        questionContainerElement.classList.add('hide'); // Hide the quiz container
        endButton.classList.add('hide'); // Hide the end button
        startButton.innerText = 'Restart'; // Change the start button text to 'Restart'
        startButton.classList.remove('hide'); // Show the start button
        alert(`Quiz ended! Your score is: ${score}`); // Show the score
    }
});
