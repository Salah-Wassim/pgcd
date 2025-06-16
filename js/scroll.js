window.addEventListener('scroll', () => {
  const sidebar = document.getElementById('sidebar');
  const footer = document.getElementById('footer');

  const sidebarHeight = sidebar.offsetHeight;
  const footerTop = footer.getBoundingClientRect().top + window.scrollY;
  const scrollTop = window.scrollY;
  const limit = footerTop - sidebarHeight;

  if (scrollTop >= limit) {
    sidebar.classList.add('stopped');
    sidebar.style.top = `${limit}px`;
  } 
  else {
    sidebar.classList.remove('stopped');
    sidebar.style.top = `98px`;
  }
});
