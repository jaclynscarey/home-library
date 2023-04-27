const button = document.getElementById('form-btn');
const section = document.getElementById('form-section');

if (button) {
  button.addEventListener('click', toggleSection);
}

function toggleSection() {
  if (section.classList.contains('hidden')) {
    section.classList.add('show');
    section.classList.remove('hidden');
    button.innerText = 'Hide Add Book Form';
  } else {
    section.classList.remove('show');
    section.classList.add('hidden');
    button.innerText = 'Show Add Book Form';
  }
}
