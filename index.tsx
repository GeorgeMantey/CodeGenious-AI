

import { GoogleGenAI, Chat, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// --- INTERNATIONALIZATION (i18n) ---

const translations = {
    en: {
        langName: "English",
        languageNameForAI: "English",
        header: { title: "CodeGenius AI", subtitle: "An AI-Powered Toolkit for Technology Educators and Learners" },
        suites: { teacher: "Educator Suite", student: "Learner Suite" },
        tabs: {
            // Educator
            projectHub: "Project Hub",
            languageArchitect: "Language Architect",
            documentationGenerator: "Doc Generator",
            codeReviewAssistant: "Code Reviewer",
            projectRubricGenerator: "Project Rubric",
            curriculumPlanner: "Curriculum Planner",
            quizGenerator: "Quiz Generator",
            starterCodeGenerator: "Starter Code",
            cybersecurityAdvisor: "Cyber Advisor",
            hackathonPlanner: "Hackathon Planner",
            devlogGenerator: "Devlog Generator",
            projectIdeaGenerator: "Idea Generator",
            systemDesignHelper: "System Design",
            codeDebugger: "Code Debugger",
            // Learner
            codeInTheWild: "Code in the Wild",
            portfolioBuilder: "Portfolio Builder",
            interviewPrepCenter: "Interview Prep",
            flashcardGenerator: "Flashcard Generator",
            conceptExplainer: "Concept Explainer",
            algorithmSolver: "Algorithm Solver",
            codingArena: "Coding Arena",
            systemDesignVisualizer: "System Visualizer",
            codingTutor: "Coding Tutor",
            languageMasteryPath: "Mastery Path",
        },
        toolInfo: {
            // Educator
            projectHub: "The Project Hub is your command center. Add students to your roster, then assign them AI-generated projects and review their submissions.",
            languageArchitect: "Design a custom programming language from the ground up. Define your own syntax and keywords, and the AI will generate a syntax guide and example programs for your new creation. A powerful tool for teaching the fundamentals of language design.",
            documentationGenerator: "Generate professional, well-structured technical documentation for any project, API, or software library. This tool helps teach the importance of context and audience in technical writing by allowing you to specify the documentation style, the intended audience's technical level, and even include best practices.",
            codeReviewAssistant: "Paste a student's code, and the AI will act as a senior developer, providing a thorough code review with constructive feedback.",
            projectRubricGenerator: "Describe a coding project, and the AI will create a detailed, criteria-based rubric for fair and consistent grading.",
            curriculumPlanner: "Outline your learning objectives, and the AI will build a multi-day curriculum for any tech topic, complete with daily activities and goals.",
            quizGenerator: "Create a rich, multi-format quiz on any tech topic. Select from multiple choice, true/false, short answer, and more. You can even add an AI-generated header image to make it more engaging for students.",
            starterCodeGenerator: "Generate boilerplate/starter code for a project in any language, framework, or platform. Perfect for getting students started quickly.",
            cybersecurityAdvisor: "Describe a system or application, and the AI will generate a checklist of cybersecurity best practices and potential vulnerabilities.",
            hackathonPlanner: "Plan a school hackathon from start to finish. The AI will create a schedule, suggest project themes, and draft judging criteria.",
            devlogGenerator: "Keep parents and stakeholders informed by generating a professional devlog. Just provide the key updates, and the AI will format it.",
            projectIdeaGenerator: "Spark creativity by generating unique and engaging project ideas based on a theme, technology, or API.",
            systemDesignHelper: "From a project description, the AI can map out a high-level system architecture, including client, server, and database components.",
            codeDebugger: "Paste a buggy piece of code, and the AI will identify the error, suggest a fix, and explain the underlying concept to prevent future mistakes.",
            // Learner
            codeInTheWild: "Turn the web into your classroom! Use your camera or upload a screenshot of any website or app, and the AI will analyze its UI and structure.",
            portfolioBuilder: "This is your personal collection of projects and code snippets. Anything you create or find can be saved here for your portfolio.",
            interviewPrepCenter: "Get ready for your next technical interview. This tool creates a personalized study dashboard and generates practice problems.",
            flashcardGenerator: "Enter any tech topic (e.g., 'Git Commands'), and the AI will instantly create a deck of interactive flashcards.",
            conceptExplainer: "Struggling with a tough concept like recursion or APIs? The AI will provide a clear, easy-to-understand explanation with examples.",
            algorithmSolver: "Stuck on an algorithm? The AI can provide a step-by-step explanation and a simple visualization of how it works.",
            codingArena: "Hone your skills in the Coding Arena. The AI acts as your coach, giving you coding challenges and providing instant feedback.",
            systemDesignVisualizer: "Visualize tech infrastructure! Ask for a 'client-server architecture' or a 'load-balanced web app' and see an interactive diagram.",
            languageMasteryPath: "Embark on a guided learning journey! Select a programming language and a globally-recognized curriculum, and the AI will generate a personalized, interactive roadmap to guide you from beginner to proficient.",
            codingTutor: "Your personal AI pair programmer. Ask any coding question, get help with bugs, or request quick challenges on any topic.",
        },
        placeholders: {
            studentName: "e.g., Ada Lovelace",
            languageName: "e.g., 'PixelScript', 'LogicLang'",
            keywordVariable: "e.g., 'create', 'let', 'var'",
            keywordConditional: "e.g., 'check if', 'if'",
            keywordLoop: "e.g., 'repeat while', 'loop'",
            keywordFunction: "e.g., 'procedure', 'define'",
            keywordOutput: "e.g., 'display', 'print'",
            languageGoal: "e.g., 'A program that calculates the area of a rectangle.'",
            docTopic: "e.g., 'A weather data REST API'",
            docCodeSnippet: "Optional: Paste relevant code here to generate documentation for it...",
            curriculumGoals: "e.g., 'Students will understand variables, loops, and functions.'",
            codeSnippet: "Paste student's code here...",
            projectGoal: "e.g., 'A simple Python script to fetch and display a random joke from an API.'",
            taskDescription: "e.g., 'A simple to-do list web application using React. Must include features to add, delete, and mark tasks as complete.'",
            quizTopic: "e.g., 'JavaScript Promises', 'CSS Flexbox'",
            lessonTopic: "e.g., 'Introduction to Python Data Types'",
            differentiationSupport: "e.g., 'Provide code templates for beginners', 'Add a challenge to implement a search feature'",
            materials: "e.g., 'Each student needs a computer with a modern web browser and internet access.'",
            starterCodeProject: "e.g., 'A basic Discord bot in Python'",
            starterCodeLanguage: "e.g., 'Python', 'JavaScript', 'HTML/CSS'",
            cybersecurityContext: "e.g., 'A public-facing e-commerce website with user authentication and payment processing.'",
            hackathonTheme: "e.g., 'AI for Social Good', 'Retro Gaming'",
            hackathonDuration: "e.g., '24 hours', 'Weekend'",
            devlogProjectName: "e.g., 'Grade 10 - Final Capstone Project'",
            devlogUpdates: "e.g., 'This week, students completed their database schemas and began work on the front-end components. We encountered a few challenges with API integration but resolved them.'",
            ideaTheme: "e.g., 'APIs', 'Game Development', 'Data Visualization'",
            systemDesignDesc: "e.g., 'A simple blog application where users can create posts and leave comments.'",
            brokenCode: "Paste the buggy code here...",
            conceptTopic: "e.g., 'What is Object-Oriented Programming?'",
            algorithmProblem: "e.g., 'Explain how bubble sort works on the array [5, 1, 4, 2, 8]'",
            practiceTopic: "e.g., 'Python list manipulation'",
            visualizerPrompt: "e.g., 'A basic client-server architecture'",
            studyGoal: "e.g., 'Ace my upcoming technical interview'",
            tutorChat: "Type your coding question...",
            wildChat: "Ask a follow-up question...",
            viewerChat: "Ask a follow-up question about the model...",
            interviewConcept: "e.g., 'Data Structures', 'Big O Notation'",
            interviewWeakTopics: "e.g., 'Dynamic Programming, System Design'",
            practiceAnswer: "e.g., `return numbers.sort((a, b) => a - b);`",
            flashcardTopic: "e.g., 'Common Git Commands'",
            numFlashcards: "e.g., 10",
            helpChat: "Ask a question about this tool...",
        },
        labels: {
            gradeLevel: "Experience Level:",
            languageName: "Language Name:",
            syntaxStyle: "Syntax Style:",
            customKeywords: "Custom Keywords:",
            keywordVariable: "Variable Declaration:",
            keywordConditional: "Conditional (if/else):",
            keywordLoop: "Loop:",
            keywordFunction: "Function Definition:",
            keywordOutput: "Output/Print:",
            languageGoal: "Example Program Goal:",
            docTopic: "Project/API Topic:",
            docStyle: "Documentation Style:",
            docAudience: "Audience / Technical Level:",
            docBestPractices: "Include 'Best Practices' Section?",
            docCodeSnippet: "Code Snippet to Document (Optional):",
            studentName: "Student's Name:",
            projectGoal: "Project Goal/Description:",
            codeSnippet: "Student's Code Snippet:",
            taskDescription: "Project Description:",
            topic: "Topic / Content Area:",
            numQuestions: "Number of Questions:",
            questionTypes: "Question Types:",
            difficultyLevel: "Difficulty Level:",
            includeImage: "Include Header Image?",
            bloomsLevel: "Cognitive Skill Level:",
            lessonTopic: "Curriculum Topic / Primary Objective(s):",
            lessonStructure: "Curriculum Structure:",
            materials: "Required Tech/Software (Optional):",
            timeAllotment: "Time Allotment (in hours):",
            differentiationSupport: "Specific Learner Needs (Optional):",
            projectName: "Project Name:",
            devlogUpdates: "Key Updates this Period:",
            ideaTheme: "Technology, Theme, or API:",
            systemDesignDesc: "Application or System Description:",
            originalProblem: "Original Goal of the Code:",
            studentWork: "Student's Buggy Code:",
            starterCodeProject: "Project Description:",
            language: "Language/Framework:",
            masteryLanguage: "1. Choose Your Language",
            masteryCurriculum: "2. Select a Curriculum",
            cybersecurityContext: "System or Application Context:",
            experienceLevel: "User/Student Experience Level:",
            location: "Location / Venue:",
            learningGoals: "Learning Goals:",
            conceptTopic: "What tech concept do you want to understand?",
            solverProblem: "Enter your algorithm or data structure question:",
            practiceTopic: "What coding topic do you want to practice?",
            practiceDifficulty: "Select a difficulty level:",
            visualizerPrompt: "What system or architecture do you want to see?",
            studyGoal: "What is your primary interview goal?",
            examSelect: "Select Your Interview Type:",
            hubAddNewStudent: "Add New Student to Roster:",
            practiceAnswer: "Your Answer:",
            readingLevel: "Technical Level:",
            flashcardTopic: "What topic do you want flashcards for?",
            numFlashcards: "Number of Cards:",
        },
        options: {
            docStyle: {
                readme: "README.md (Project Overview)",
                jsdoc: "Code Comments (e.g., JSDoc)",
                api: "API Reference (for REST APIs)",
            },
            docAudience: {
                beginner: "Beginner (Simple explanations)",
                intermediate: "Intermediate (Assumes some knowledge)",
                advanced: "Advanced (Concise, for experts)",
            },
            syntaxStyle: {
                cStyle: "C-Style (uses { } brackets)",
                pythonStyle: "Python-Style (uses indentation)",
                lispStyle: "LISP-Style (uses parentheses)"
            }
        },
        questionTypes: {
            multipleChoice: "Multiple Choice",
            trueFalse: "True/False",
            shortAnswer: "Short Answer",
            fillInTheBlanks: "Fill in the Blanks",
            matching: "Matching Test"
        },
        curricula: {
            international: {
                name: "International Curricula",
                options: {
                    "ib": "International Baccalaureate (IB) Computer Science",
                    "cambridge_igcse": "Cambridge IGCSE Computer Science",
                    "cambridge_a": "Cambridge International A-Level Computer Science",
                    "pearson_edexcel": "Pearson Edexcel International A-Level Computer Science",
                    "cs101": "General Introduction to Programming (CS101)",
                }
            },
            north_america: {
                name: "North America",
                options: {
                    "ap_csa": "USA - AP Computer Science A (Java)",
                    "ap_csp": "USA - AP Computer Science Principles",
                    "ontario_ics4u": "Canada - Ontario Grade 12 (ICS4U)",
                }
            },
            europe: {
                name: "Europe",
                options: {
                    "uk_gcse": "UK - GCSE Computer Science",
                    "uk_alevel": "UK - A-Level Computer Science",
                    "cz_gymnasium": "Czech Republic - Informatika for Gymnázium",
                    "de_abitur": "Germany - Informatik for Abitur",
                }
            },
            asia_middle_east: {
                name: "Asia & Middle East",
                options: {
                    "uae_moe": "UAE - Ministry of Education Curriculum",
                    "in_cbse": "India - CBSE Computer Science (Class XI-XII)",
                    "sg_olevel": "Singapore - O-Level Computing",
                }
            },
            africa: {
                name: "Africa",
                options: {
                    "gh_wassce": "Ghana - WASSCE Computer Studies",
                    "ng_waec": "Nigeria - WAEC Computer Studies",
                    "ke_kcse": "Kenya - KCSE Computer Studies",
                }
            }
        },
        buttons: {
            generate: "Generate",
            generateLanguage: "Build My Language",
            generateDocs: "Generate Docs",
            generateComment: "Review Code",
            generateRubric: "Generate Rubric",
            generateLabReport: "Generate Code",
            generateQuestions: "Generate Quiz",
            generateLessonPlan: "Generate Plan",
            generateProtocols: "Get Advice",
            generatePlan: "Generate Plan",
            generateNewsletter: "Generate Devlog",
            generateHypothesis: "Generate Ideas",
            getHelp: "Get Help",
            analyzeData: "Debug Code",
            explainConcept: "Explain Concept",
            showSolution: "Solve & Explain",
            startPractice: "Start Practice Session",
            visualize: "Visualize",
            createMyPlan: "Create My Plan",
            send: "Send",
            useCamera: "Use Camera",
            uploadImage: "Upload Image",
            capture: "Capture",
            cancel: "Cancel",
            startOver: "Start Over",
            addStudent: "Add Student",
            listen: "Listen 🔊",
            stop: "Stop 🤫",
            addToJournal: "Add to Portfolio",
            requestAnalogy: "Explain with an Analogy",
            requestQuiz: "Test My Understanding",
            hideLabels: "Hide Labels",
            showLabels: "Show Labels",
            resetView: "Reset View",
            nextQuestion: "Next Question →",
            buildModule: "Build Learning Module",
            startLearning: "Start Learning Path",
            backToViewer: "Back to Visualizer",
            testUnderstanding: "Test My Understanding",
            showFullSolution: "Show Full Solution",
            guideMe: "Guide Me Step-by-Step",
            nextStep: "Next Step",
            practiceAnother: "Practice Another Problem",
            viewJournal: "View Portfolio",
            backToWild: "Back to Main",
            startTargeted: "Start Targeted Quiz",
            startFull: "Start Full Practice Test",
            reviewAnswers: "Review Answers",
            backToDashboard: "Back to Dashboard",
            close: "Close",
            backTo3D: "Back to View",
            generateFlashcards: "Generate Flashcards",
            assignToStudents: "✔️ Assign to Roster",
            assign: "Assign",
            backToRoster: "← Back to Roster",
            help: "Help",
            copy: "Copy to Clipboard",
            markAsComplete: "Mark as Complete & Continue",
            backToMasteryDashboard: "← Back to Path",
        },
        outputPlaceholders: {
            default: { title: "Your AI Assistant is Ready", p1: "Fill out the form on the left to get started.", p2: "Your generated content will appear here in vibrant, organized cards." },
            projectHub: { title: "Welcome to the Project Hub", p1: "Add students to your roster to begin.", p2: "You'll be able to manage assignments and track progress here." },
            languageArchitect: { title: "Design Your Own Programming Language", p1: "Use the form on the left to define your language's name, syntax style, and custom keywords.", p2: "The AI will generate a complete specification and example code for your unique creation." },
            documentationGenerator: { title: "Your AI-Generated Technical Docs", p1: "Describe a project or API to generate professional documentation, complete with code examples and endpoint definitions.", p2: "Your result will be displayed here in clear, organized sections." },
            quizGenerator: { title: "Dynamic Quiz Generator", p1: "Generate a rich, multi-format quiz on any tech topic, complete with an engaging header image.", p2: "Your quiz will appear here in a series of colorful, interactive cards." },
            codeInTheWild: { title: "Discover Code in Your World", p1: "Use your camera or upload a screenshot of any website or app.", p2: "The AI will identify UI components and architectural patterns, turning the digital world into your classroom." },
            portfolioBuilder: { title: "Your Developer Portfolio", p1: "Your personal collection of findings from 'Code in the Wild' and other generated code.", p2: "Entries you save will appear here. Click an entry to review your findings." },
            interviewPrepCenter: { title: "Personalized Interview Prep Center", p1: "Select your interview type from the list on the left.", p2: "This dashboard will track your progress, identify your strengths and weaknesses, and recommend what to study next." },
            flashcardGenerator: { title: "AI-Powered Flashcard Generator", p1: "Enter any tech topic to instantly create a set of interactive, flippable flashcards.", p2: "Studying just got a lot more dynamic. Your cards will appear here." },
            conceptExplainer: { title: "Your AI-Powered Concept Explainer", p1: "What tech concept do you want to understand? Enter any topic from Big O notation to REST APIs.", p2: "A clear, concise explanation will appear here, with options for analogies and quizzes." },
            algorithmSolver: { title: "Your AI-Powered Algorithm Assistant", p1: "Stuck on an algorithm? Enter it here.", p2: "The AI will deconstruct the problem, identify the core principles, and guide you through the solution step-by-step." },
            codingArena: { title: "Your Adaptive Coding Arena", p1: "Choose a topic and difficulty level to start a personalized practice session.", p2: "The AI will act as your coach, giving you one problem at a time and providing instant feedback." },
            codingTutor: { title: "Your Personal AI Coding Tutor", p1: "Ask any coding question, from simple syntax to complex architectural patterns.", p2: "Start a conversation by typing in the box below." },
            systemDesignVisualizer: { title: "Your Interactive System Visualizer", p1: "What do you want to see? Enter a concept like 'Client-Server Architecture' or 'Microservices'.", p2: "A beautiful, interactive diagram will be generated on the left, with detailed information appearing here on the right." },
            languageMasteryPath: { title: "Begin Your Language Mastery Path", p1: "Select a programming language and a curriculum from the panel on the left.", p2: "The AI will generate a structured, step-by-step learning roadmap to guide you on your journey." },
        },
    }
};

// --- APPLICATION STATE ---

let state = {
    currentLanguage: 'en',
    activeSuite: 'teacher', // 'teacher' or 'student'
    activeTabs: {
        teacher: 'projectHub',
        student: 'codeInTheWild'
    },
    teacherSuiteState: {
        projectHubState: { 
            roster: [], 
            loading: false, error: null,
            selectedStudentId: null,
            isAssignModalOpen: false,
            assignmentContent: null,
            assignmentMeta: null,
        },
        languageArchitectState: { loading: false, output: null, error: null },
        documentationGeneratorState: { loading: false, output: null, error: null },
        codeReviewAssistantState: { loading: false, output: null, error: null },
        projectRubricGeneratorState: { loading: false, output: null, error: null },
        curriculumPlannerState: { loading: false, output: null, error: null },
        quizGeneratorState: { loading: false, output: null, error: null },
        starterCodeGeneratorState: { loading: false, output: null, error: null },
        cybersecurityAdvisorState: { loading: false, output: null, error: null },
        hackathonPlannerState: { loading: false, output: null, error: null },
        devlogGeneratorState: { loading: false, output: null, error: null },
        projectIdeaGeneratorState: { loading: false, output: null, error: null },
        systemDesignHelperState: { loading: false, output: null, error: null },
        codeDebuggerState: { loading: false, output: null, error: null },
    },
    studentSuiteState: {
        codeInTheWildState: {
            uiState: 'initial', // 'initial', 'camera', 'analyzing', 'result', 'chatting'
            stream: null,
            imageData: null,
            analysisResult: null,
            activeHotspot: null,
            chat: null,
            messages: [],
            loading: false,
            error: null,
        },
        portfolioBuilderState: {
            entries: [], 
            isModalOpen: false,
            selectedEntry: null
        },
        interviewPrepCenterState: {
            exams: {}, // To be loaded
            selectedExam: null, 
            uiState: 'initial', // 'initial', 'test', 'results'
            activeTest: [],
            currentQuestionIndex: 0,
            userAnswers: [],
            testScore: 0,
            history: {}, 
            strengths: [], 
            weaknesses: [], 
            loading: false,
            error: null,
        },
        flashcardGeneratorState: { loading: false, error: null, output: null },
        conceptExplainerState: {
            loading: false, error: null,
            topic: null,
            gradeLevel: 'Beginner',
            mainExplanation: null,
            analogy: null,
            quiz: null,
            loadingAnalogy: false,
            loadingQuiz: false
        },
        algorithmSolverState: {
            loading: false, error: null,
            uiState: 'initial', // 'initial', 'result', 'solution', 'guided', 'practice'
            problem: null,
            deconstruction: null,
            fullSolution: null,
            guidedSteps: [],
            currentStep: 0,
            practiceProblem: null,
            loadingPractice: false,
        },
        codingArenaState: {
            uiState: 'initial', // 'initial', 'active'
            loading: false, error: null,
            chat: null,
            messages: [], 
            isAwaitingNext: false,
        },
        systemDesignVisualizerState: {
            loading: false, 
            error: null,
            sceneHtml: null,
            infoHtml: null,
            scenes: {}, 
            currentModelType: 'ball_and_stick',
            chat: null,
            messages: [],
            uiState: 'info', 
            quizHtml: null,
            prompt: null,
        },
        codingTutorState: {
            loading: false,
            error: null,
            chat: null,
            messages: [],
        },
        languageMasteryPathState: { 
            uiState: 'selection', // 'selection', 'dashboard', 'module'
            loading: false, 
            output: null, 
            error: null,
            progress: 0,
            activeModule: null,
            currentTopicIndex: null,
            loadingModule: false,
            quizState: {
                currentQuestionIndex: 0,
                userAnswers: [],
                isFinished: false,
                selectedAnswer: null, // string value of the selected option
                feedback: null, // { isCorrect: boolean, explanation: string, correctAnswer: string }
            },
        },
    },
    helpModalState: {
        isOpen: false,
        toolKey: null,
        chat: null,
        messages: [],
        loading: false,
        error: null,
    },
    scientificToolbarState: {
        isVisible: false,
        activeTextarea: null,
        activeTab: 'physics'
    },
    ttsState: {
        speaking: false,
        targetId: null
    }
};

// --- STATE MANAGEMENT ---

function setState(newState) {
    const oldState = JSON.parse(JSON.stringify(state));
    state = { ...state, ...newState };
    renderApp(oldState);
}

function t(key, replacements = {}) {
    const keys = key.split('.');
    let result = translations[state.currentLanguage];
    for (const k of keys) {
        result = result ? result[k] : undefined;
    }
    if (typeof result !== 'string') {
        console.warn(`Translation key not found or not a string: ${key}`);
        return key;
    }
    for (const placeholder in replacements) {
        result = result.replace(new RegExp(`{{${placeholder}}}`, 'g'), replacements[placeholder]);
    }
    return result;
}
function getTranslationObject(key) {
    const keys = key.split('.');
    let result = translations[state.currentLanguage];
    for (const k of keys) {
        result = result ? result[k] : undefined;
    }
    return result;
}


// --- API & CORE LOGIC ---

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getFormValues(form: HTMLFormElement): { [key: string]: any } {
    const formData = new FormData(form);
    const values: { [key: string]: any } = {};
    formData.forEach((value, key) => {
        if (values.hasOwnProperty(key)) {
            if (!Array.isArray(values[key])) {
                values[key] = [values[key]];
            }
            values[key].push(value);
        } else {
            values[key] = value;
        }
    });
    return values;
}

// Simple markdown to HTML renderer
function renderMarkdown(md) {
    if (!md) return '';
    return md
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/__(.*)__/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/_(.*)_/gim, '<em>$1</em>')
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => `<div class="code-block"><pre><code>${code.trim()}</code></pre></div>`)
        // Inline code
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // Lists
        .replace(/^\s*\n\*/gim, '<ul>\n*')
        .replace(/^(\*.+)\s*\n([^\*])/gim, '$1\n</ul>\n\n$2')
        .replace(/^\s*\*/gim, '<li>')
        .replace(/^\s*\d\./gim, '<ol><li>')
        .replace(/^\s*(\d\..+)\s*\n([^\d\.])/gim, '$1</ol>\n$2')
        // Paragraphs
        .split('\n\n').map(p => p.trim() && !p.startsWith('<') ? `<p>${p.replace(/\n/g, '<br>')}</p>` : p).join('');
}


// --- TEXT-TO-SPEECH (TTS) SYSTEM ---

function handleStopSpeech() {
    speechSynthesis.cancel();
    // Check current state before setting, to avoid unnecessary re-renders if already stopped
    if (state.ttsState.speaking) {
        setState({ ttsState: { speaking: false, targetId: null } });
    }
}

function handleListen(event) {
    const button = event.target as HTMLButtonElement;
    const targetId = button.dataset.targetId;

    // If the clicked button is the one currently speaking, stop it.
    if (state.ttsState.speaking && state.ttsState.targetId === targetId) {
        handleStopSpeech();
        return;
    }
    
    // If another audio is playing, stop it before starting a new one.
    if (state.ttsState.speaking) {
        handleStopSpeech();
    }

    const elementToRead = document.getElementById(targetId);
    if (!elementToRead) {
        console.error("TTS target element not found:", targetId);
        return;
    }

    const textToSpeak = elementToRead.textContent || elementToRead.innerText;
    if (!textToSpeak.trim()) {
        console.error("No text to speak in target element:", targetId);
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = state.currentLanguage;
    utterance.onend = handleStopSpeech;
    utterance.onerror = (e) => {
        console.error("Speech synthesis error", e);
        handleStopSpeech();
    };

    speechSynthesis.speak(utterance);
    
    setState({ ttsState: { speaking: true, targetId: targetId } });
}


// --- HELP MODAL SYSTEM ---

function handleOpenHelpModal(toolKey) {
    if (!toolKey) return;
    const toolName = t(`tabs.${toolKey}`);
    const toolInfo = t(`toolInfo.${toolKey}`);

    const systemInstruction = `You are a helpful and friendly assistant for the "CodeGenius AI" web application. The user is currently on the "${toolName}" tool. Your primary goal is to explain how this specific tool works and answer any questions they have about it. Keep your answers concise, clear, and encouraging.`;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction }
    });
    
    const initialMessage = {
        role: 'ai',
        content: toolInfo,
    };

    setState({
        helpModalState: {
            ...state.helpModalState,
            isOpen: true,
            toolKey,
            chat,
            messages: [initialMessage],
            loading: false,
            error: null,
        }
    });
}

function handleCloseHelpModal() {
    setState({
        helpModalState: {
            isOpen: false,
            toolKey: null,
            chat: null,
            messages: [],
            loading: false,
            error: null,
        }
    });
}

async function handleHelpChatSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('input[name="helpChat"]') as HTMLInputElement;
    const message = input.value.trim();
    if (!message) return;

    const { chat, messages } = state.helpModalState;
    const newMessages = [...messages, { role: 'user', content: message }];
    input.value = '';

    setState({
        helpModalState: {
            ...state.helpModalState,
            messages: newMessages,
            loading: true
        }
    });

    try {
        const response = await chat.sendMessage({ message });
        const aiMessage = { role: 'ai', content: response.text };
        const updatedMessages = [...newMessages, aiMessage];
        setState({
            helpModalState: {
                ...state.helpModalState,
                messages: updatedMessages,
                loading: false
            }
        });
    } catch (error) {
        console.error("Help Chat Error:", error);
        const errorMessage = { role: 'ai', content: "Sorry, I encountered an error. Please try asking again." };
        const errorMessages = [...newMessages, errorMessage];
        setState({
            helpModalState: {
                ...state.helpModalState,
                messages: errorMessages,
                loading: false,
                error: error.message
            }
        });
    }
}


// --- EDUCATOR SUITE ---

// Project Hub
function handleAddStudent(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('[name="studentName"]') as HTMLInputElement;
    const name = input.value.trim();
    if (!name) return;

    const newStudent = { id: generateId(), name: name, assignments: [] };
    const newRoster = [...state.teacherSuiteState.projectHubState.roster, newStudent];
    
    setState({
        teacherSuiteState: {
            ...state.teacherSuiteState,
            projectHubState: { ...state.teacherSuiteState.projectHubState, roster: newRoster }
        }
    });
    input.value = '';
}

function handleSelectStudent(studentId) {
    setState({
        teacherSuiteState: {
            ...state.teacherSuiteState,
            projectHubState: { ...state.teacherSuiteState.projectHubState, selectedStudentId: studentId }
        }
    });
}

function handleBackToRoster() {
     setState({
        teacherSuiteState: {
            ...state.teacherSuiteState,
            projectHubState: { ...state.teacherSuiteState.projectHubState, selectedStudentId: null }
        }
    });
}

function handleOpenAssignModal(tool) {
    const toolState = state.teacherSuiteState[`${tool}State`];
    if (!toolState || !toolState.output) {
        console.error("No content to assign for tool:", tool);
        return;
    }

    const content = toolState.output;
    let title = "Generated Content";
    // Heuristic to find a title in the content
    if (typeof content === 'object' && content !== null) {
      if(content.title) title = content.title;
      else if(content.languageName) title = `Language: ${content.languageName}`;
    }


     setState({
        teacherSuiteState: {
            ...state.teacherSuiteState,
            projectHubState: {
                ...state.teacherSuiteState.projectHubState,
                isAssignModalOpen: true,
                assignmentContent: content,
                assignmentMeta: { title, tool }
            }
        }
    });
}

function handleCloseAssignModal() {
     setState({
        teacherSuiteState: {
            ...state.teacherSuiteState,
            projectHubState: {
                ...state.teacherSuiteState.projectHubState,
                isAssignModalOpen: false,
                assignmentContent: null,
                assignmentMeta: null
            }
        }
    });
}

function handleAssignSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const selectedStudentIds = formData.getAll('studentIds');

    if (selectedStudentIds.length === 0) {
        handleCloseAssignModal();
        return;
    }

    const { assignmentContent, assignmentMeta, roster } = state.teacherSuiteState.projectHubState;
    const newAssignment = {
        id: generateId(),
        assignedDate: new Date().toISOString(),
        tool: assignmentMeta.tool,
        title: assignmentMeta.title,
        content: assignmentContent,
        status: 'Assigned'
    };
    
    const newRoster = roster.map(student => {
        if (selectedStudentIds.includes(student.id)) {
            return {
                ...student,
                assignments: [newAssignment, ...student.assignments]
            };
        }
        return student;
    });

    setState({
        teacherSuiteState: {
            ...state.teacherSuiteState,
            projectHubState: {
                ...state.teacherSuiteState.projectHubState,
                roster: newRoster,
            }
        }
    });
    
    handleCloseAssignModal();
}

// Language Architect
async function handleLanguageArchitectSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const values = getFormValues(form);

    setState({ teacherSuiteState: { ...state.teacherSuiteState, languageArchitectState: { ...state.teacherSuiteState.languageArchitectState, loading: true, error: null, output: null } } });

    const prompt = `You are a creative programming language designer. A user wants to invent a new language. Based on their specifications, generate a language overview, a syntax guide, and two example programs.

    **Language Specifications:**
    - **Name:** ${values.languageName}
    - **Syntax Style:** ${values.syntaxStyle} (${t(`options.syntaxStyle.${values.syntaxStyle}`)})
    - **Keywords:**
        - Variable Declaration: \`${values.keywordVariable}\`
        - Conditional: \`${values.keywordConditional}\`
        - Loop: \`${values.keywordLoop}\`
        - Function: \`${values.keywordFunction}\`
        - Output: \`${values.keywordOutput}\`
    - **Goal for Example Program:** ${values.languageGoal}

    **Task:**
    Generate the language assets. Your entire response MUST be a single, valid JSON object that conforms to the provided schema.
    - **overview**: Write a short, encouraging summary of the new language.
    - **syntaxGuide**: A comprehensive guide in Markdown format explaining the language rules using the custom keywords. Cover variables, conditionals, loops, functions, and output.
    - **helloWorldExample**: A simple "Hello, World!" program written in this new language.
    - **customExample**: A program written in this new language that achieves the user's specified goal.
    `;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            languageName: { type: Type.STRING, description: "The name of the generated language." },
            overview: { type: Type.STRING, description: "A brief, one-paragraph overview of the language's style and purpose." },
            syntaxGuide: { type: Type.STRING, description: "A comprehensive syntax guide in Markdown format." },
            helloWorldExample: { type: Type.STRING, description: "A 'Hello, World!' program in the new language." },
            customExample: { type: Type.STRING, description: "The program that meets the user's specified goal." },
        },
        required: ['languageName', 'overview', 'syntaxGuide', 'helloWorldExample', 'customExample']
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            },
        });
        
        const jsonOutput = JSON.parse(response.text);
        
        setState({
            teacherSuiteState: {
                ...state.teacherSuiteState,
                languageArchitectState: { loading: false, output: jsonOutput, error: null }
            }
        });

    } catch (error) {
        console.error("Language Architect Error:", error);
        setState({
            teacherSuiteState: {
                ...state.teacherSuiteState,
                languageArchitectState: { loading: false, output: null, error: `An error occurred: ${error.message}` }
            }
        });
    }
}

// Documentation Generator
async function handleDocumentationGeneratorSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const values = getFormValues(form);

    setState({ teacherSuiteState: { ...state.teacherSuiteState, documentationGeneratorState: { ...state.teacherSuiteState.documentationGeneratorState, loading: true, error: null, output: null } } });

    const prompt = `You are an expert technical writer creating documentation for an educational setting.
    
    **Topic:** ${values.docTopic}
    **Documentation Style:** ${values.docStyle} (${t(`options.docStyle.${values.docStyle}`)})
    **Target Audience/Technical Level:** ${values.docAudience} (${t(`options.docAudience.${values.docAudience}`)})
    ${values.docCodeSnippet ? `**Code to Document:**\n\`\`\`\n${values.docCodeSnippet}\n\`\`\`` : ''}

    **Task:**
    Generate the documentation based on the specifications above. 
    - The content must be formatted in Markdown.
    - If the style is 'api', the content should detail endpoints, methods, parameters, and example responses.
    - If the style is 'jsdoc', the content should be the provided code with extensive JSDoc-style comments.
    - If the style is 'readme', create a comprehensive README.md file.
    - The tone and complexity must match the target audience.
    ${values.docBestPractices ? `- Include a section with 3-5 concise, actionable best practices for writing this type of documentation.` : ''}

    **CRITICAL INSTRUCTION:** Your response MUST be a single, valid JSON object that conforms to the provided schema. The 'content' field must be a string containing well-formatted Markdown.
    `;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "A fitting title for the documentation." },
            style: { type: Type.STRING, description: "The documentation style requested (e.g., 'readme', 'jsdoc', 'api')." },
            content: { type: Type.STRING, description: "The main documentation content, formatted as a single Markdown string." },
            bestPractices: { 
                type: Type.ARRAY, 
                description: "An array of strings, where each string is a documentation best practice. This key should only be present if requested.",
                items: { type: Type.STRING }
            }
        },
        required: ['title', 'style', 'content']
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            },
        });
        
        const jsonOutput = JSON.parse(response.text);
        
        setState({
            teacherSuiteState: {
                ...state.teacherSuiteState,
                documentationGeneratorState: { loading: false, output: jsonOutput, error: null }
            }
        });

    } catch (error) {
        console.error("Documentation Generator Error:", error);
        setState({
            teacherSuiteState: {
                ...state.teacherSuiteState,
                documentationGeneratorState: { loading: false, output: null, error: `An error occurred: ${error.message}` }
            }
        });
    }
}

// Quiz Generator
async function handleQuizGeneratorSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const values = getFormValues(form);

    const selectedTypes = Array.isArray(values.questionTypes) ? values.questionTypes : [values.questionTypes];
    if (!selectedTypes.length) {
        alert("Please select at least one question type.");
        return;
    }
    
    setState({ teacherSuiteState: { ...state.teacherSuiteState, quizGeneratorState: { ...state.teacherSuiteState.quizGeneratorState, loading: true, error: null, output: null } } });

    const textPrompt = `You are an expert curriculum designer creating a quiz for a tech education platform.

    **Topic:** ${values.topic}
    **Difficulty:** ${values.difficultyLevel}
    **Number of Questions:** ${values.numQuestions}
    **Requested Question Types:** ${selectedTypes.map(type => t(`questionTypes.${type}`)).join(', ')}
    ${values.includeImage ? '**Image Requested:** Yes, generate a conceptual image prompt.' : ''}
    
    **Task:**
    Generate a quiz based on the specifications above. Your entire response MUST be a single, valid JSON object that conforms to the provided schema.

    **JSON Structure Details:**
    - \`title\`: A creative and relevant title for the quiz.
    - \`imagePrompt\`: If an image was requested, create a simple, descriptive prompt for an AI image generator to create a header image. The prompt should be conceptual and visually interesting, related to the topic. If no image is requested, this field must be an empty string.
    - \`questions\`: An array of question objects. Generate a mix of the requested question types.

    **Question Object Structures:**
    - For **multipleChoice**: \`{ "type": "multipleChoice", "question": "...", "options": ["...", "...", "..."], "answerText": "..." }\`
    - For **trueFalse**: \`{ "type": "trueFalse", "question": "...", "answerBool": boolean }\`
    - For **shortAnswer**: \`{ "type": "shortAnswer", "question": "...", "answerText": "..." }\`
    - For **fillInTheBlanks**: \`{ "type": "fillInTheBlanks", "question": "A sentence with '___' for the blank.", "answerText": "The word for the blank." }\`
    - For **matching**: \`{ "type": "matching", "question": "Match the terms to their definitions.", "pairs": [{ "term": "...", "definition": "..." }, { "term": "...", "definition": "..." }] }\` (Generate at least 3 pairs).
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'The title of the quiz.' },
            imagePrompt: { type: Type.STRING, description: 'A prompt for an image generator. Empty if not requested.' },
            questions: {
                type: Type.ARRAY,
                description: 'An array of quiz question objects.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        type: { type: Type.STRING, description: "Type of question: 'multipleChoice', 'trueFalse', 'shortAnswer', 'fillInTheBlanks', or 'matching'." },
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'For multipleChoice.' },
                        answerText: { type: Type.STRING, description: 'For multipleChoice, shortAnswer, fillInTheBlanks.' },
                        answerBool: { type: Type.BOOLEAN, description: 'For trueFalse.' },
                        pairs: {
                            type: Type.ARRAY,
                            description: 'For matching.',
                            items: {
                                type: Type.OBJECT,
                                properties: { term: { type: Type.STRING }, definition: { type: Type.STRING } },
                                required: ['term', 'definition'],
                            }
                        }
                    },
                    required: ['type', 'question']
                }
            }
        },
        required: ['title', 'imagePrompt', 'questions']
    };

    try {
        // Step 1: Generate Quiz Content
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: textPrompt,
            config: { responseMimeType: "application/json", responseSchema: schema },
        });

        let quizOutput = JSON.parse(textResponse.text);

        // Step 2: Generate Image if requested
        if (values.includeImage && quizOutput.imagePrompt) {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: quizOutput.imagePrompt,
                config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '16:9' },
            });
            const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
            quizOutput.image = `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        
        setState({
            teacherSuiteState: { ...state.teacherSuiteState, quizGeneratorState: { loading: false, output: quizOutput, error: null } }
        });

    } catch (error) {
        console.error("Quiz Generator Error:", error);
        setState({
            teacherSuiteState: { ...state.teacherSuiteState, quizGeneratorState: { loading: false, output: null, error: `An error occurred: ${error.message}` } }
        });
    }
}


// --- STUDENT SUITE ---

// Code in the Wild
async function handleUseCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, uiState: 'camera', stream: stream, error: null } } });
    } catch (err) {
        console.error("Camera access denied:", err);
        setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, error: "Camera access was denied. Please allow camera permissions in your browser settings to use this feature." } } });
    }
}

function handleCancelCamera() {
    const { stream } = state.studentSuiteState.codeInTheWildState;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, uiState: 'initial', stream: null } } });
}

async function handleCaptureImage() {
    const videoElement = document.getElementById('camera-stream') as HTMLVideoElement;
    if (!videoElement) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    
    handleCancelCamera(); // Turn off the camera stream
    await analyzeImage(imageData);
}

function handleUploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            await analyzeImage(e.target.result as string);
        };
        reader.readAsDataURL(file);
    }
}

async function analyzeImage(base64ImageData) {
    setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, uiState: 'analyzing', imageData: base64ImageData, analysisResult: null, error: null } } });
    
    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64ImageData.split(',')[1],
        },
    };

    const textPart = {
        text: `You are a web development expert named 'Code-AI'. Your task is to analyze an image of a website or app UI and identify interesting components or architectural patterns.

CRITICAL INSTRUCTIONS:
1.  Respond with a single, valid JSON object.
2.  The JSON object must have one key: "analysis".
3.  The "analysis" value should be an object with two keys: "overall_summary" (a brief, engaging one-sentence summary of the UI's architecture) and "hotspots" (an array).
4.  Each object in the "hotspots" array represents a point of interest and MUST have these keys:
    - "x": (number) The horizontal position as a percentage (0-100) from the left.
    - "y": (number) The vertical position as a percentage (0-100) from the top.
    - "title": (string) A short, catchy title for the component (e.g., "Responsive Navigation Bar", "Card Layout with Flexbox").
    - "explanation": (string, HTML-formatted) A detailed, educational explanation of how this component might be built, suitable for a curious student. Start with a <h2> tag for the title.
5.  Identify between 2 and 4 distinct hotspots. Be creative and find interesting details.`
    };
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: { responseMimeType: "application/json" }
        });
        const result = JSON.parse(response.text);

        setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, uiState: 'result', analysisResult: result.analysis } } });
    } catch (error) {
        console.error("Image analysis error:", error);
        setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, uiState: 'result', error: `Image analysis failed. ${error.message}` } } });
    }
}

function handleHotspotClick(hotspot) {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: `You are an expert web development tutor explaining "${hotspot.title}". The user has just seen an image of this and your initial explanation. Answer their follow-up questions concisely and enthusiastically.` }
    });

    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            codeInTheWildState: {
                ...state.studentSuiteState.codeInTheWildState,
                uiState: 'chatting',
                activeHotspot: hotspot,
                chat: chat,
                messages: [{ role: 'ai', content: hotspot.explanation, isHtml: true }]
            }
        }
    });
}

async function handleWildChatSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('input[name="wildChat"]') as HTMLInputElement;
    const message = input.value.trim();
    if (!message) return;

    const { chat, messages } = state.studentSuiteState.codeInTheWildState;
    const newMessages = [...messages, { role: 'user', content: message }];
    input.value = '';

    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, messages: newMessages, loading: true }
        }
    });

    try {
        const response = await chat.sendMessage({ message });
        const aiMessage = response.text;
        const updatedMessages = [...newMessages, { role: 'ai', content: aiMessage }];
        setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, messages: updatedMessages, loading: false } } });
    } catch (error) {
        console.error("Wild Chat Error:", error);
        const errorMessages = [...newMessages, { role: 'ai', content: "Sorry, I encountered an error. Please try again." }];
        setState({ studentSuiteState: { ...state.studentSuiteState, codeInTheWildState: { ...state.studentSuiteState.codeInTheWildState, messages: errorMessages, loading: false } } });
    }
}

function handleAddToJournal() {
    const { imageData, analysisResult, messages, activeHotspot } = state.studentSuiteState.codeInTheWildState;
    if (!imageData || !analysisResult) return;

    const entry = {
        id: generateId(),
        date: new Date().toISOString(),
        image: imageData,
        title: analysisResult.overall_summary,
        hotspots: analysisResult.hotspots,
        chatHistory: messages, // save the full chat
    };
    
    const newEntries = [entry, ...state.studentSuiteState.portfolioBuilderState.entries];
    setState({ 
        studentSuiteState: { ...state.studentSuiteState, portfolioBuilderState: { ...state.studentSuiteState.portfolioBuilderState, entries: newEntries } },
    });
    
    const journalBtn = document.querySelector('[data-action="add-to-journal"]') as HTMLButtonElement;
    if (journalBtn) {
        journalBtn.textContent = '✅ Added!';
        setTimeout(() => {
            journalBtn.textContent = t('buttons.addToJournal');
        }, 2000);
    }
}

function cleanupCodeInTheWild() {
    const { stream } = state.studentSuiteState.codeInTheWildState;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            codeInTheWildState: {
                uiState: 'initial',
                stream: null,
                imageData: null,
                analysisResult: null,
                activeHotspot: null,
                chat: null,
                messages: [],
                loading: false,
                error: null,
            }
        }
    });
}

function handleStartOverWild() {
    cleanupCodeInTheWild();
}

// Language Mastery Path
async function handleStartMasteryPath(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const values = getFormValues(form);

    const language = values.language;
    const curriculumKey = values.curriculum;
    const allCurricula = getTranslationObject('curricula');
    let curriculumName = '';

    for (const region in allCurricula) {
        if (allCurricula[region].options[curriculumKey]) {
            curriculumName = allCurricula[region].options[curriculumKey];
            break;
        }
    }
    
    if (!language || !curriculumName) {
        console.error("Language or curriculum not selected.");
        return;
    }

    setState({ studentSuiteState: { ...state.studentSuiteState, languageMasteryPathState: { ...state.studentSuiteState.languageMasteryPathState, loading: true, error: null, output: null } } });

    const prompt = `You are an expert curriculum designer for a tech education platform. A student wants to learn '${language}' following the '${curriculumName}' standard.

    **Task:**
    Generate a structured, step-by-step learning roadmap. The roadmap should be broken down into logical topics, starting from the basics and progressing to more advanced concepts appropriate for the selected curriculum. Your entire response MUST be a single, valid JSON object that conforms to the provided schema.

    **JSON Structure Details:**
    - \`title\`: Create a title for the learning path, like "${language} Mastery Path (${curriculumName})".
    - \`overview\`: Write a brief, one-paragraph overview of what the student will learn on this path.
    - \`roadmap\`: An array of topic objects. Generate between 8 and 15 topics.
    - Each topic object must have:
        - \`topic\`: The name of the learning topic (e.g., "Variables and Data Types").
        - \`description\`: A short, one-sentence description of what the topic covers.
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "The title for the learning path." },
            overview: { type: Type.STRING, description: "A brief, one-paragraph overview of the learning path." },
            roadmap: {
                type: Type.ARRAY,
                description: "An array of learning topic objects.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        topic: { type: Type.STRING, description: "The name of the learning topic." },
                        description: { type: Type.STRING, description: "A short description of the topic." }
                    },
                    required: ["topic", "description"]
                }
            }
        },
        required: ["title", "overview", "roadmap"]
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: schema },
        });

        const jsonOutput = JSON.parse(response.text);

        // Add status to roadmap items for UI rendering
        const roadmapWithStatus = jsonOutput.roadmap.map((item, index) => ({
            ...item,
            status: index === 0 ? 'current' : 'locked', // First item is current, rest are locked
        }));

        jsonOutput.roadmap = roadmapWithStatus;
        
        setState({
            studentSuiteState: {
                ...state.studentSuiteState,
                languageMasteryPathState: { 
                    ...state.studentSuiteState.languageMasteryPathState,
                    loading: false, 
                    output: jsonOutput, 
                    error: null,
                    uiState: 'dashboard',
                    progress: 0,
                }
            }
        });

    } catch (error) {
        console.error("Language Mastery Path Error:", error);
        setState({
            studentSuiteState: {
                ...state.studentSuiteState,
                languageMasteryPathState: { 
                    ...state.studentSuiteState.languageMasteryPathState,
                    loading: false, 
                    output: null, 
                    error: `An error occurred while generating the learning path: ${error.message}`,
                    uiState: 'selection',
                }
            }
        });
    }
}

function handleBackToMasteryDashboard() {
    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            languageMasteryPathState: {
                ...state.studentSuiteState.languageMasteryPathState,
                uiState: 'dashboard',
                activeModule: null,
                currentTopicIndex: null,
            }
        }
    });
}

function handleCompleteMasteryModule(topicIndex) {
    const { output } = state.studentSuiteState.languageMasteryPathState;
    if (!output || !output.roadmap[topicIndex]) return;

    const newRoadmap = [...output.roadmap];
    newRoadmap[topicIndex].status = 'completed';
    if (topicIndex + 1 < newRoadmap.length) {
        newRoadmap[topicIndex + 1].status = 'current';
    }

    const completedCount = newRoadmap.filter(item => item.status === 'completed').length;
    const progress = (completedCount / newRoadmap.length) * 100;

    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            languageMasteryPathState: {
                ...state.studentSuiteState.languageMasteryPathState,
                output: { ...output, roadmap: newRoadmap },
                progress: progress,
                uiState: 'dashboard',
                activeModule: null,
                currentTopicIndex: null,
            }
        }
    });
}

async function handleStartMasteryModule(topicIndex) {
    const { output } = state.studentSuiteState.languageMasteryPathState;
    const topicData = output.roadmap[topicIndex];
    const language = output.title.split(' ')[0]; // Heuristic to get language from title

     // Reset quiz state before loading new module
    const initialQuizState = {
        currentQuestionIndex: 0,
        userAnswers: [],
        isFinished: false,
        selectedAnswer: null,
        feedback: null,
    };

    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            languageMasteryPathState: {
                ...state.studentSuiteState.languageMasteryPathState,
                loadingModule: true,
                error: null,
                uiState: 'module',
                currentTopicIndex: topicIndex,
                activeModule: null,
                quizState: initialQuizState,
            }
        }
    });

    const prompt = `You are an expert programming tutor. Generate a comprehensive, single-page learning module for a student.

    **Language:** ${language}
    **Topic:** ${topicData.topic}
    **Topic Description:** ${topicData.description}

    **Task:**
    Create the learning module content. Your response MUST be a single, valid JSON object that conforms to the provided schema. The content should be clear, educational, and engaging.

    **JSON Schema:**
    - \`title\`: (string) The topic title.
    - \`explanation\`: (string, Markdown) A detailed but easy-to-understand explanation of the concept. Use analogies and clear examples.
    - \`codeExample\`: (string) A well-commented code snippet in ${language} demonstrating the concept in a practical way.
    - \`exercise\`: (object) An interactive exercise to test the student's understanding.
        - \`prompt\`: (string, Markdown) The exercise question or task.
        - \`solution\`: (string) The correct code for the exercise.
    - \`quiz\`: (object) A short quiz to check for understanding.
        - \`questions\`: (array) An array of 2-3 multiple choice question objects.
            - \`questionText\`: (string) The text of the question.
            - \`options\`: (array of strings) 3-4 possible answers.
            - \`correctAnswer\`: (string) The exact text of the correct option.
            - \`explanation\`: (string) A brief explanation of why the correct answer is right.
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
            codeExample: { type: Type.STRING },
            exercise: {
                type: Type.OBJECT,
                properties: {
                    prompt: { type: Type.STRING },
                    solution: { type: Type.STRING },
                },
                required: ["prompt", "solution"]
            },
            quiz: {
                type: Type.OBJECT,
                properties: {
                    questions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                questionText: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                correctAnswer: { type: Type.STRING },
                                explanation: { type: Type.STRING },
                            },
                            required: ["questionText", "options", "correctAnswer", "explanation"]
                        }
                    }
                },
                required: ["questions"]
            }
        },
        required: ["title", "explanation", "codeExample", "exercise", "quiz"]
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            },
        });

        const jsonOutput = JSON.parse(response.text);
        
        setState({
            studentSuiteState: {
                ...state.studentSuiteState,
                languageMasteryPathState: {
                    ...state.studentSuiteState.languageMasteryPathState,
                    loadingModule: false,
                    activeModule: jsonOutput,
                }
            }
        });
    } catch (error) {
        console.error("Mastery Module Generation Error:", error);
        setState({
            studentSuiteState: {
                ...state.studentSuiteState,
                languageMasteryPathState: {
                    ...state.studentSuiteState.languageMasteryPathState,
                    loadingModule: false,
                    error: `Failed to load learning module: ${error.message}`
                }
            }
        });
    }
}

// Mastery Path Quiz Handlers
function handleSelectQuizAnswer(answer) {
    if (state.studentSuiteState.languageMasteryPathState.quizState.feedback) return;

    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            languageMasteryPathState: {
                ...state.studentSuiteState.languageMasteryPathState,
                quizState: {
                    ...state.studentSuiteState.languageMasteryPathState.quizState,
                    selectedAnswer: answer,
                }
            }
        }
    });
}

function handleCheckQuizAnswer() {
    const { quizState, activeModule } = state.studentSuiteState.languageMasteryPathState;
    const { selectedAnswer, currentQuestionIndex, userAnswers } = quizState;
    
    if (!selectedAnswer) return;

    const question = activeModule.quiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    const newUserAnswers = [...userAnswers, { question: question.questionText, selected: selectedAnswer, correct: question.correctAnswer, isCorrect }];

    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            languageMasteryPathState: {
                ...state.studentSuiteState.languageMasteryPathState,
                quizState: {
                    ...quizState,
                    userAnswers: newUserAnswers,
                    feedback: {
                        isCorrect: isCorrect,
                        explanation: question.explanation,
                        correctAnswer: question.correctAnswer,
                    }
                }
            }
        }
    });
}

function handleQuizNextQuestion() {
    const { quizState, activeModule } = state.studentSuiteState.languageMasteryPathState;
    const nextIndex = quizState.currentQuestionIndex + 1;

    if (nextIndex < activeModule.quiz.questions.length) {
        setState({
            studentSuiteState: {
                ...state.studentSuiteState,
                languageMasteryPathState: {
                    ...state.studentSuiteState.languageMasteryPathState,
                    quizState: {
                        ...quizState,
                        currentQuestionIndex: nextIndex,
                        selectedAnswer: null,
                        feedback: null,
                    }
                }
            }
        });
    } else {
        setState({
            studentSuiteState: {
                ...state.studentSuiteState,
                languageMasteryPathState: {
                    ...state.studentSuiteState.languageMasteryPathState,
                    quizState: {
                        ...quizState,
                        isFinished: true,
                        selectedAnswer: null,
                        feedback: null,
                    }
                }
            }
        });
    }
}

function handleRetakeQuiz() {
    setState({
        studentSuiteState: {
            ...state.studentSuiteState,
            languageMasteryPathState: {
                ...state.studentSuiteState.languageMasteryPathState,
                quizState: {
                    currentQuestionIndex: 0,
                    userAnswers: [],
                    isFinished: false,
                    selectedAnswer: null,
                    feedback: null,
                }
            }
        }
    });
}


// --- RENDERING ---

function renderApp(oldState = {}) {
    const root = document.getElementById('root');
    if (!root) return;

    const activeElementId = document.activeElement?.id;
    const selectionStart = (document.activeElement as HTMLInputElement)?.selectionStart;
    const selectionEnd = (document.activeElement as HTMLInputElement)?.selectionEnd;

    root.innerHTML = `
        <div class="container">
            <button class="share-btn" data-action="share-app" title="Copy App URL to Clipboard">🔗 Share</button>
            ${renderHeader()}
            ${renderSuiteSwitcher()}
            <main class="main-content">
                ${renderTeacherSuite()}
                ${renderStudentSuite()}
            </main>
             ${renderJournalModal()}
             ${renderAssignModal()}
             ${renderHelpModal()}
        </div>
    `;

    setupEventListeners();

    if (activeElementId) {
        const activeElement = document.getElementById(activeElementId);
        if (activeElement) {
            activeElement.focus();
            if (selectionStart !== undefined && selectionEnd !== undefined) {
                (activeElement as HTMLInputElement).setSelectionRange(selectionStart, selectionEnd);
            }
        }
    }
    
    if (state.activeSuite === 'student' && state.activeTabs.student === 'codeInTheWild' && state.studentSuiteState.codeInTheWildState.uiState === 'camera') {
        const videoEl = document.getElementById('camera-stream') as HTMLVideoElement;
        if (videoEl && state.studentSuiteState.codeInTheWildState.stream) {
            videoEl.srcObject = state.studentSuiteState.codeInTheWildState.stream;
        }
    }
}

function renderHeader() { 
    return `
        <header class="header">
            <h1>💻 ${t('header.title')}</h1>
            <p>${t('header.subtitle')}</p>
        </header>
    `;
}
function renderSuiteSwitcher() { 
    return `
        <div class="suite-switcher">
            <button class="suite-btn ${state.activeSuite === 'teacher' ? 'active' : ''}" data-suite="teacher">${t('suites.teacher')}</button>
            <button class="suite-btn ${state.activeSuite === 'student' ? 'active' : ''}" data-suite="student">${t('suites.student')}</button>
        </div>
    `;
}

function renderTeacherSuite() {
    const suiteName = 'teacher';
    const tabs = {
            projectHub: { icon: "⚙️", form: renderProjectHubForm, output: renderProjectHubOutput },
            languageArchitect: { icon: "🏛️", form: renderLanguageArchitectForm, output: renderLanguageArchitectOutput },
            documentationGenerator: { icon: "📄", form: renderDocumentationGeneratorForm, output: renderDocumentationGeneratorOutput },
            codeReviewAssistant: { icon: "✅", form: () => '', output: () => '' },
            projectRubricGenerator: { icon: "📊", form: () => '', output: () => '' },
            curriculumPlanner: { icon: "🗓️", form: () => '', output: () => '' },
            quizGenerator: { icon: "❓", form: renderQuizGeneratorForm, output: renderQuizGeneratorOutput },
            starterCodeGenerator: { icon: "</>", form: () => '', output: () => '' },
            cybersecurityAdvisor: { icon: "🛡️", form: () => '', output: () => '' },
            hackathonPlanner: { icon: "🏆", form: () => '', output: () => '' },
            devlogGenerator: { icon: "📰", form: () => '', output: () => '' },
            projectIdeaGenerator: { icon: "💡", form: () => '', output: () => '' },
            systemDesignHelper: { icon: "🏗️", form: () => '', output: () => '' },
            codeDebugger: { icon: "🐛", form: () => '', output: () => '' },
    };

    return `
        <div class="suite-container ${state.activeSuite === suiteName ? 'active' : ''}">
            <nav class="tab-container">
                ${Object.keys(tabs).map(key => `
                    <button class="tab-btn ${state.activeTabs[suiteName] === key ? 'active' : ''}" data-suite="${suiteName}" data-tab="${key}">
                        <span>${tabs[key].icon}</span> ${t(`tabs.${key}`)}
                    </button>
                `).join('')}
            </nav>
            ${Object.keys(tabs).map(key => `
                <div class="tab-pane ${state.activeTabs[suiteName] === key ? 'active' : ''}">
                    <div class="form-panel-wrapper">
                        ${tabs[key].form(key)}
                    </div>
                    <div class="output-container" id="${key}-output">
                        ${tabs[key].output()}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderStudentSuite() {
    const suiteName = 'student';
     const tabs = {
        codeInTheWild: { icon: "📸", form: renderCodeInTheWildForm, output: renderCodeInTheWildOutput },
        portfolioBuilder: { icon: "🗂️", form: () => '', output: renderPortfolioBuilderOutput },
        languageMasteryPath: { icon: "🗺️", form: renderLanguageMasteryPathForm, output: renderLanguageMasteryPathOutput },
        interviewPrepCenter: { icon: "🎓", form: () => '', output: () => '' },
        flashcardGenerator: { icon: "🃏", form: () => '', output: () => '' },
        conceptExplainer: { icon: "🧠", form: () => '', output: () => '' },
        algorithmSolver: { icon: "🔁", form: () => '', output: () => '' },
        codingTutor: { icon: "🧑‍🏫", form: () => '', output: () => '' },
        codingArena: { icon: "⌨️", form: () => '', output: () => '' },
        systemDesignVisualizer: { icon: "🌐", form: () => '', output: () => '' },
    };

    return `
        <div class="suite-container ${state.activeSuite === suiteName ? 'active' : ''}">
            <nav class="tab-container">
                ${Object.keys(tabs).map(key => `
                    <button class="tab-btn ${state.activeTabs[suiteName] === key ? 'active' : ''}" data-suite="${suiteName}" data-tab="${key}">
                        <span>${tabs[key].icon}</span> ${t(`tabs.${key}`)}
                    </button>
                `).join('')}
            </nav>
            ${Object.keys(tabs).map(key => `
                <div class="tab-pane ${state.activeTabs[suiteName] === key ? 'active' : ''}">
                    <div class="form-panel-wrapper">
                        ${tabs[key].form(key)}
                    </div>
                    <div class="output-container" id="${key}-output">
                        ${tabs[key].output()}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- EDUCATOR FORMS & OUTPUTS ---

function renderProjectHubForm(toolKey) { 
    return `
        <div class="form-container">
            <form id="add-student-form">
                <fieldset>
                    <legend>⚙️ ${t('tabs.projectHub')}
                        <button class="help-btn" type="button" data-action="open-help-modal" data-tool-key="${toolKey}" title="${t('buttons.help')}">?</button>
                    </legend>
                    <div>
                        <label for="hubStudentName">${t('labels.hubAddNewStudent')}</label>
                        <input type="text" id="hubStudentName" name="studentName" placeholder="${t('placeholders.studentName')}" required>
                    </div>
                    <button type="submit">${t('buttons.addStudent')}</button>
                </fieldset>
            </form>
        </div>
    `;
}
function renderProjectHubOutput() { 
    const { roster, loading, error, selectedStudentId } = state.teacherSuiteState.projectHubState;
    if (loading) return `<div class="loader"></div>`;
    if (error) return `<div class="error-card">${error}</div>`;

    if (selectedStudentId) {
        return renderStudentDetailView(selectedStudentId);
    }

    if (roster.length === 0) {
        const placeholder = getTranslationObject('outputPlaceholders.projectHub');
        return `
            <div class="placeholder">
                <span class="placeholder-icon">⚙️</span>
                <h2>${placeholder.title}</h2>
                <p>${placeholder.p1}</p>
                <p>${placeholder.p2}</p>
            </div>
        `;
    }
    
    return `
        <div class="output-content">
            <h3>Class Roster</h3>
            <ul class="roster-list">
                ${roster.map(student => `
                    <li class="roster-item" data-action="select-student" data-student-id="${student.id}">
                        <span>${student.name}</span>
                        <span>${student.assignments.length} Assignment(s)</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function renderStudentDetailView(studentId) {
    const student = state.teacherSuiteState.projectHubState.roster.find(s => s.id === studentId);
    if (!student) return `<div class="error-card">Student not found.</div>`;

    const assignmentsHtml = student.assignments.length > 0
        ? student.assignments.map(assignment => `
            <div class="assignment-card">
                <div class="assignment-card-header">
                    <h4>${assignment.title}</h4>
                    <span class="assignment-date">Assigned: ${new Date(assignment.assignedDate).toLocaleDateString()}</span>
                </div>
                <div class="assignment-card-body">
                    <p><strong>Source:</strong> ${t(`tabs.${assignment.tool}`)}</p>
                    <p><strong>Status:</strong> ${assignment.status}</p>
                </div>
            </div>
        `).join('')
        : `<p>No assignments for ${student.name} yet.</p>`;

    return `
        <div class="student-detail-view">
            <div class="student-detail-header">
                <h2>${student.name}'s Dashboard</h2>
                <button class="secondary small" data-action="back-to-roster">${t('buttons.backToRoster')}</button>
            </div>
            <div class="assignment-list">
                <h3>Assignments</h3>
                ${assignmentsHtml}
            </div>
        </div>
    `;
}

function renderLanguageArchitectForm(toolKey) {
    const syntaxStyles = getTranslationObject('options.syntaxStyle');
    return `
        <div class="form-container">
            <form id="language-architect-form">
                <fieldset>
                    <legend>🏛️ ${t('tabs.languageArchitect')}
                        <button class="help-btn" type="button" data-action="open-help-modal" data-tool-key="${toolKey}" title="${t('buttons.help')}">?</button>
                    </legend>
                    
                    <div>
                        <label for="languageName">${t('labels.languageName')}</label>
                        <input type="text" id="languageName" name="languageName" placeholder="${t('placeholders.languageName')}" required>
                    </div>

                    <div>
                        <label for="syntaxStyle">${t('labels.syntaxStyle')}</label>
                        <select id="syntaxStyle" name="syntaxStyle">
                            ${Object.keys(syntaxStyles).map(key => `<option value="${key}">${syntaxStyles[key]}</option>`).join('')}
                        </select>
                    </div>

                    <fieldset class="nested-fieldset">
                        <legend>${t('labels.customKeywords')}</legend>
                        <div class="form-grid-2">
                            <div>
                                <label for="keywordVariable">${t('labels.keywordVariable')}</label>
                                <input type="text" id="keywordVariable" name="keywordVariable" placeholder="${t('placeholders.keywordVariable')}" required>
                            </div>
                             <div>
                                <label for="keywordConditional">${t('labels.keywordConditional')}</label>
                                <input type="text" id="keywordConditional" name="keywordConditional" placeholder="${t('placeholders.keywordConditional')}" required>
                            </div>
                             <div>
                                <label for="keywordLoop">${t('labels.keywordLoop')}</label>
                                <input type="text" id="keywordLoop" name="keywordLoop" placeholder="${t('placeholders.keywordLoop')}" required>
                            </div>
                            <div>
                                <label for="keywordFunction">${t('labels.keywordFunction')}</label>
                                <input type="text" id="keywordFunction" name="keywordFunction" placeholder="${t('placeholders.keywordFunction')}" required>
                            </div>
                             <div>
                                <label for="keywordOutput">${t('labels.keywordOutput')}</label>
                                <input type="text" id="keywordOutput" name="keywordOutput" placeholder="${t('placeholders.keywordOutput')}" required>
                            </div>
                        </div>
                    </fieldset>

                    <div>
                        <label for="languageGoal">${t('labels.languageGoal')}</label>
                        <textarea id="languageGoal" name="languageGoal" placeholder="${t('placeholders.languageGoal')}" required></textarea>
                    </div>
                    
                    <button type="submit">${t('buttons.generateLanguage')}</button>
                </fieldset>
            </form>
        </div>
    `;
}

function renderLanguageArchitectOutput() {
    const { loading, error, output } = state.teacherSuiteState.languageArchitectState;

    if (loading) return `<div class="loader"></div>`;
    if (error) return `<div class="error-card">${error}</div>`;

    if (!output) {
        const placeholder = getTranslationObject('outputPlaceholders.languageArchitect');
        return `
            <div class="placeholder">
                <span class="placeholder-icon">🏛️</span>
                <h2>${placeholder.title}</h2>
                <p>${placeholder.p1}</p>
                <p>${placeholder.p2}</p>
            </div>
        `;
    }
    
    const overviewId = `la-overview-${output.languageName.replace(/\s/g, '')}`;
    const isSpeaking = state.ttsState.speaking && state.ttsState.targetId === overviewId;

    return `
        <div class="output-content language-architect-output">
            <div class="doc-header">
                <h1>Welcome to ${output.languageName}!</h1>
                 <div class="doc-meta">
                    <span>A new programming language designed by you.</span>
                    <div class="header-actions">
                        <button class="tts-btn" data-action="${isSpeaking ? 'stop-speech' : 'listen'}" data-target-id="${overviewId}">${isSpeaking ? t('buttons.stop') : t('buttons.listen')}</button>
                        <button class="secondary small" data-action="assign-to-roster" data-tool="languageArchitect">${t('buttons.assignToStudents')}</button>
                    </div>
                </div>
            </div>
            
            <p id="${overviewId}">${output.overview}</p>

            <div class="content-card blue">
                <h3>Syntax Guide</h3>
                <div class="doc-content">
                    ${renderMarkdown(output.syntaxGuide)}
                </div>
            </div>

            <div class="content-card green">
                <h3>"Hello, World!" Example</h3>
                <div class="code-block">
                    <pre><code>${output.helloWorldExample.trim()}</code></pre>
                </div>
            </div>
            
             <div class="content-card purple">
                <h3>Custom Program Example</h3>
                 <div class="code-block">
                    <pre><code>${output.customExample.trim()}</code></pre>
                </div>
            </div>
        </div>
    `;
}

function renderDocumentationGeneratorForm(toolKey) {
    const docStyles = getTranslationObject('options.docStyle');
    const docAudiences = getTranslationObject('options.docAudience');

    return `
        <div class="form-container">
            <form id="documentation-generator-form">
                <fieldset>
                    <legend>📄 ${t('tabs.documentationGenerator')}
                        <button class="help-btn" type="button" data-action="open-help-modal" data-tool-key="${toolKey}" title="${t('buttons.help')}">?</button>
                    </legend>
                    <div>
                        <label for="docTopic">${t('labels.docTopic')}</label>
                        <input type="text" id="docTopic" name="docTopic" placeholder="${t('placeholders.docTopic')}" required>
                    </div>
                     <div>
                        <label for="docStyle">${t('labels.docStyle')}</label>
                        <select id="docStyle" name="docStyle">
                            ${Object.keys(docStyles).map(key => `<option value="${key}">${docStyles[key]}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="docAudience">${t('labels.docAudience')}</label>
                        <select id="docAudience" name="docAudience">
                             ${Object.keys(docAudiences).map(key => `<option value="${key}">${docAudiences[key]}</option>`).join('')}
                        </select>
                    </div>
                     <div>
                        <label for="docCodeSnippet">${t('labels.docCodeSnippet')}</label>
                        <textarea id="docCodeSnippet" name="docCodeSnippet" placeholder="${t('placeholders.docCodeSnippet')}"></textarea>
                    </div>
                    <div class="checkbox-grid">
                        <div>
                           <input type="checkbox" id="docBestPractices" name="docBestPractices" value="true">
                           <label for="docBestPractices">${t('labels.docBestPractices')}</label>
                        </div>
                    </div>
                    <button type="submit">${t('buttons.generateDocs')}</button>
                </fieldset>
            </form>
        </div>
    `;
}

function renderDocumentationGeneratorOutput() {
    const { loading, error, output } = state.teacherSuiteState.documentationGeneratorState;

    if (loading) return `<div class="loader"></div>`;
    if (error) return `<div class="error-card">${error}</div>`;

    if (!output) {
        const placeholder = getTranslationObject('outputPlaceholders.documentationGenerator');
        return `
            <div class="placeholder">
                <span class="placeholder-icon">📄</span>
                <h2>${placeholder.title}</h2>
                <p>${placeholder.p1}</p>
                <p>${placeholder.p2}</p>
            </div>
        `;
    }

    const bestPracticesHtml = output.bestPractices && output.bestPractices.length > 0
        ? `
            <div class="doc-best-practices">
                <h3>💡 Best Practices</h3>
                <ul>
                    ${output.bestPractices.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `
        : '';

    const contentId = `doc-content-${output.title.replace(/\s/g, '')}`;
    const isSpeaking = state.ttsState.speaking && state.ttsState.targetId === contentId;

    return `
        <div class="output-content doc-output-container">
            <div class="doc-header">
                <h1>${output.title}</h1>
                <div class="doc-meta">
                    <span><strong>Style:</strong> ${t(`options.docStyle.${output.style}`)}</span>
                     <div class="header-actions">
                        <button class="tts-btn" data-action="${isSpeaking ? 'stop-speech' : 'listen'}" data-target-id="${contentId}">${isSpeaking ? t('buttons.stop') : t('buttons.listen')}</button>
                        <button class="secondary small" data-action="assign-to-roster" data-tool="documentationGenerator">${t('buttons.assignToStudents')}</button>
                    </div>
                </div>
            </div>
            <div id="${contentId}" class="doc-content">
                ${renderMarkdown(output.content)}
            </div>
            ${bestPracticesHtml}
        </div>
    `;
}

function renderQuizGeneratorForm(toolKey) {
    const questionTypes = getTranslationObject('questionTypes');

    return `
        <div class="form-container">
            <form id="quiz-generator-form">
                <fieldset>
                    <legend>❓ ${t('tabs.quizGenerator')}
                        <button class="help-btn" type="button" data-action="open-help-modal" data-tool-key="${toolKey}" title="${t('buttons.help')}">?</button>
                    </legend>
                    <div>
                        <label for="quizTopic">${t('labels.topic')}</label>
                        <input type="text" id="quizTopic" name="topic" placeholder="${t('placeholders.quizTopic')}" required>
                    </div>
                    <div class="form-grid-2">
                        <div>
                            <label for="numQuestions">${t('labels.numQuestions')}</label>
                            <input type="number" id="numQuestions" name="numQuestions" value="5" min="1" max="15" required>
                        </div>
                        <div>
                            <label for="difficultyLevel">${t('labels.difficultyLevel')}</label>
                            <select id="difficultyLevel" name="difficultyLevel">
                                <option>Beginner</option>
                                <option selected>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>${t('labels.questionTypes')}</label>
                        <div class="checkbox-grid">
                            ${Object.keys(questionTypes).map(key => `
                                <div>
                                    <input type="checkbox" id="qt_${key}" name="questionTypes" value="${key}" checked>
                                    <label for="qt_${key}">${questionTypes[key]}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="checkbox-grid">
                         <div>
                           <input type="checkbox" id="includeImage" name="includeImage" value="true">
                           <label for="includeImage">${t('labels.includeImage')}</label>
                        </div>
                    </div>
                    <button type="submit">${t('buttons.generateQuestions')}</button>
                </fieldset>
            </form>
        </div>
    `;
}

function renderQuizGeneratorOutput() {
    const { loading, error, output } = state.teacherSuiteState.quizGeneratorState;

    if (loading) return `<div class="loader-overlay"><div class="loader"></div><p>Generating your quiz...</p></div>`;
    if (error) return `<div class="error-card">${error}</div>`;

    if (!output) {
        const placeholder = getTranslationObject('outputPlaceholders.quizGenerator');
        return `
            <div class="placeholder">
                <span class="placeholder-icon">❓</span>
                <h2>${placeholder.title}</h2>
                <p>${placeholder.p1}</p>
                <p>${placeholder.p2}</p>
            </div>
        `;
    }

    const colors = ['blue', 'teal', 'green', 'orange', 'purple', 'pink'];
    
    function shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }

    const renderQuestion = (question, index) => {
        const color = colors[index % colors.length];
        let content = '';

        switch (question.type) {
            case 'multipleChoice':
                content = `
                    <p>${question.question}</p>
                    <ul class="quiz-options-list">
                        ${question.options.map(opt => `<li>${opt}</li>`).join('')}
                    </ul>
                `;
                break;
            case 'trueFalse':
                content = `
                    <p>${question.question}</p>
                     <ul class="quiz-options-list">
                        <li>True</li>
                        <li>False</li>
                    </ul>`;
                break;
            case 'shortAnswer':
                content = `<p>${question.question}</p>`;
                break;
            case 'fillInTheBlanks':
                content = `<p>${question.question.replace('___', '<input type="text" class="fill-in-the-blanks-input" placeholder="Type answer here">')}</p>`;
                break;
            case 'matching':
                const shuffledDefinitions = shuffleArray(question.pairs.map(p => p.definition));
                content = `
                    <p>${question.question}</p>
                    <div class="matching-test-container">
                        <div class="matching-column">
                            <ol>
                                ${question.pairs.map(p => `<li>${p.term}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="matching-column">
                            <ul>
                                ${shuffledDefinitions.map((d, i) => `<li><strong>${String.fromCharCode(65 + i)}.</strong> ${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                break;
            default:
                content = `<p>Unsupported question type: ${question.type}</p>`;
        }

        return `
            <div class="quiz-question-card content-card ${color}">
                <h3>${t(`questionTypes.${question.type}`)}</h3>
                ${content}
            </div>
        `;
    };

    return `
        <div class="output-content">
            ${output.image ? `<div class="quiz-image-header"><img src="${output.image}" alt="${output.title} header image"></div>` : ''}
            <div class="doc-header">
                <h1>${output.title}</h1>
                 <div class="doc-meta">
                    <span>A quiz by CodeGenius AI</span>
                    <button class="secondary small" data-action="assign-to-roster" data-tool="quizGenerator">${t('buttons.assignToStudents')}</button>
                </div>
            </div>
            ${output.questions.map((q, i) => renderQuestion(q, i)).join('')}
        </div>
    `;
}

function renderAssignModal() {
    const { isAssignModalOpen, assignmentMeta, roster } = state.teacherSuiteState.projectHubState;
    if (!isAssignModalOpen) return '';

    const studentListHtml = roster.map(student => `
        <label class="assign-modal-student-item">
            <input type="checkbox" name="studentIds" value="${student.id}">
            <span>${student.name}</span>
        </label>
    `).join('');

    return `
        <div class="modal-overlay" data-action="close-assign-modal">
            <form class="modal-content" id="assign-to-students-form">
                <button class="modal-close" type="button" data-action="close-assign-modal">&times;</button>
                <div class="modal-header">
                    <h2>Assign Content</h2>
                    <p>Assigning: <strong>${assignmentMeta.title}</strong></p>
                </div>
                <div class="modal-body">
                    <div class="assign-modal-student-list">
                        ${studentListHtml}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="secondary" data-action="close-assign-modal">${t('buttons.cancel')}</button>
                    <button type="submit">${t('buttons.assign')}</button>
                </div>
            </form>
        </div>
    `;
}


// All student form and output renderers
function renderCodeInTheWildForm(toolKey) { 
    const { uiState } = state.studentSuiteState.codeInTheWildState;
     return `
        <div class="form-container">
            <form>
                <fieldset>
                    <legend>📸 ${t('tabs.codeInTheWild')}
                         <button type="button" class="help-btn" data-action="open-help-modal" data-tool-key="${toolKey}" title="${t('buttons.help')}">?</button>
                    </legend>
                    ${ (uiState === 'result' || uiState === 'chatting') ? `
                        <p>What would you like to do with this discovery?</p>
                        <div class="form-grid-2">
                            <button type="button" data-action="start-over-wild">${t('buttons.startOver')}</button>
                            <button type="button" data-action="add-to-journal" class="secondary">${t('buttons.addToJournal')}</button>
                        </div>
                    ` : `<p>Use the controls in the main panel to start exploring.</p>`}
                </fieldset>
            </form>
        </div>
    `;
}

function renderCodeInTheWildOutput() { 
    const { uiState, stream, imageData, analysisResult, activeHotspot, messages, loading, error } = state.studentSuiteState.codeInTheWildState;
    const container = document.createElement('div');
    
    if (error) {
        container.innerHTML = `<div class="error-card">${error}</div>`;
        return container.innerHTML;
    }

    let content = '';

    switch (uiState) {
        case 'initial':
            const placeholder = getTranslationObject('outputPlaceholders.codeInTheWild');
            content = `
                <div class="placeholder">
                    <span class="placeholder-icon">📸</span>
                    <h2>${placeholder.title}</h2>
                    <p>${placeholder.p1}</p>
                    <p>${placeholder.p2}</p>
                    <div class="wild-controls">
                        <button type="button" data-action="use-camera">${t('buttons.useCamera')}</button>
                        <label class="button-label" for="upload-image-input">${t('buttons.uploadImage')}</label>
                        <input type="file" id="upload-image-input" accept="image/*" style="display:none;">
                    </div>
                </div>
            `;
            break;

        case 'camera':
            content = `
                <div class="camera-view">
                    <video id="camera-stream" autoplay playsinline></video>
                    <div class="camera-overlay-buttons">
                        <button data-action="capture-image">${t('buttons.capture')}</button>
                        <button data-action="cancel-camera" class="secondary">${t('buttons.cancel')}</button>
                    </div>
                </div>
            `;
            break;

        case 'analyzing':
            content = `
                <div class="image-analysis-container">
                    <img src="${imageData}" alt="Analysis subject" class="analysis-image">
                    <div class="loader-overlay">
                        <div class="loader"></div>
                        <p>Analyzing UI components...</p>
                    </div>
                </div>
            `;
            break;
        
        case 'result':
        case 'chatting':
            const hotspotsHtml = analysisResult.hotspots.map((h, i) => `
                <div class="hotspot" data-action="hotspot-click" data-hotspot-index="${i}" style="left: ${h.x}%; top: ${h.y}%;" title="${h.title}">
                    ${i + 1}
                </div>
            `).join('');
            
            const chatMessagesHtml = messages.map(msg => {
                if(msg.role === 'user') {
                    return `<div class="chat-message user"><p>${msg.content}</p></div>`;
                } else {
                    return `<div class="chat-message ai">${msg.isHtml ? msg.content : `<p>${msg.content}</p>`}</div>`;
                }
            }).join('');

            content = `
                <div class="wild-interactive-grid">
                    <div class="wild-image-pane">
                        <div class="image-analysis-container">
                            <img src="${imageData}" alt="Analysis subject" class="analysis-image">
                            <div class="hotspots-overlay">${hotspotsHtml}</div>
                        </div>
                        <p class="wild-summary">${analysisResult.overall_summary}</p>
                    </div>
                    <div class="wild-chat-pane">
                        ${uiState === 'chatting' ? `
                            <div class="chat-messages" id="wild-chat-messages">${chatMessagesHtml}${loading ? '<div class="loader-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>' : ''}</div>
                            <form class="chat-input-form" id="wild-chat-form">
                                <input type="text" name="wildChat" placeholder="${t('placeholders.wildChat')}" required autocomplete="off">
                                <button type="submit">${t('buttons.send')}</button>
                            </form>
                        ` : `
                            <div class="placeholder">
                                <span class="placeholder-icon">👆</span>
                                <h2>Discoveries Found!</h2>
                                <p>Click on a pulsing hotspot on the image to learn more about a specific UI component or pattern.</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
            break;

        default:
            content = `<div class="error-card">Unknown UI state: ${uiState}</div>`;
    }
    container.innerHTML = `<div class="output-content full-width-output">${content}</div>`;
    return container.innerHTML;
}
function renderPortfolioBuilderOutput() { 
    const { entries } = state.studentSuiteState.portfolioBuilderState;

    if (entries.length === 0) {
        const placeholder = getTranslationObject('outputPlaceholders.portfolioBuilder');
        return `
            <div class="placeholder">
                <span class="placeholder-icon">🗂️</span>
                <h2>${placeholder.title}</h2>
                <p>${placeholder.p1}</p>
                <p>${placeholder.p2}</p>
            </div>
        `;
    }

    return `
        <div class="output-content">
            <div class="journal-grid">
                ${entries.map(entry => `
                    <div class="journal-card" data-action="open-journal-entry" data-entry-id="${entry.id}">
                        <img src="${entry.image}" alt="${entry.title}" class="journal-card-img">
                        <div class="journal-card-overlay">
                            <h3 class="journal-card-title">${entry.title}</h3>
                            <p class="journal-card-date">${new Date(entry.date).toLocaleString()}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderLanguageMasteryPathForm(toolKey) {
    const { loading } = state.studentSuiteState.languageMasteryPathState;
    const curricula = getTranslationObject('curricula');

    return `
        <div class="form-container">
            <form id="language-mastery-path-form">
                <fieldset ${loading ? 'disabled' : ''}>
                    <legend>🗺️ ${t('tabs.languageMasteryPath')}
                         <button type="button" class="help-btn" data-action="open-help-modal" data-tool-key="${toolKey}" title="${t('buttons.help')}">?</button>
                    </legend>

                    <div class="mastery-selection-grid">
                        <div>
                            <label for="masteryLanguage">${t('labels.masteryLanguage')}</label>
                            <select id="masteryLanguage" name="language" required>
                                <optgroup label="General Purpose">
                                    <option value="Python">Python</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Java">Java</option>
                                    <option value="C++">C++</option>
                                    <option value="C#">C#</option>
                                    <option value="Rust">Rust</option>
                                </optgroup>
                                <optgroup label="Web Development">
                                    <option value="HTML/CSS">HTML/CSS</option>
                                    <option value="React">React</option>
                                    <option value="Next.js">Next.js</option>
                                </optgroup>
                                <optgroup label="Data &amp; Databases">
                                    <option value="SQL">SQL</option>
                                </optgroup>
                                <optgroup label="AI &amp; Machine Learning">
                                    <option value="Prompt Engineering">Prompt Engineering</option>
                                    <option value="Prompt Engineering for DevOps">Prompt Engineering for DevOps</option>
                                    <option value="Data Analytics">Data Analytics</option>
                                </optgroup>
                            </select>
                        </div>
                        <div>
                            <label for="masteryCurriculum">${t('labels.masteryCurriculum')}</label>
                            <select id="masteryCurriculum" name="curriculum" required>
                                ${Object.keys(curricula).map(regionKey => `
                                    <optgroup label="${curricula[regionKey].name}">
                                        ${Object.keys(curricula[regionKey].options).map(optionKey => `
                                            <option value="${optionKey}">${curricula[regionKey].options[optionKey]}</option>
                                        `).join('')}
                                    </optgroup>
                                `).join('')}
                            </select>
                        </div>
                    </div>

                    <button type="submit">${t('buttons.startLearning')}</button>
                </fieldset>
            </form>
        </div>
    `;
}

function renderLanguageMasteryPathOutput() {
    const { uiState, loading, error, output } = state.studentSuiteState.languageMasteryPathState;

    if (loading) return `<div class="loader-overlay"><div class="loader"></div><p>Building your learning path...</p></div>`;
    if (error && !state.studentSuiteState.languageMasteryPathState.activeModule) return `<div class="error-card">${error}</div>`;

    if (uiState === 'module') {
        return renderMasteryModuleView();
    }
    
    if (uiState === 'dashboard' && output) {
        return renderMasteryDashboard(output);
    }
    
    // Default to selection placeholder
    const placeholder = getTranslationObject('outputPlaceholders.languageMasteryPath');
    return `
        <div class="placeholder">
            <span class="placeholder-icon">🗺️</span>
            <h2>${placeholder.title}</h2>
            <p>${placeholder.p1}</p>
            <p>${placeholder.p2}</p>
        </div>
    `;
}

function renderMasteryDashboard(data) {
    const completedCount = data.roadmap.filter(item => item.status === 'completed').length;
    const progress = (completedCount / data.roadmap.length) * 100;

    return `
        <div class="output-content mastery-dashboard">
            <h1>${data.title}</h1>
            <p>${data.overview}</p>

            <div class="mastery-progress-container">
                <span>Progress: ${Math.round(progress)}%</span>
                <div class="mastery-progress-bar-background">
                    <div class="mastery-progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="mastery-topic-list">
                ${data.roadmap.map((item, index) => `
                    <div class="mastery-topic-card ${item.status}">
                        <div class="mastery-topic-status-icon"></div>
                        <div class="mastery-topic-content">
                            <h4>${index + 1}. ${item.topic}</h4>
                            <p>${item.description}</p>
                        </div>
                        <div class="mastery-topic-action">
                             <button class="small" 
                                data-action="start-mastery-module" 
                                data-topic-index="${index}" 
                                ${item.status === 'locked' ? 'disabled' : ''}>
                                ${item.status === 'completed' ? 'Review' : 'Start'}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderMasteryModuleView() {
    const { loadingModule, error, activeModule, currentTopicIndex, quizState } = state.studentSuiteState.languageMasteryPathState;

    if (loadingModule) {
        return `<div class="loader-overlay"><div class="loader"></div><p>Building your learning module...</p></div>`;
    }

    if (error) {
        return `<div class="error-card">${error}</div>`;
    }

    if (!activeModule) {
        // This can happen if there's an error but the main output doesn't catch it
        return `<div class="placeholder"><p>Could not load module.</p></div>`;
    }

    const explanationId = `mastery-explanation-${currentTopicIndex}`;
    const isSpeaking = state.ttsState.speaking && state.ttsState.targetId === explanationId;

    return `
        <div class="output-content mastery-module-view">
            <div class="doc-header">
                <h1>${activeModule.title}</h1>
                <div class="doc-meta">
                    <button class="secondary small" data-action="back-to-mastery-dashboard">${t('buttons.backToMasteryDashboard')}</button>
                    <button class="tts-btn" data-action="${isSpeaking ? 'stop-speech' : 'listen'}" data-target-id="${explanationId}">
                        ${isSpeaking ? t('buttons.stop') : t('buttons.listen')}
                    </button>
                </div>
            </div>

            <div id="${explanationId}" class="content-card blue">
                <h3>Explanation</h3>
                <div class="doc-content">${renderMarkdown(activeModule.explanation)}</div>
            </div>

            <div class="content-card green">
                <h3>Code Example</h3>
                <div class="code-block"><pre><code>${activeModule.codeExample.trim()}</code></pre></div>
            </div>

            <div class="content-card purple">
                <h3>Try it Yourself!</h3>
                <div class="doc-content">${renderMarkdown(activeModule.exercise.prompt)}</div>
                <details class="exercise-solution">
                    <summary>Show Solution</summary>
                    <div class="code-block"><pre><code>${activeModule.exercise.solution.trim()}</code></pre></div>
                </details>
            </div>

            <div class="content-card teal">
                <h3>Test Your Understanding</h3>
                ${renderMasteryQuiz()}
            </div>

            <div class="mastery-module-footer">
                 <button 
                    data-action="complete-mastery-module" 
                    data-topic-index="${currentTopicIndex}"
                    ${!quizState.isFinished ? 'disabled' : ''}
                    title="${!quizState.isFinished ? 'Complete the quiz to continue' : t('buttons.markAsComplete')}"
                >
                    ${t('buttons.markAsComplete')}
                </button>
            </div>
        </div>
    `;
}

function renderMasteryQuiz() {
    const { activeModule, quizState } = state.studentSuiteState.languageMasteryPathState;
    if (!activeModule.quiz || !activeModule.quiz.questions) return '<p>No quiz available for this module.</p>';

    const { questions } = activeModule.quiz;
    const { currentQuestionIndex, isFinished, selectedAnswer, feedback, userAnswers } = quizState;

    if (isFinished) {
        const score = userAnswers.filter(a => a.isCorrect).length;
        const total = questions.length;
        return `
            <div class="quiz-results">
                <h4>Quiz Complete!</h4>
                <p>You scored <strong>${score} out of ${total}</strong>.</p>
                <button data-action="retake-quiz" class="secondary small">Retake Quiz</button>
            </div>
        `;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const hasAnswered = feedback !== null;

    const optionsHtml = currentQuestion.options.map(option => {
        let buttonClass = 'quiz-option';
        if (hasAnswered) {
            if (option === feedback.correctAnswer) {
                buttonClass += ' correct';
            } else if (option === selectedAnswer && !feedback.isCorrect) {
                buttonClass += ' incorrect';
            } else {
                 buttonClass += ' disabled';
            }
        } else if (option === selectedAnswer) {
            buttonClass += ' selected';
        }
        
        // Use a simple function to escape potential quotes in the answer
        const escapedOption = option.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

        return `
            <button 
                class="${buttonClass}" 
                data-action="select-quiz-answer" 
                data-answer="${escapedOption}"
                ${hasAnswered ? 'disabled' : ''}
            >
                ${option}
            </button>
        `;
    }).join('');

    return `
        <div class="quiz-container">
            <div class="quiz-progress">Question ${currentQuestionIndex + 1} of ${questions.length}</div>
            <p class="quiz-question">${currentQuestion.questionText}</p>
            <div class="quiz-options">${optionsHtml}</div>
            
            ${hasAnswered ? `
                <div class="quiz-feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}">
                    <strong>${feedback.isCorrect ? 'Correct!' : 'Not quite.'}</strong>
                    <p>${feedback.explanation}</p>
                </div>
            ` : ''}

            <div class="quiz-actions">
                ${hasAnswered ? `
                    <button data-action="quiz-next-question">${currentQuestionIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}</button>
                ` : `
                    <button data-action="check-quiz-answer" ${!selectedAnswer ? 'disabled' : ''}>Check Answer</button>
                `}
            </div>
        </div>
    `;
}


function renderJournalModal() {
    const { isModalOpen, selectedEntry } = state.studentSuiteState.portfolioBuilderState;
    if (!isModalOpen || !selectedEntry) return '';
    
    const chatHtml = selectedEntry.chatHistory.map(msg => {
        if(msg.role === 'user') {
            return `<div class="chat-message user"><p>${msg.content}</p></div>`;
        } else {
            return `<div class="chat-message ai">${msg.isHtml ? msg.content : `<p>${msg.content}</p>`}</div>`;
        }
    }).join('');

    return `
        <div class="modal-overlay" data-action="close-journal-modal">
            <div class="modal-content journal-modal-content">
                <button class="modal-close" data-action="close-journal-modal">&times;</button>
                <div class="modal-header">
                    <h2>${selectedEntry.title}</h2>
                    <p>${new Date(selectedEntry.date).toLocaleString()}</p>
                </div>
                <div class="modal-body">
                    <img src="${selectedEntry.image}" alt="${selectedEntry.title}" class="journal-modal-image"/>
                    <h3>Chat History</h3>
                    <div class="chat-messages">${chatHtml}</div>
                </div>
            </div>
        </div>
    `;
}

function renderHelpModal() {
    const { isOpen, toolKey, messages, loading, error } = state.helpModalState;
    if (!isOpen) return '';

    const chatMessagesHtml = messages.map(msg => {
        if(msg.role === 'user') {
            return `<div class="chat-message user"><p>${msg.content}</p></div>`;
        } else {
            return `<div class="chat-message ai"><div class="help-modal-initial-info">${msg.content}</div></div>`;
        }
    }).join('');

    return `
        <div class="modal-overlay" data-action="close-help-modal">
            <div class="modal-content help-modal-content">
                <button class="modal-close" type="button" data-action="close-help-modal">&times;</button>
                <div class="modal-header">
                    <h2>${t('buttons.help')}: ${t(`tabs.${toolKey}`)}</h2>
                </div>
                <div class="modal-body">
                    <div class="chat-messages" id="help-chat-messages">${chatMessagesHtml}${loading ? '<div class="loader-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>' : ''}</div>
                    <form class="chat-input-form" id="help-chat-form">
                        <input type="text" name="helpChat" placeholder="${t('placeholders.helpChat')}" required autocomplete="off" ${loading ? 'disabled' : ''}>
                        <button type="submit" ${loading ? 'disabled' : ''}>${t('buttons.send')}</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}


// --- EVENT LISTENERS ---

function setupEventListeners() {
    document.body.addEventListener('click', handleDelegatedClick);
    document.body.addEventListener('change', handleDelegatedChange);
    document.body.addEventListener('submit', handleDelegatedSubmit);

    // Ensure speech is stopped when the page is closed/unloaded
    window.addEventListener('beforeunload', handleStopSpeech);
}
function handleDelegatedClick(event) {
    const target = event.target as HTMLElement;
    const actionButton = target.closest('[data-action]');
    if (actionButton) {
        const action = actionButton.getAttribute('data-action');
        if (action !== 'hotspot-click') { // Prevent default for most, but not hotspots
             event.preventDefault(); 
        }

        const toolKey = actionButton.getAttribute('data-tool-key');
        
        // Suite & Tab Switching
        if (action === 'switch-suite') {
            const suite = actionButton.getAttribute('data-suite');
            setState({ activeSuite: suite });
        }
        if (action === 'switch-tab') {
            const suite = actionButton.getAttribute('data-suite');
            const tab = actionButton.getAttribute('data-tab');
            setState({ activeTabs: { ...state.activeTabs, [suite]: tab } });
        }

        // Help Modal
        if (action === 'open-help-modal') handleOpenHelpModal(toolKey);
        if (action === 'close-help-modal') handleCloseHelpModal();

        // Project Hub
        if (action === 'select-student') handleSelectStudent(actionButton.getAttribute('data-student-id'));
        if (action === 'back-to-roster') handleBackToRoster();
        if (action === 'assign-to-roster') handleOpenAssignModal(actionButton.getAttribute('data-tool'));
        if (action === 'close-assign-modal') handleCloseAssignModal();
        
        // Generic Actions
        if (action === 'share-app') {
            // handleShareApp() - not implemented in this version to save space
        }
        
        // Code in the Wild
        if (action === 'use-camera') handleUseCamera();
        if (action === 'cancel-camera') handleCancelCamera();
        if (action === 'capture-image') handleCaptureImage();
        if (action === 'start-over-wild') handleStartOverWild();
        if (action === 'add-to-journal') handleAddToJournal();
        if (action === 'hotspot-click') {
            const index = parseInt(actionButton.getAttribute('data-hotspot-index'), 10);
            handleHotspotClick(state.studentSuiteState.codeInTheWildState.analysisResult.hotspots[index]);
        }
        
        // Portfolio Builder
        if (action === 'open-journal-entry') {
            const entryId = actionButton.getAttribute('data-entry-id');
            const entry = state.studentSuiteState.portfolioBuilderState.entries.find(e => e.id === entryId);
            setState({ studentSuiteState: { ...state.studentSuiteState, portfolioBuilderState: { ...state.studentSuiteState.portfolioBuilderState, isModalOpen: true, selectedEntry: entry } } });
        }
        if (action === 'close-journal-modal') {
             setState({ studentSuiteState: { ...state.studentSuiteState, portfolioBuilderState: { ...state.studentSuiteState.portfolioBuilderState, isModalOpen: false, selectedEntry: null } } });
        }

        // Language Mastery Path
        if (action === 'start-mastery-module') {
            const topicIndex = parseInt(actionButton.getAttribute('data-topic-index'), 10);
            handleStartMasteryModule(topicIndex);
        }
        if (action === 'complete-mastery-module') {
            const topicIndex = parseInt(actionButton.getAttribute('data-topic-index'), 10);
            handleCompleteMasteryModule(topicIndex);
        }
        if (action === 'back-to-mastery-dashboard') handleBackToMasteryDashboard();
        
        // TTS
        if (action === 'listen' || action === 'stop-speech') handleListen(event);

        // Mastery Path Quiz
        if (action === 'select-quiz-answer') {
            handleSelectQuizAnswer(actionButton.getAttribute('data-answer'));
        }
        if (action === 'check-quiz-answer') handleCheckQuizAnswer();
        if (action === 'quiz-next-question') handleQuizNextQuestion();
        if (action === 'retake-quiz') handleRetakeQuiz();
    }
}

function handleDelegatedChange(event: Event) {
    const target = event.target as HTMLElement;

    if (target.matches('#upload-image-input')) {
        handleUploadImage(event);
    }
}

function handleDelegatedSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    if (!form || form.tagName !== 'FORM') {
        return;
    }
    event.preventDefault();

    switch (form.id) {
        // Educator Suite
        case 'add-student-form': handleAddStudent(event); break;
        case 'assign-to-students-form': handleAssignSubmit(event); break;
        case 'language-architect-form': handleLanguageArchitectSubmit(event); break;
        case 'documentation-generator-form': handleDocumentationGeneratorSubmit(event); break;
        case 'quiz-generator-form': handleQuizGeneratorSubmit(event); break;
        
        // Learner Suite
        case 'wild-chat-form': handleWildChatSubmit(event); break;
        case 'language-mastery-path-form': handleStartMasteryPath(event); break;

        // Modal forms
        case 'help-chat-form': handleHelpChatSubmit(event); break;
    }
}


function switchSuite(suite) {
    handleStopSpeech();
    setState({ activeSuite: suite });
}

function switchTab(suite, tab) {
    handleStopSpeech();
    if(tab === 'portfolioBuilder'){
         setState({ 
            activeTabs: { ...state.activeTabs, [suite]: tab },
            studentSuiteState: { ...state.studentSuiteState, portfolioBuilderState: { ...state.studentSuiteState.portfolioBuilderState, isModalOpen: false, selectedEntry: null } },
         });
    } else {
        setState({ activeTabs: { ...state.activeTabs, [suite]: tab } });
    }
    // Reset mastery path when switching away from it
    if (suite === 'student' && tab !== 'languageMasteryPath') {
        const { languageMasteryPathState } = state.studentSuiteState;
        if (languageMasteryPathState.uiState !== 'selection' || languageMasteryPathState.output !== null) {
            setState({ studentSuiteState: { ...state.studentSuiteState, languageMasteryPathState: { uiState: 'selection', loading: false, output: null, error: null, progress: 0, activeModule: null, currentTopicIndex: null, loadingModule: false } } });
        }
    }
}

document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const suiteBtn = target.closest('.suite-btn');
    const tabBtn = target.closest('.tab-btn');

    if (suiteBtn) {
        switchSuite(suiteBtn.getAttribute('data-suite'));
        return;
    }
    if (tabBtn) {
        switchTab(tabBtn.getAttribute('data-suite'), tabBtn.getAttribute('data-tab'));
        return;
    }
});


// Initial Render
renderApp();
setupEventListeners();