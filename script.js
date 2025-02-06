document.addEventListener("DOMContentLoaded", function () {
    const bookContent = document.getElementById("bookContent");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
    const toggleScrollBtn = document.getElementById("toggleScroll");
    const fontSizeSlider = document.getElementById("fontSizeSlider");

    let textContent = "";
    let currentPage = 0;
    const wordsPerPage = 250;
    let isDarkMode = false;
    let autoScroll = false;

    // Function to Fetch and Extract DOCX Content
    function loadDocx() {
        fetch("sample-story.docx") // Ensure story.docx is in the root directory
            .then(response => response.blob()) // Convert response to a Blob
            .then(blob => {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const arrayBuffer = event.target.result;

                    // Use Mammoth.js to extract text from DOCX
                    Mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                        .then(result => {
                            textContent = result.value.replace(/\n/g, " ");
                            displayPage(currentPage);
                        })
                        .catch(error => console.error("Error parsing DOCX:", error));
                };
                reader.readAsArrayBuffer(blob);
            })
            .catch(error => console.error("Error fetching DOCX file:", error));
    }

    // Display Text in Page Format
    function displayPage(pageNumber) {
        if (!textContent) return;
        const words = textContent.split(" ");
        const start = pageNumber * wordsPerPage;
        const end = start + wordsPerPage;
        bookContent.innerHTML = words.slice(start, end).join(" ");
    }

    // Pagination
    prevPageBtn.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    nextPageBtn.addEventListener("click", function () {
        const totalPages = Math.ceil(textContent.split(" ").length / wordsPerPage);
        if (currentPage < totalPages - 1) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    // Toggle Dark Mode
    toggleDarkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        isDarkMode = !isDarkMode;
        toggleDarkModeBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    });

    // Adjust Font Size
    fontSizeSlider.addEventListener("input", function () {
        bookContent.style.fontSize = fontSizeSlider.value + "px";
    });

    // Auto Scroll
    let scrollInterval;
    toggleScrollBtn.addEventListener("click", function () {
        autoScroll = !autoScroll;
        toggleScrollBtn.textContent = autoScroll ? "Stop Scroll" : "Auto Scroll";

        if (autoScroll) {
            scrollInterval = setInterval(() => {
                bookContent.scrollBy(0, 2);
                if (bookContent.scrollTop + bookContent.clientHeight >= bookContent.scrollHeight) {
                    clearInterval(scrollInterval);
                    autoScroll = false;
                    toggleScrollBtn.textContent = "Auto Scroll";
                }
            }, 50);
        } else {
            clearInterval(scrollInterval);
        }
    });

    // Load DOCX instead of TXT
    loadDocx();
});
