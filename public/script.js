document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      window.location.href = '/success.html'; // Redirect on success
    } else {
      document.getElementById('responseMsg').textContent = data.message;
    }
  });
  