document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.msbwb-filters [data-filter]');
  const posts = Array.from(document.querySelectorAll('.wp-block-post-template > li'));

  if (!filterButtons.length || !posts.length) return;

  const DURATION = 320;

  function getVisiblePosts() {
    return posts.filter((post) => !post.classList.contains('is-hidden'));
  }

  function getPositions(elements) {
    const map = new Map();

    elements.forEach((el) => {
      map.set(el, el.getBoundingClientRect());
    });

    return map;
  }

  function animateMove(firstRects, lastRects) {
    posts.forEach((post) => {
      const first = firstRects.get(post);
      const last = lastRects.get(post);

      if (!first || !last) return;

      const dx = first.left - last.left;
      const dy = first.top - last.top;

      if (dx === 0 && dy === 0) return;

      post.style.transition = 'none';
      post.style.transform = `translate(${dx}px, ${dy}px)`;

      requestAnimationFrame(() => {
        post.style.transition = `transform ${DURATION}ms ease, opacity 220ms ease`;
        post.style.transform = '';
      });
    });
  }

  function updateButtons(filter) {
    filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === filter);
    });
  }

  function matchesFilter(post, filter) {
    return filter === 'all' || post.classList.contains(`tag-${filter}`);
  }

  function applyFilter(filter) {
    const currentlyVisible = getVisiblePosts();
    const firstRects = getPositions(currentlyVisible);

    const toHide = [];
    const toShow = [];

    posts.forEach((post) => {
      const shouldShow = matchesFilter(post, filter);
      const isHidden = post.classList.contains('is-hidden');

      if (shouldShow && isHidden) toShow.push(post);
      if (!shouldShow && !isHidden) toHide.push(post);
    });

    toHide.forEach((post) => {
      post.classList.add('is-fading-out');
    });

    setTimeout(() => {
      toHide.forEach((post) => {
        post.classList.add('is-hidden');
        post.classList.remove('is-fading-out');
      });

      toShow.forEach((post) => {
        post.classList.remove('is-hidden');
        post.classList.add('is-fading-in');
      });

      const nowVisible = getVisiblePosts();
      const lastRects = getPositions(nowVisible);

      animateMove(firstRects, lastRects);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          toShow.forEach((post) => {
            post.style.transition = `transform ${DURATION}ms ease, opacity 220ms ease`;
            post.classList.remove('is-fading-in');
          });
        });
      });

      updateButtons(filter);
    }, 180);
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

  const tagFromUrl = new URLSearchParams(window.location.search).get('tag') || 'all';

  posts.forEach((post) => {
    post.classList.remove('is-hidden', 'is-fading-out', 'is-fading-in');
    post.style.transform = '';
    post.style.opacity = '';
    post.style.transition = `transform ${DURATION}ms ease, opacity 220ms ease`;

    if (!matchesFilter(post, tagFromUrl)) {
      post.classList.add('is-hidden');
    }
  });

  updateButtons(tagFromUrl);
});