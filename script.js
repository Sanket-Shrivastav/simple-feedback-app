const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

// Fetch existing feedback
async function loadFeedback() {
  const res = await fetch("/feedback");
  const data = await res.json();
  feedbackList.innerHTML = data.map(f => `
    <li><strong>${f.name}</strong>: ${f.message}</li>
  `).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const res = await fetch("/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message })
  });

  const data = await res.json();
  if (data.success) {
    alert("Feedback submitted!");
    form.reset();
    loadFeedback();
  } else {
    alert("Error: " + data.error);
  }
});

// Load feedback on page load
loadFeedback();
