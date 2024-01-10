body, html {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

header {
    background: #4a69bd;
    color: #fff;
    padding: 0.5em 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

nav ul {
    list-style: none;
    text-align: center;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 10px;
}

nav ul li a {
    text-decoration: none;
    color: #fff;
    transition: color 0.3s;
}

nav ul li a:hover {
    color: #f8c291;
}

#content {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
}

#projects-container {
    display: flex;
    justify-content: space-between;
}

#projects-list, #selected-project {
    width: 45%;
    max-height: 600px;
    overflow-y: auto;
}

#search-bar {
    margin-bottom: 20px;
    text-align: center;
}

#search-input {
    padding: 10px;
    width: calc(100% - 20px);
    margin-right: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
}

.project-entry {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: calc(100% - 20px);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.project-entry:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.project-image {
    width: 80px;
    height: 80px;
    float: left;
    margin-right: 15px;
    border-radius: 50%;
}

.project-details {
    overflow: hidden;
}

.project-title {
    font-size: 1.4em;
    color: #333;
    margin-bottom: 5px;
}

.project-description {
    font-size: 1em;
    color: #666;
}

#selected-project {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#project-description, #project-code-examples {
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    #projects-container {
        flex-direction: column;
    }

    #projects-list, #selected-project {
        width: 100%;
    }
}

