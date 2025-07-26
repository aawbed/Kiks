// Animate photo and lines
gsap.set("#memoryPhoto", { opacity: 0, scale: 0.9 });
gsap.set(".messages p", { opacity: 0, y: 30 });

gsap.to("#memoryPhoto", {
  opacity: 1,
  scale: 1,
  duration: 2,
  delay: 0.5,
  ease: "power2.out",
});

gsap.to("#line1", { opacity: 1, y: 0, delay: 2.5, duration: 1 });
gsap.to("#line2", { opacity: 1, y: 0, delay: 4, duration: 1 });
gsap.to("#line3", { opacity: 1, y: 0, delay: 5.5, duration: 1 });

// Redirect after 9 seconds to regular YouTube page
setTimeout(() => {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
}, 9000);
