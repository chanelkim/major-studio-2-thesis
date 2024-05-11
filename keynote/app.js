document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const background = document.getElementById("background");
    background.style.opacity = 0; // Trigger the fade out
    document.body.classList.add("loaded");
  }, 1000);

  const carouselContainer = document.querySelector(".carousel-items");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  fetch("IoAD_merged_geo_data.json")
    .then((response) => response.json())
    .then((data) => {
      const startIndex = data.findIndex((item) => item.objectid === 18587);
      // 18287 // plate
      // 76584 // symbol
      data.forEach((item, index) => {
        carouselContainer.appendChild(
          createCarouselItem(item.imagematch, index === startIndex)
        );
      });
      if (startIndex !== -1) {
        // Make sure startIndex is valid
        initCarousel(startIndex);
      } else {
        console.error("No item with the specified objectid found.");
        initCarousel(0); // Fallback to start at index 0
      }
    })
    .catch((error) => {
      console.error("Error loading the JSON data:", error);
    });

  function createCarouselItem(url, isActive) {
    const img = document.createElement("img");
    img.src = url.replace("/!200,200/", "/!800,800/"); // Change resolution
    img.className = "carousel-item" + (isActive ? " active" : "");
    return img;
  }

  function initCarousel(startIndex) {
    const items = document.querySelectorAll(".carousel-item");
    // let currentItem = 0;
    let currentItem = startIndex;
    let autoPlayInterval;
    const maxTransitions = 2000;
    let transitionCount = 0;

    function showItem(index) {
      items[currentItem].classList.remove("active");
      items[index].classList.add("active");
      currentItem = index;
      transitionCount++;
      if (transitionCount >= maxTransitions) {
        stopRapidFlipping();
      }
    }

    function moveToNextItem() {
      const nextItem = (currentItem + 1) % items.length;
      showItem(nextItem);
    }

    function moveToPreviousItem() {
      // Calculate the previous item index considering circular navigation
      const prevItem = (currentItem - 1 + items.length) % items.length;
      showItem(prevItem);
    }

    // --------------------------------------------------------
    // ANIMATING IMAGE FLIP
    // --------------------------------------------------------
    let flipSpeed = 200;
    let speedIncrement = 50;
    let minSpeed = 10;
    let maxSpeed = 200;
    // let flipSpeed = 1000; // Start with a slower flip speed
    // let speedIncrement = 100; // Amount to increase or decrease the speed
    // let minSpeed = 50; // Minimum speed for rapid flipping
    // let maxSpeed = 1000; // Maximum speed when easing out

    function startRapidFlipping() {
      nextButton.style.display = "none";
      prevButton.style.display = "none";
      flipSpeed = maxSpeed; // Reset to starting speed
      autoPlayInterval = setInterval(() => {
        moveToNextItem();
        if (flipSpeed > minSpeed) {
          flipSpeed -= speedIncrement; // Decrease speed to increase flipping rate
          updateInterval();
        }
      }, flipSpeed);
    }

    // // Functionality for start/stop (no mouse-over)
    // function updateInterval() {
    //   clearInterval(autoPlayInterval);
    //   autoPlayInterval = setInterval(moveToNextItem, flipSpeed);
    // }

    // Added functionality to allow mouse-over for "stop" button to slow down flip
    function updateInterval() {
      clearInterval(autoPlayInterval); // Clear the existing interval
      autoPlayInterval = setInterval(moveToNextItem, flipSpeed); // Set new interval with updated speed
    }

    document
      .getElementById("stopFlip")
      .addEventListener("mouseenter", function () {
        clearInterval(autoPlayInterval); // Clear existing interval
        flipSpeed = maxSpeed; // Set to slower speed when hovering
        updateInterval();
      });

    // document
    //   .getElementById("stopFlip")
    //   .addEventListener("mouseleave", function () {
    //     if (autoPlayInterval) {
    //       // Check if flipping is still active
    //       clearInterval(autoPlayInterval); // Clear the interval
    //       flipSpeed = minSpeed; // Restore to rapid flip speed
    //       updateInterval();
    //     }
    //   });

    function stopRapidFlipping() {
      const slowDownInterval = setInterval(() => {
        if (flipSpeed < maxSpeed) {
          flipSpeed += speedIncrement; // Increase speed to decrease flipping rate
          updateInterval();
        } else {
          clearInterval(slowDownInterval);
          clearInterval(autoPlayInterval);
          nextButton.style.display = "block";
          prevButton.style.display = "block";
          console.log("Rapid flipping stopped.");
        }
      }, 250);
    }

    // // FLIPPING FAST (ORIGINAL)
    // function startRapidFlipping() {
    //   nextButton.style.display = "none";
    //   prevButton.style.display = "none";
    //   autoPlayInterval = setInterval(moveToNextItem, 50); // Short interval for rapid flipping
    // }

    // function stopRapidFlipping() {
    //   clearInterval(autoPlayInterval);
    //   nextButton.style.display = "block"; // Show next and prev buttons after stopping
    //   prevButton.style.display = "block";
    //   console.log("Rapid flipping stopped.");
    // }

    // --------------------------------------------------------
    // CONTROLS FOR FLIPPING
    // --------------------------------------------------------

    function setupManualControls() {
      nextButton.addEventListener("click", () => {
        // Ensure that clicking 'Next' stops any ongoing automatic flipping
        stopRapidFlipping();
        moveToNextItem();
      });

      prevButton.addEventListener("click", () => {
        // Ensure that clicking 'Prev' stops any ongoing automatic flipping
        stopRapidFlipping();
        moveToPreviousItem();
      });
    }

    setupManualControls();

    document
      .getElementById("startFlip")
      .addEventListener("click", startRapidFlipping);
    console.log("Rapid flipping started.");
    document
      .getElementById("stopFlip")
      .addEventListener("click", stopRapidFlipping);

    showItem(currentItem); // Display the initial item based on startIndex
  }
});
