const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
  
    if (title && text) {
      const response = await fetch(`/api/posts/`, {
        method: 'PUT',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to submit post');
      }
    }
  };
  
  document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);