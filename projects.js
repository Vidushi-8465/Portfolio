/**
 * Projects Data and Dynamic Rendering
 */

// ============================================
// Projects Data
// ============================================
const projects = [
    {
        id: 1,
        title: "Resume Scorer",
        description: "A comprehensive NLP-powered resume analysis tool that uses SpaCy for entity extraction and implements a fair, weighted scoring algorithm to evaluate candidate qualifications. Features include skill extraction, experience parsing, and normalized ranking.",
        icon: "📄",
        tags: ["NLP", "SpaCy", "Python"],
        github: "https://github.com/Vidushi-8465/30_days_challenge/tree/Main/Resume_Scorer"
    },
    {
        id: 2,
        title: "Sign Language Detection",
        description: "A sign language detection system that uses a convolutional neural network (CNN) to classify hand gestures into predefined classes. The model is trained on a dataset of hand gestures and tested on a new dataset to evaluate its performance.",
        icon: "🤟",
        tags: ["TensorFlow", "SpaCy", "Python", "CNN", "Mediapipe"],
        github: "https://github.com/Vidushi-8465/30_days_challenge/tree/Main/Sign%20Lang%20Recognition"
    },
    {
        id: 3,
        title: "Image Emotion Detection",
        description: "Real-time emotion detection system using webcam feed. Leverages transfer learning with pre-trained models to accurately classify facial expressions into various emotional states with high accuracy.",
        icon: "😊",
        tags: ["Keras", "TensorFlow", "OpenCV", "Transfer Learning"],
        github: "https://github.com/Vidushi-8465/30_days_challenge/tree/Main/Emotion%20Detection%20Using%20Cam"
    },
    {
        id: 4,
        title: "Pomodoro Timer",
        description: "A productivity-focused Pomodoro timer application with customizable work and break intervals, sound notifications, and session tracking to help users maintain focus and manage time effectively.",
        icon: "⏱️",
        tags: ["JavaScript", "HTML", "CSS"],
        github: "https://github.com/Vidushi-8465/30_days_challenge/tree/Main/Pomodoro%20Timer"
    },
    {
        id: 5,
        title: "Snake Game",
        description: "Classic Snake game implementation with modern features including score tracking, difficulty levels, and smooth animations. Built with vanilla JavaScript for optimal performance.",
        icon: "🐍",
        tags: ["JavaScript", "Canvas API", "Game Dev"],
        github: "https://github.com/Vidushi-8465/30_days_challenge/tree/Main/Snake%20Game"
    },
    {
        id: 6,
        title: "Document Summarization",
        description: "An AI-powered document summarization web application that extracts key information from lengthy documents. Features include multi-format support and customizable summary lengths.",
        icon: "📝",
        tags: ["Node.js", "AI", "NLP"],
        github: "https://github.com/Vidushi-8465/Ai_Agents"
    },
    {
        id: 7,
        title: "Altereats",
        description: "Developed Altereats, a web-based healthy meal planner with a responsive frontend and Flask backend that recommends personalized recipes based on user preferences, dietary needs, and dynamic data insights.",
        icon: "🍽️",
        tags: ["Flask", "Python", "UI/UX"],
        github: "https://github.com/Vidushi-8465/ALTEREATS-MP-"
    },
    {
        id: 8,
        title: "AI Agents Collection",
        description: "A comprehensive collection of AI agents and chatbots built using various frameworks and APIs. Includes conversational agents, task automation bots, and intelligent assistants.",
        icon: "🤖",
        tags: ["LangChain", "AI", "Python", "APIs"],
        github: "https://github.com/Vidushi-8465/Ai_Agents"
    }
];

// ============================================
// Render Projects Function
// ============================================
function renderProjects() {
    console.log('renderProjects called');
    const container = document.getElementById('projects-container');
    
    if (!container) {
        console.error('Projects container not found!');
        return;
    }

    console.log('Container found, rendering', projects.length, 'projects');

    // Clear existing content
    container.innerHTML = '';

    // Create and append each project card
    projects.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        container.appendChild(card);
    });

    console.log('Projects rendered successfully');
}

// ============================================
// Create Project Card
// ============================================
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    card.innerHTML = `
        <div class="project-image">${project.icon}</div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${tagsHTML}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        </div>
    `;

    return card;
}

// ============================================
// Initialize - Multiple approaches for reliability
// ============================================

// Approach 1: Immediate execution
console.log('Projects.js loaded');
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    // DOM already loaded
    renderProjects();
}

// Approach 2: Delayed execution as backup
setTimeout(function() {
    if (document.getElementById('projects-container') && 
        document.getElementById('projects-container').children.length === 0) {
        console.log('Backup render triggered');
        renderProjects();
    }
}, 500);

// Approach 3: Window load as final fallback
window.addEventListener('load', function() {
    if (document.getElementById('projects-container') && 
        document.getElementById('projects-container').children.length === 0) {
        console.log('Window load render triggered');
        renderProjects();
    }
});