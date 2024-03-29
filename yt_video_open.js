// Function to handle mutation events
function handleMutations(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const titleElement = document.querySelector(
        "#title > h1 > yt-formatted-string"
      );
      if (titleElement) {
        const title = titleElement.innerText;

        navigator.clipboard
          .writeText(title)
          .then(() => {
            alert("YouTube video title has been copied to clipboard.");
          })
          .catch((error) => {
            console.log("Failed to copy title to clipboard: ", error);
            alert("Failed to copy YouTube video title to clipboard.");
          });

        observer.disconnect(); // Disconnect the observer once the title is found
        break;
      }
    }
  }
}

// Create a MutationObserver to monitor changes to the DOM
const observer = new MutationObserver(handleMutations);

// Start observing the DOM for changes
observer.observe(document.body, { childList: true, subtree: true });
