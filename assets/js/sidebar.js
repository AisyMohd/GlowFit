document.addEventListener('DOMContentLoaded', () => { 
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

// Element SDK integration
async function onConfigChange(config) {
    const sidebarTitle = document.getElementById('sidebarTitle');
    const menuItem1 = document.getElementById('menuItem1');
    const menuItem2 = document.getElementById('menuItem2');
    const menuItem3 = document.getElementById('menuItem3');

    sidebarTitle.textContent = config.sidebar_title || defaultConfig.sidebar_title;
    menuItem1.textContent = config.menu_item_1 || defaultConfig.menu_item_1;
    menuItem2.textContent = config.menu_item_2 || defaultConfig.menu_item_2;
    menuItem3.textContent = config.menu_item_3 || defaultConfig.menu_item_3;

    // Apply colors
    const bgColor = config.background_color || defaultConfig.background_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;
    const mainBgColor = config.main_bg_color || defaultConfig.main_bg_color;

    sidebar.style.background = bgColor;
    toggleBtn.style.background = bgColor;
    document.querySelectorAll('.sidebar-title, .menu-link, .close-btn svg').forEach(el => {
      if (el.tagName === 'svg') {
        el.style.stroke = textColor;
      } else {
        el.style.color = textColor;
      }
    });

    // Apply font size
    const baseSize = config.font_size || defaultConfig.font_size;
    sidebarTitle.style.fontSize = `${baseSize * 1.78}px`;
    document.querySelectorAll('.menu-link').forEach(el => {
      el.style.fontSize = `${baseSize}px`;
    });
    document.querySelector('.content-title').style.fontSize = `${baseSize * 2.67}px`;
    document.querySelectorAll('.content-text').forEach(el => {
      el.style.fontSize = `${baseSize}px`;
    });
}

function mapToCapabilities(config) {
    return {
        recolorables: [
        {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
            }
        },
        {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
            }
        },
        {
            get: () => config.accent_color || defaultConfig.accent_color,
            set: (value) => {
            config.accent_color = value;
            window.elementSdk.setConfig({ accent_color: value });
            }
        },
        {
            get: () => config.main_bg_color || defaultConfig.main_bg_color,
            set: (value) => {
            config.main_bg_color = value;
            window.elementSdk.setConfig({ main_bg_color: value });
            }
        }
        ],
        borderables: [],
        fontEditable: {
        get: () => config.font_family || 'Playfair Display',
        set: (value) => {
            config.font_family = value;
            window.elementSdk.setConfig({ font_family: value });
            document.body.style.fontFamily = `${value}, serif`;
        }
        },
        fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
            config.font_size = value;
            window.elementSdk.setConfig({ font_size: value });
        }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["sidebar_title", config.sidebar_title || defaultConfig.sidebar_title],
        ["menu_item_1", config.menu_item_1 || defaultConfig.menu_item_1],
        ["menu_item_2", config.menu_item_2 || defaultConfig.menu_item_2],
        ["menu_item_3", config.menu_item_3 || defaultConfig.menu_item_3]
    ]);
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


if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues
    });
  }
  //end sidebar code

   fetch('../components/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document
      .getElementById('app-wrapper')
      .insertAdjacentHTML('afterbegin', html); 

    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.menu-link')
          .forEach(l => l.classList.remove('active'));

        link.classList.add('active');
      });
    });

    initSidebar(); // ✅ NOW elements exist
    //new code which add sidebar
  });

  });