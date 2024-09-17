document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const endButton = document.getElementById('end-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('quiz-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const timerElement = document.getElementById('timer');

    let shuffledQuestions, currentQuestionIndex;
    let timeLeft, timerInterval;
    let score = 0;

    const questions = [
        {
            question: "What is an Advanced Persistent Threat (APT)?",
            answers: [
                { text: "A temporary attack on a network", correct: false },
                { text: "A long-term targeted attack on a network", correct: true },
                { text: "An accidental security breach", correct: false },
                { text: "A type of phishing attack", correct: false }
            ]
        },
        {
            question: "Which technology uses AI to detect anomalies in user behavior?",
            answers: [
                { text: "Firewalls", correct: false },
                { text: "Antivirus software", correct: false },
                { text: "Behavioral Analytics", correct: true },
                { text: "VPNs", correct: false }
            ]
        },
        {
            question: "What is the primary purpose of threat intelligence?",
            answers: [
                { text: "To encrypt data", correct: false },
                { text: "To gather information about potential and existing threats", correct: true },
                { text: "To block spam emails", correct: false },
                { text: "To manage user permissions", correct: false }
            ]
        },
        {
            question: "Which of the following is a technique used in machine learning for cybersecurity?",
            answers: [
                { text: "Supervised Learning", correct: true },
                { text: "Password Management", correct: false },
                { text: "Network Segmentation", correct: false },
                { text: "VPN Tunneling", correct: false }
            ]
        },
        {
            question: "What is Quantum Cryptography primarily used for?",
            answers: [
                { text: "Fast data compression", correct: false },
                { text: "Secure communication using quantum mechanics", correct: true },
                { text: "Enhancing graphics performance", correct: false },
                { text: "Managing digital certificates", correct: false }
            ]
        },
        {
            question: "What technology underlies cryptocurrencies like Bitcoin?",
            answers: [
                { text: "Machine Learning", correct: false },
                { text: "Blockchain", correct: true },
                { text: "Quantum Computing", correct: false },
                { text: "Artificial Intelligence", correct: false }
            ]
        },
        {
            question: "What is a Zero-Knowledge Proof?",
            answers: [
                { text: "A proof that reveals no information except the validity of the statement", correct: true },
                { text: "A method of encryption", correct: false },
                { text: "A type of firewall", correct: false },
                { text: "A form of data backup", correct: false }
            ]
        },
        {
            question: "Which cryptographic protocol is commonly used to secure internet communication?",
            answers: [
                { text: "TLS", correct: true },
                { text: "FTP", correct: false },
                { text: "SSH", correct: false },
                { text: "HTTP", correct: false }
            ]
        },
        {
            question: "What is the goal of the Secure Software Development Lifecycle (SDLC)?",
            answers: [
                { text: "To improve software functionality", correct: false },
                { text: "To integrate security at every phase of software development", correct: true },
                { text: "To speed up development time", correct: false },
                { text: "To increase software usability", correct: false }
            ]
        },
        {
            question: "What is threat modeling?",
            answers: [
                { text: "A technique to visualize and assess potential threats", correct: true },
                { text: "A method to encrypt data", correct: false },
                { text: "A type of firewall", correct: false },
                { text: "A way to design user interfaces", correct: false }
            ]
        },
        {
            question: "Which security framework is provided by NIST?",
            answers: [
                { text: "ISO/IEC 27001", correct: false },
                { text: "GDPR", correct: false },
                { text: "CSF (Cybersecurity Framework)", correct: true },
                { text: "HIPAA", correct: false }
            ]
        },
        {
            question: "What is the main focus of container security?",
            answers: [
                { text: "To secure the network", correct: false },
                { text: "To protect containerized applications from vulnerabilities", correct: true },
                { text: "To manage data encryption", correct: false },
                { text: "To handle user authentication", correct: false }
            ]
        },
        {
            question: "What is the purpose of digital forensics?",
            answers: [
                { text: "To encrypt data", correct: false },
                { text: "To analyze digital evidence for legal cases", correct: true },
                { text: "To prevent network attacks", correct: false },
                { text: "To improve software performance", correct: false }
            ]
        },
        {
            question: "What does malware analysis involve?",
            answers: [
                { text: "Developing new software", correct: false },
                { text: "Identifying and understanding malicious software", correct: true },
                { text: "Writing secure code", correct: false },
                { text: "Conducting network audits", correct: false }
            ]
        },
        {
            question: "What is the main goal of threat hunting?",
            answers: [
                { text: "To track and neutralize threats proactively", correct: true },
                { text: "To manage network traffic", correct: false },
                { text: "To encrypt sensitive data", correct: false },
                { text: "To configure firewalls", correct: false }
            ]
        },
        {
            question: "Which tool is commonly used for reverse engineering malware?",
            answers: [
                { text: "Wireshark", correct: false },
                { text: "Nmap", correct: false },
                { text: "IDA Pro", correct: true },
                { text: "Burp Suite", correct: false }
            ]
        },
        {
            question: "What does GDPR stand for?",
            answers: [
                { text: "General Data Protection Regulation", correct: true },
                { text: "Global Data Privacy Regulation", correct: false },
                { text: "General Data Policy Regulation", correct: false },
                { text: "Global Data Protection Rules", correct: false }
            ]
        },
        {
            question: "Which of the following is a requirement of the CCPA?",
            answers: [
                { text: "Encrypting all internet traffic", correct: false },
                { text: "Allowing consumers to opt out of data selling", correct: true },
                { text: "Installing antivirus software", correct: false },
                { text: "Using firewalls on all networks", correct: false }
            ]
        },
        {
            question: "What is ethical hacking?",
            answers: [
                { text: "Hacking for fun", correct: false },
                { text: "Hacking with permission to improve security", correct: true },
                { text: "Hacking for financial gain", correct: false },
                { text: "Hacking to disrupt services", correct: false }
            ]
        },
        {
            question: "What is the primary focus of data breach notification laws?",
            answers: [
                { text: "To improve network speed", correct: false },
                { text: "To ensure timely notification of data breaches to affected parties", correct: true },
                { text: "To manage software licenses", correct: false },
                { text: "To configure network devices", correct: false }
            ]
        }
    ];

    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    endButton.addEventListener('click', endQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        endButton.classList.add('hide');
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
            endButton.classList.remove('hide');
        } else {
            nextButton.classList.remove('hide');
            endButton.classList.add('hide');
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
        if (correct) {
            score++;
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
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
        timerElement.innerText = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                currentQuestionIndex++;
                if (currentQuestionIndex < shuffledQuestions.length) {
                    setNextQuestion();
                    startTimer();
                } else {
                    endQuiz();
                }
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionContainerElement.classList.add('hide');
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        alert(`Quiz ended! Your final score is: ${score}`);
    }
});
