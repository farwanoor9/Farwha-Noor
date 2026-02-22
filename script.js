// Initialize EmailJS with your public key
(function() {
  emailjs.init("Xuu_rd75laTOv9_4u"); // Replace with your actual Public Key
})();

// Smooth scroll for menu links
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Auto update footer year
document.getElementById('year').textContent = '© ' + new Date().getFullYear() + ' PAF-IAST University';

// Contact form submission with EmailJS
function submitForm(e) {
  e.preventDefault();

  // Get form values
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Prepare template parameters (match your EmailJS template variables)
  const templateParams = {
    from_name: firstName + ' ' + lastName,
    from_email: email,
    subject: subject,
    message: message,
    to_name: 'PAF-IAST Admin' // or any name
  };

  // Show sending state (optional)
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Send email using EmailJS
  emailjs.send('service_odf94tf', 'template_hwhb7ni', templateParams)
    .then(function(response) {
      alert('Message sent successfully! We\'ll get back to you soon.');
      document.getElementById('contactForm').reset();
    }, function(error) {
      alert('Failed to send message. Please try again later.');
      console.error('EmailJS error:', error);
    })
    .finally(function() {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Intersection Observer for reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { root: null, threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.menu a[href="#${id}"]`);
    if (link) link.classList.toggle('active', entry.isIntersecting);
  });
}, { threshold: 0.5 });
sections.forEach(s => navObserver.observe(s));

// Rotating taglines in hero
const taglines = [
  'Empowering Future Innovators',
  'Leaders in Applied Sciences',
  'Global Standards. Local Impact'
];
let tIndex = 0;
const taglineEl = document.querySelector('.hero-left .muted');
if (taglineEl) {
  setInterval(() => {
    taglineEl.textContent = taglines[tIndex];
    tIndex = (tIndex + 1) % taglines.length;
  }, 4200);
}