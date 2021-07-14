const commentFormHandler = async (event) => {
    event.preventDefault();
    const text = await document.querySelector('#comment-text').value.trim();
    const post_id = text.dataset.post;
    if (text && post_id) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('Failed to submit post');
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);