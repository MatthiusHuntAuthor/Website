let pages = [];
let currentPage = 0;
const wordsPerPage = 300;

function loadStory() {
    fetch('story.txt')
        .then(response => response.text())
        .then(data => {
            pages = splitIntoPages(data, wordsPerPage);
            currentPage = 0;
            displayPage();
            document.querySelector('.scroll-container').style.display = 'block';
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
        document.getElementById('storyContent').textContent = pages[currentPage];
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
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function adjustFontSize(size) {
    document.getElementById('storyContent').style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size);
}

window.onload = function () {
    const savedFontSize = localStorage.getItem('fontSize') || 16;
    document.getElementById('storyContent').style.fontSize = savedFontSize + 'px';
    document.getElementById('fontSizeSlider').value = savedFontSize;
};
