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

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav > ul');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav > ul > li > a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
});

// Delete confirmation handling
document.addEventListener('DOMContentLoaded', function() {
  // First check if we have any delete buttons that need confirmation
  const hasDeleteButtons = document.querySelector('form[action*="?_method=DELETE"]');
  
  if (!hasDeleteButtons) return; // Exit if no delete buttons exist

  // Check if modal exists, if not create it
  let modal = document.getElementById('deleteModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'deleteModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p id="modalMessage"></p>
        <div class="modal-buttons">
          <button id="modalCancel" class="modal-btn cancel">Cancel</button>
          <button id="modalConfirm" class="modal-btn confirm">Delete</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalMessage = document.getElementById('modalMessage');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  let currentForm = null;

  // Function to attach delete confirmation handler
  function attachDeleteHandler(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      currentForm = this.closest('form');
      if (currentForm.action.includes('/users/')) {
        modalMessage.textContent = 'Are you sure you want to remove this book from your collection?';
      } else if (currentForm.action.includes('/books/')) {
        modalMessage.textContent = 'Are you sure you want to delete this book from the library? This action cannot be undone.';
      }
      modal.classList.add('active');
    });
  }

  // Attach handlers to all delete buttons
  function attachDeleteHandlers() {
    // Handle delete from my books
    document.querySelectorAll('form[action*="/users/"][action*="?_method=DELETE"] button[type="submit"]').forEach(button => {
      attachDeleteHandler(button);
    });

    // Handle delete from library
    document.querySelectorAll('form[action*="/books/"][action*="?_method=DELETE"] button[type="submit"]').forEach(button => {
      attachDeleteHandler(button);
    });
  }

  // Initial attachment of handlers
  attachDeleteHandlers();

  // Handle add to my books
  document.querySelectorAll('form[action*="/users/"][action*="?_method=PUT"] button[type="submit"]').forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      const form = this.closest('form');
      const formAction = form.getAttribute('action');
      
      try {
        const response = await fetch(formAction, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Get the book ID from the form action URL
          const bookId = formAction.split('/').slice(-1)[0].split('?')[0];
          
          // Create the new delete form HTML
          const deleteForm = document.createElement('form');
          deleteForm.action = `/users/${bookId}?_method=DELETE`;
          deleteForm.method = 'POST';
          
          const deleteButton = document.createElement('button');
          deleteButton.type = 'submit';
          deleteButton.textContent = 'Delete from My Books';
          
          deleteForm.appendChild(deleteButton);
          
          // Replace the add form with the delete form
          form.parentNode.replaceChild(deleteForm, form);
          
          // Attach delete handler to the new button
          attachDeleteHandler(deleteButton);
        } else {
          throw new Error('Failed to add book');
        }
      } catch (error) {
        console.error('Error:', error);
        // Fallback to traditional form submission if AJAX fails
        form.submit();
      }
    });
  });

  // Handle modal cancel
  modalCancel.addEventListener('click', function() {
    modal.classList.remove('active');
    currentForm = null;
  });

  // Handle modal confirm
  modalConfirm.addEventListener('click', async function() {
    if (currentForm) {
      const formAction = currentForm.getAttribute('action');
      const bookCard = currentForm.closest('.card');
      
      try {
        const response = await fetch(formAction, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Remove the card first
          bookCard.remove();

          // If we're in the library page (not My Books page), replace with Add button
          if (formAction.includes('/users/') && !window.location.pathname.startsWith('/users/')) {
            const bookId = formAction.split('/').slice(-1)[0].split('?')[0];
            
            const addForm = document.createElement('form');
            addForm.action = `/users/${bookId}?_method=PUT`;
            addForm.method = 'POST';
            
            const addButton = document.createElement('button');
            addButton.type = 'submit';
            addButton.textContent = 'Add to My Books';
            
            addForm.appendChild(addButton);
            
            // Create a new div for the form
            const formDiv = document.createElement('div');
            formDiv.appendChild(addForm);
            
            // Create a new card with the same content but with the Add button
            const newCard = bookCard.cloneNode(true);
            // Replace the last div (which had the delete form) with our new form div
            newCard.lastElementChild.replaceWith(formDiv);
            
            // Insert the new card where the old one was
            bookCard.parentNode.insertBefore(newCard, bookCard.nextSibling);
          }
          
          // Check if we need to show empty collection message
          const remainingBooks = document.querySelectorAll('.card');
          if (remainingBooks.length === 0) {
            const cardContainer = document.querySelector('.card-container');
            cardContainer.innerHTML = `
              <p>
                Start filling up your collection by adding a book from the
                <a href="/books">library</a>!
              </p>
            `;
          }
          
          modal.classList.remove('active');
          currentForm = null;
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error('Error:', error);
        // Fallback to traditional form submission if AJAX fails
        currentForm.submit();
      }
    }
    modal.classList.remove('active');
    currentForm = null;
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      currentForm = null;
    }
  });
});
