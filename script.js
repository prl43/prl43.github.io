const projects = []; // Will be populated dynamically

// Base URL for project JSON files (relative path)
const projectsDirectoryUrl = './projects/'; // Adjust based on your directory structure

// Function to fetch project files
async function fetchProjectFiles() {
    try {
        // List of project file names
        const projectFileNames = ['project1.json', 'project2.json']; // Replace with actual file names

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

    // Fetch and populate projects
    fetchProjectFiles();
});

