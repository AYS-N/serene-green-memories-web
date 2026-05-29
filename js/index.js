document.addEventListener('DOMContentLoaded', async () => {
  const target = document.getElementById('blog-preview');
  if (!target) return;

  try {
    const response = await fetch('api/blog-preview.php', { credentials: 'same-origin' });
    if (response.ok) {
      target.innerHTML = await response.text();
    }
  } catch {
    // Keep the static placeholder when PHP is not available.
  }
});
