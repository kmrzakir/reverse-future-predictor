document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("futureForm");
  const transitionContainer = document.getElementById("transition-container");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate all fields
    const name = document.getElementById("name").value.trim();
    const mostFavSubject = document
      .getElementById("mostFavSubject")
      .value.trim();
    const leastFavSubject = document
      .getElementById("leastFavSubject")
      .value.trim();
    const course = document.getElementById("course").value.trim();
    const hobbies = document.getElementById("hobbies").value.trim();

    let isValid = true;

    // Reset error messages
    document.getElementById("nameError").style.display = "none";
    document.getElementById("subjectError").style.display = "none";
    document.getElementById("courseError").style.display = "none";
    document.getElementById("hobbiesError").style.display = "none";

    // Validate Name
    if (name === "") {
      document.getElementById("nameError").style.display = "block";
      isValid = false;
    }

    // Validate Subjects
    if (mostFavSubject === "" || leastFavSubject === "") {
      document.getElementById("subjectError").style.display = "block";
      isValid = false;
    }

    // Validate Course
    if (course === "") {
      document.getElementById("courseError").style.display = "block";
      isValid = false;
    }

    // Validate Hobbies
    if (hobbies === "") {
      document.getElementById("hobbiesError").style.display = "block";
      isValid = false;
    }

    // If form is valid, proceed with the transition
    if (isValid) {
      const formData = {
        name,
        mostFavSubject,
        leastFavSubject,
        course,
        hobbies,
      };

      // console.log(`name ${name} favSub ${mostFavSubject}`);

      // Store the data in localStorage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Redirect to homePage.html
      window.location.href = "resultPage.html";
    }
  });
});
