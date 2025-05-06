document.addEventListener('DOMContentLoaded', function() {
    // Load projects dynamically from JSON file
    const loadProjects = async function() {
        const projectGallery = document.querySelector('.project-gallery');

        if (!projectGallery) return;

        try {
            const response = await fetch('data/projects.json');
            const projects = await response.json();

            // Clear existing content
            projectGallery.innerHTML = '';

            // If there are no projects, show a placeholder message
            if (projects.length === 0) {
                projectGallery.innerHTML = '<p>Projects coming soon...</p>';
                return;
            }

            // Add projects to the gallery
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card', 'animate-on-scroll');
                projectCard.dataset.animation = 'fade-in';

                // Create project image
                const projectImage = document.createElement('img');
                projectImage.src = project.image;
                projectImage.alt = project.title;

                // Create project title
                const projectTitle = document.createElement('h3');
                projectTitle.textContent = project.title;

                // Create project description
                const projectDesc = document.createElement('p');
                projectDesc.textContent = project.description;

                // Create technologies list
                const techList = document.createElement('div');
                techList.classList.add('tech-list');

                project.technologies.forEach(tech => {
                    const techTag = document.createElement('span');
                    techTag.classList.add('tech-tag');
                    techTag.textContent = tech;
                    techList.appendChild(techTag);
                });

                // Create project link
                const projectLink = document.createElement('a');
                projectLink.href = project.link;
                projectLink.classList.add('project-link');
                projectLink.textContent = 'View Project';

                // Append all elements to project card
                projectCard.appendChild(projectImage);
                projectCard.appendChild(projectTitle);
                projectCard.appendChild(projectDesc);
                projectCard.appendChild(techList);
                projectCard.appendChild(projectLink);

                // Add project card to gallery
                projectGallery.appendChild(projectCard);
            });
        } catch (error) {
            console.error('Error loading projects:', error);
            projectGallery.innerHTML = '<p>Error loading projects. Please try again later.</p>';
        }
    };

    // Load projects when the page loads
    loadProjects();
});
