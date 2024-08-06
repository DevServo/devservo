document.addEventListener("DOMContentLoaded", () => {
    const logoLetters = document.querySelectorAll(".logo-letter");
    const tagline = document.querySelector(".tagline");
    const sections = document.querySelectorAll(".section");
    const ctaButton = document.querySelector(".btn-hero");
    const scrollElement = document.querySelector('.scroll');
    const reasons = document.querySelectorAll('.reasons');
    const scrollElement2 = document.querySelector('.scroll-2');
    const services = document.querySelectorAll('.service')
    const scrollElement3 = document.querySelector('.scroll-3');
    const about = document.querySelector('.about-me');
    const scrollElement4 = document.querySelector('.scroll-4');
    const gfx = document.querySelectorAll('.design-item');
    const scrollElement5 = document.querySelector('.scroll-5');
    const form = document.querySelector('.contact-form')
    const mask = document.querySelector('.mask');
    const closeBTN = document.querySelector('.close-btn');
    
  
    let currentIndex = 0;
    let isZooming = false;
  
    // Create timelines for each section's specific animation
    const timelines = [];
    
    let trigger = false;

    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
    
      
        form.style.transform = 'translateY(10%)';
      
       
    
    });

    closeBTN.addEventListener('click', (e) => {
      e.preventDefault()
      form.style.transform = 'translateY(-150%)'
    })
  
    // Timeline for section 1
    const section1Timeline = gsap.timeline({ paused: true });
    section1Timeline
      .fromTo(logoLetters, { y: -1000, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "bounce.out" })
      .fromTo(tagline, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "customWiggle" })
      .add(() => {
        gsap.to(scrollElement, {
          opacity: 1,
          duration: 0.5,
          delay: 0.25,
          onComplete: () => {
            gsap.fromTo(scrollElement, 
              { "--border-height": "0px" }, 
              { "--border-height": `${scrollElement.scrollHeight}px`, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" }
            );
          }
        });
      });
    timelines.push(section1Timeline);
  
    // Timeline for section 2 (reasons)
    const section2Timeline = gsap.timeline({ paused: true });
    section2Timeline
      .fromTo(reasons, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, stagger: 0.3, duration: .5 })
      .add(() => {
        gsap.to(scrollElement2, {
          opacity: 1,
          duration: 0.5,
          delay: 0.25,
          onComplete: () => {
            gsap.fromTo(scrollElement2, 
              { "--border-height": "0px" }, 
              { "--border-height": `${scrollElement2.scrollHeight}px`, duration: 1, opacity:1, repeat: -1, yoyo: true, ease: "power1.inOut" }
            );
          }
        });
      });
    timelines.push(section2Timeline);


    // Animations for services section

    const section3Timeline = gsap.timeline({paused:true});

    
    section3Timeline.to(services, {
      opacity:1,
      y:0,
      stagger:0.3,
      delay:0.25,
      
    })
    .add(() => {
      gsap.to(scrollElement3, {
        opacity: 1,
        duration: 0.5,
        delay: 0.25,
        onComplete: () => {
          gsap.fromTo(scrollElement3, 
            { "--border-height": "0px" }, 
            { "--border-height": `${scrollElement3.scrollHeight}px`, duration: 1, opacity:1, repeat: -1, yoyo: true, ease: "power1.inOut" }
          );
        }
      });
    });

    timelines.push(section3Timeline);


    const section4Timeline = gsap.timeline({paused:true});

    section4Timeline.to(about, {
      opacity:1,
      y:0,
      scale:1,
      
      
    })
    .add(() => {
      gsap.to(scrollElement4, {
        opacity: 1,
        duration: 0.5,
        delay:.2,
        
        onComplete: () => {
          gsap.fromTo(scrollElement4, 
            { "--border-height": "0px" }, 
            { "--border-height": `${scrollElement4.scrollHeight}px`, duration: 1, opacity:1, repeat: -1, yoyo: true, ease: "power1.inOut" }
          );
        }
      });
    });

  

    timelines.push(section4Timeline);


    const section5Timeline = gsap.timeline({ paused: true });
    section5Timeline
      .fromTo(gfx, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, stagger: 0.3, duration: .5 })
      .add(() => {
        gsap.to(scrollElement5, {
          opacity: 1,
          duration: 0.5,
          delay: 0.25,
          onComplete: () => {
            gsap.fromTo(scrollElement5, 
              { "--border-height": "0px" }, 
              { "--border-height": `${scrollElement5.scrollHeight}px`, duration: 1, opacity:1, repeat: -1, yoyo: true, ease: "power1.inOut" }
            );
          }
        });
      })
     
    timelines.push(section5Timeline);




    


  
    // Function to update the CTA button color
    function updateCtaColor() {
      const activeSection = document.querySelector('.section.active');
      if (activeSection) {
        const color = activeSection.getAttribute('data-color');
        ctaButton.style.backgroundColor = color;
      }
    }
  
    // Function to zoom to a specific section and play its animation
    function zoomToSection(index) {
      if (index >= 0 && index < sections.length && !isZooming) {
        isZooming = true;
  
        gsap.to(sections[currentIndex], {
          scale: 1.5,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
  
        gsap.fromTo(
          sections[index],
          { scale: 1.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              sections[currentIndex].classList.remove("active");
              sections[index].classList.add("active");
              currentIndex = index;
              isZooming = false;
              updateCtaColor(); // Update button color when section changes
  
              // Play the corresponding timeline for the active section
              if (timelines[index] && !timelines[index].isActive() && timelines[index].progress() === 0) {
                timelines[index].play();
              }
            },
          }
        );
      }
    }
  
    // Initialize the first section and play its animation
    sections[currentIndex].classList.add("active");
    if (timelines[currentIndex]) timelines[currentIndex].play();
    updateCtaColor(); // Initial color update on page load
  
    // Mouse wheel event for desktops
    window.addEventListener("wheel", (e) => {
      if (!isZooming) {
        if (e.deltaY > 0) {
          zoomToSection(currentIndex + 1);
        } else {
          zoomToSection(currentIndex - 1);
        }
      }
    });
  
    // Prevent default scrolling behavior
    window.addEventListener("scroll", (e) => {
      if (isZooming) {
        e.preventDefault();
        window.scrollTo(0, 0);
      }
    });
  
    // Variables for touch gesture detection
    let startY = 0;
    let endY = 0;
  
    // Touch events for mobile devices
    window.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
    });
  
    window.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault(); // Prevent default scrolling behavior
      },
      { passive: false }
    );
  
    window.addEventListener("touchend", (e) => {
      endY = e.changedTouches[0].clientY;
      if (startY > endY + 50) {
        zoomToSection(currentIndex + 1); // Swipe up
      } else if (startY < endY - 50) {
        zoomToSection(currentIndex - 1); // Swipe down
      }
    });
  
    // Keyboard event for arrow keys
    window.addEventListener("keydown", (e) => {
      if (!isZooming) {
        if (e.key === "ArrowDown") {
          zoomToSection(currentIndex + 1);
        } else if (e.key === "ArrowUp") {
          zoomToSection(currentIndex - 1);
        }
      }
    });

    
   
  });
  