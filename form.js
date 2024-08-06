const form = document.getElementById('contactForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Generate a timestamp
  const timestamp = new Date().toISOString();

  // Add timestamp to data
  data.timestamp = timestamp;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxBYTXIXe9Hte_tyMIODXegIEkvG5hF9vklbbCt433zC3vXhIkV36fxKqVO4GcLkj_w/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.text();
    console.log('Success! Data sent:', responseData);
  } catch (error) {
    console.error('Error sending data:', error);
    // You can also display a user-friendly message here using alert or DOM manipulation
    alert('There was an error submitting your data. Please try again later.');
  }
});
