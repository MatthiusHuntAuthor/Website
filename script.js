let pages = [];
let currentPage = 0;
const wordsPerPage = 300;

function loadStory() {
    fetch('story.txt')
        .then(response => response.text())
        .then(data => {
            pages = splitIntoPages(data, wordsPerPage);
            if (pages.length > 0) {
                currentPage = 0;
                displayPage();
                document.querySelector('.scroll-container').style.display = 'block';
                document.querySelector('.book-cover').style.display = 'none';
            }
        })
        .catch(error => console.error('Error loading story:', error));
}

function splitIntoPages(text, wordsPerPage) {
    let words = text.split(/\s+/);
    let pages = [];
    for (let i = 0; i < words.length; i += wordsPerPage) {
        pages.push(words.slice(i, i + wordsPerPage).join(' '));
    }
    return pages;
}

function displayPage() {
    if (pages.length > 0) {
        let storyContent = document.getElementById('storyContent');
        if (storyContent) {
            storyContent.textContent = pages[currentPage];
        }
        document.getElementById('prevButton').disabled = currentPage === 0;
        document.getElementById('nextButton').disabled = currentPage === pages.length - 1;
    }
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        displayPage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPage();
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function adjustFontSize(size) {
    let storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.style.fontSize = size + 'px';
    }
    localStorage.setItem('fontSize', size);
}

window.onload = function () {
    let storyContent = document.getElementById('storyContent');
    if (storyContent) {
        const savedFontSize = localStorage.getItem('fontSize') || 18;
        storyContent.style.fontSize = savedFontSize + 'px';
        document.getElementById('fontSizeSlider').value = savedFontSize;
    }
};
