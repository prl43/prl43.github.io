const projects = []; // Will be populated dynamically

// Base URL for GitHub API to access files in your repository
const githubRepoApiUrl = 'https://api.github.com/repos/prl43/prl43.github.io/contents/projects'; // Update 'projects' if different folder

// Fetch project files from GitHub
async function fetchProjectFiles() {
    try {
        const response = await fetch(githubRepoApiUrl);
        const files = await response.json();
        const projectFiles = files.filter(file => file.name.endsWith('.json'));

        for (const file of projectFiles) {
            await fetchProjectData(file.download_url);
        }
        populateProjects(projects); // Populate projects after fetching
    } catch (error) {
        console.error('Error fetching project files:', error);
    }
}

// Fetch individual project data
async function fetchProjectData(projectUrl) {
    try {
        const response = await fetch(projectUrl);
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
    projectCodeExamples.textContent = project.codeExample;
}

// Event listener for the search button and initial project loading
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProjects = projects.filter(project => 
            project.name.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        populateProjects(filteredProjects);
    });

    // Fetch and populate projects from GitHub
    fetchProjectFiles();
});

