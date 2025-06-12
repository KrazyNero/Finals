const burgerMenu = document.getElementById('burgerMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    burgerMenu.addEventListener('click', function() {
      burgerMenu.classList.toggle('open');
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('show');
    });
    
    sidebarOverlay.addEventListener('click', function() {
      burgerMenu.classList.remove('open');
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('show');
    });
    
    const userProfile = document.getElementById('userProfile');
    const userDropdown = document.getElementById('userDropdown');
    
    userProfile.addEventListener('click', function(event) {
      event.stopPropagation();
      userDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function(event) {
      if (!userProfile.contains(event.target)) {
        userDropdown.classList.remove('show');
      }
    });

    const tabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function showTab(tabId) {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      const selectedTab = document.querySelector(`.profile-tab[data-tab="${tabId}"]`);
      if (selectedTab) {
        selectedTab.classList.add('active');
      }
      
      const selectedContent = document.getElementById(`${tabId}-tab`);
      if (selectedContent) {
        selectedContent.classList.add('active');
      }
    }
    
    function showLikedTab() {
      showTab('liked');
    }

    window.addEventListener('load', function() {
      if (window.location.hash) {
        const tabId = window.location.hash.substring(1).replace('-tab', '');
        showTab(tabId);
      }
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        showTab(tabId);
      });
    });

    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    let currentVolume = 80;
    
    volumeSlider.addEventListener('input', function() {
      updateVolume(this.value);
    });
    
    volumeIcon.addEventListener('click', function() {
      toggleMute();
    });
    
    function updateVolume(value) {
      volumeSlider.value = value;
      
      if (value > 0) {
        currentVolume = value;
      }
      
      updateVolumeIcons(value);
    }
    
    function toggleMute() {
      if (volumeSlider.value > 0) {
        updateVolume(0);
      } else {
        updateVolume(currentVolume);
      }
    }
    
    function updateVolumeIcons(value) {
      if (value == 0) {
        volumeIcon.textContent = '🔇';
      } else if (value < 30) {
        volumeIcon.textContent = '🔈';
      } else if (value < 70) {
        volumeIcon.textContent = '🔉';
      } else {
        volumeIcon.textContent = '🔊';
      }
    }
