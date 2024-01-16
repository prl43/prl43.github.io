const projects = []; // Will be populated dynamically

// Base URL for project JSON files (relative path)
// Adjust based on your directory structure in GitHub Pages
const projectsDirectoryUrl = './projects/'; 

// Function to fetch project files
async function fetchProjectFiles() {
    try {
        // List of project file names
        const projectFileNames = ['project1.json', 'project2.json', 'project3.json']; // Replace with actual file names

        for (const fileName of projectFileNames) {
            await fetchProjectData(`${projectsDirectoryUrl}${fileName}`);
        }
        populateProjects(projects);
    } catch (error) {
        console.error('Error fetching project files:', error);
    }
}

// Fetch individual project data
async function fetchProjectData(projectUrl) {
    try {
        const response = await fetch(projectUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const projectData = await response.json();
        projects.push(projectData);
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
}

// Function to populate projects list
function populateProjects(projectsList) {
    const projectsListContainer = document.getElementById('projects-list');
    projectsListContainer.innerHTML = ''; // Clear existing list

    projectsList.forEach(project => {
        const projectEntry = document.createElement('div');
        projectEntry.classList.add('project-entry');
        projectEntry.innerHTML = `
            <img class="project-image" src="${project.image}" alt="${project.name}">
            <div class="project-details">
                <div class="project-title">${project.name}</div>
                <div class="project-description">${project.description.substring(0, 50)}...</div>
            </div>
        `;
        projectEntry.addEventListener('click', () => selectProject(project.id));
        projectsListContainer.appendChild(projectEntry);
    });
}

// Function to handle project selection
function selectProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    const projectDescription = document.getElementById('project-description');
    const projectCodeExamples = document.getElementById('project-code-examples');
    projectDescription.textContent = project.description;

    // Link to the GitHub file within the same directory
    projectCodeExamples.innerHTML = `<a href="${projectsDirectoryUrl}${project.codeExample}" target="_blank">View Code Example</a>`;
}

// Function to score and filter projects based on search term
function scoreAndFilterProjects(searchTerm) {
    const words = searchTerm.toLowerCase().split(/\s+/); // Split search term into words
    const scoredProjects = projects.map(project => {
        let score = 0;

        // Check each word in the search query
        words.forEach(word => {
            if (project.name.toLowerCase().includes(word)) {
                score += 5;
            }
            if (project.description.toLowerCase().includes(word)) {
                score += 2;
            }
            if (project.tags && project.tags.some(tag => tag.toLowerCase().includes(word))) {
                score += 10;
            }
        });

        return { project, score };
    });

    // Sort projects by score in descending order
    return scoredProjects.filter(p => p.score > 0).sort((a, b) => b.score - a.score).map(p => p.project);
}

// Event listener for the search button and initial project loading
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const filteredAndScoredProjects = scoreAndFilterProjects(searchTerm);
        populateProjects(filteredAndScoredProjects);
    });

    // Fetch and populate projects
    fetchProjectFiles();
});

