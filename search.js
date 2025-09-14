import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co'; // Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjEzOTMsImV4cCI6MjA3MzA5NzM5M30.QIa24PO_VhBNZ-Bf47Mi3PoRi_6MtGvhBSnzUouutPo'; // Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    searchResults.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }
  searchResults.innerHTML = '<p>Searching...</p>';

  try {
    const { data, error } = await supabase
      .from('parts') // Replace 'parts' with your actual table name
      .select('*')
      .ilike('name', `%${query}%`);

    if (error) {
      searchResults.innerHTML = `<p>Error: ${error.message}</p>`;
      return;
    }

    if (data.length === 0) {
      searchResults.innerHTML = '<p>No results found.</p>';
      return;
    }

    const resultsHtml = data.map(item => `
      <div class="search-result-item">
        <h3>${item.name}</h3>
        <p>${item.description || ''}</p>
        <p><strong>Price:</strong> $${item.price || 'N/A'}</p>
      </div>
    `).join('');
    searchResults.innerHTML = resultsHtml;

  } catch (err) {
    searchResults.innerHTML = `<p>Error: ${err.message}</p>`;
  }
});
