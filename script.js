let affirmationData = null;

// Fetch the JSON file with affirmations
async function fetchAffirmations() {
  try {
    const response = await fetch('affirmations.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    affirmationData = await response.json();
    newAffirmation(); // Display the first affirmation once data is loaded
  } catch (error) {
    console.error('Error fetching the affirmations:', error);
  }
}

// Selects a random affirmation from the JSON data
function newAffirmation() {
  if (!affirmationData) return;
  
  // Get all categories from the JSON
  const categories = affirmationData.affirmations;
  // Randomly select a category
  const randomCategoryIndex = Math.floor(Math.random() * categories.length);
  const selectedCategory = categories[randomCategoryIndex];
  
  // Randomly select a message from the chosen category
  const messages = selectedCategory.messages;
  const randomMessageIndex = Math.floor(Math.random() * messages.length);
  const affirmationMessage = messages[randomMessageIndex];
  
  // Update the DOM with the new affirmation and category
  document.getElementById("affirmation").textContent = affirmationMessage;
  document.getElementById("category").textContent = selectedCategory.category;
  
  // Update the background by changing the body's data attribute
  let dataCategoryValue = "motivation"; // default fallback
  const catLower = selectedCategory.category.toLowerCase();
  if (catLower.includes("focus") || catLower.includes("productivity") || catLower.includes("motivation") || catLower.includes("energy")) {
    dataCategoryValue = "motivation";
  } else if (catLower.includes("self-acceptance") || catLower.includes("compassion") || catLower.includes("self-worth")) {
    dataCategoryValue = "confidence";
  } else if (catLower.includes("overwhelm") || catLower.includes("anxiety")) {
    dataCategoryValue = "calm";
  } else if (catLower.includes("positivity")) {
    dataCategoryValue = "positivity";
  }
  document.body.setAttribute('data-category', dataCategoryValue);
}

// Load affirmations on page load
fetchAffirmations();

// Also load a new affirmation when the Enter key is pressed
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    newAffirmation();
  }
});


