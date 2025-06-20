
function scrollToPartners() {
  document.getElementById('partners').scrollIntoView({ behavior: 'smooth' });
}
tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    number: { value: 80 },
    color: { value: "#00ffcc" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: { enable: true, speed: 1 }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" }
    },
    modes: {
      repulse: { distance: 100 }
    }
  }
});

const fullText = "Imagine your problems solved. Not by one IITian — but by the entire IIT ecosystem. All at a cost less than a week's salary of a single IITian.";
const typingElement = document.getElementById("typingText");
let index = 0;

function typeNextChar() {
  if (index < fullText.length) {
    typingElement.innerHTML = fullText.slice(0, index + 1);
    index++;
    setTimeout(typeNextChar, 40); // typing speed
  }
}
typeNextChar();

