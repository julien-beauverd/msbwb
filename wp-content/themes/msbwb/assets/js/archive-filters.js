document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.msbwb-filters [data-filter]');
  const posts = document.querySelectorAll('.wp-block-post-template > li');

  if (!filterButtons.length || !posts.length) return;

  function applyFilter(filter) {
    posts.forEach((post) => {
      if (filter === 'all') {
        post.style.display = '';
        return;
      }

      if (post.classList.contains(`tag-${filter}`)) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });

    filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === filter);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      applyFilter(filter);

      const url = new URL(window.location.href);

      if (filter === 'all') {
        url.searchParams.delete('tag');
      } else {
        url.searchParams.set('tag', filter);
      }

      window.history.replaceState({}, '', url);
    });
  });

  const tagFromUrl = new URLSearchParams(window.location.search).get('tag');
  applyFilter(tagFromUrl || 'all');
});