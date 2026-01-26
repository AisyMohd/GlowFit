const defaultConfig = {
  sidebar_title: "Navigation",
  menu_item_1: "Dashboard",
  menu_item_2: "Projects",
  menu_item_3: "Team",
  background_color: "#765036",
  text_color: "#d1c5b1",
  accent_color: "#907a65",
  main_bg_color: "#2c1810",
  font_size: 18
};

// LOAD HTML helper
async function loadHTML(url, containerId){
  try {
    const res = await fetch(url);
    const html = await res.text();
    const container = document.getElementById(containerId);
    if(container){
      container.innerHTML = html;
      return container;
    }
    return null;
  } catch(err){
    console.error(`Failed to load ${url}:`, err);
    return null;
  }
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const toggleBtn = document.getElementById('toggleBtn');
  const closeBtn = document.getElementById('closeBtn');

  function openSidebar() {
    sidebar.classList.add('active');
    backdrop.classList.add('active');
    toggleBtn.classList.add('hidden');
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBtn.classList.remove('hidden');
  }

  toggleBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  backdrop.addEventListener('click', closeSidebar);

  sidebar.addEventListener('click', e => e.stopPropagation());
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load sidebar first
  const sidebarLoaded = await loadHTML("../components/sidebar.html", "sidebar-container");
  if(sidebarLoaded) initSidebar(); // attach events after HTML exists
});

// Element SDK
function onConfigChange(config){
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebarTitle = document.getElementById('sidebarTitle');
  const menuItem1 = document.getElementById('menuItem1');
  const menuItem2 = document.getElementById('menuItem2');
  const menuItem3 = document.getElementById('menuItem3');

  if(!sidebar || !toggleBtn) return;

  sidebarTitle.textContent = config.sidebar_title || defaultConfig.sidebar_title;
  menuItem1.textContent = config.menu_item_1 || defaultConfig.menu_item_1;
  menuItem2.textContent = config.menu_item_2 || defaultConfig.menu_item_2;
  menuItem3.textContent = config.menu_item_3 || defaultConfig.menu_item_3;

  const bgColor = config.background_color || defaultConfig.background_color;
  const textColor = config.text_color || defaultConfig.text_color;

  sidebar.style.background = bgColor;
  toggleBtn.style.background = bgColor;
  document.querySelectorAll('.sidebar-title, .menu-link, .close-btn svg').forEach(el=>{
    if(el.tagName==='svg') el.style.stroke = textColor;
    else el.style.color = textColor;
  });
}

if(window.elementSdk){
  window.elementSdk.init({
    defaultConfig,
    onConfigChange
  });
}
