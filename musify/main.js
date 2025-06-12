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
    
    userProfile.addEventListener('click', function() {
      userDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function(event) {
      if (!userProfile.contains(event.target)) {
        userDropdown.classList.remove('show');
      }
    });

    const nowPlayingBar = document.getElementById('nowPlayingBar');
    const expandedPlayer = document.getElementById('expandedPlayer');
    const closeExpandedPlayer = document.getElementById('closeExpandedPlayer');
    
    nowPlayingBar.addEventListener('click', function() {
      expandedPlayer.classList.add('show');
      document.body.classList.add('player-expanded');

      document.getElementById('expandedSongImg').src = document.getElementById('currentSongImg').src;
      document.getElementById('expandedSongTitle').textContent = document.getElementById('currentSongTitle').textContent;
      document.getElementById('expandedSongArtist').textContent = document.getElementById('currentSongArtist').textContent;
      document.getElementById('expandedProgress').style.width = document.getElementById('progress').style.width;
      document.getElementById('expandedCurrentTime').textContent = document.getElementById('currentTime').textContent;
      document.getElementById('expandedTotalTime').textContent = document.getElementById('totalTime').textContent;
    });
    
    closeExpandedPlayer.addEventListener('click', function(event) {
      event.stopPropagation();
      expandedPlayer.classList.remove('show');
      document.body.classList.remove('player-expanded');
    });

    expandedPlayer.addEventListener('click', function(event) {
      event.stopPropagation();
    });
    
    const playPauseBtn = document.getElementById('playPauseBtn');
    const expandedPlayPauseBtn = document.getElementById('expandedPlayPauseBtn');
    
    playPauseBtn.addEventListener('click', function() {
      const isPlaying = playPauseBtn.textContent === '⏸';
      playPauseBtn.textContent = isPlaying ? '▶' : '⏸';
      expandedPlayPauseBtn.textContent = isPlaying ? '▶' : '⏸';
    });
    
    expandedPlayPauseBtn.addEventListener('click', function() {
      const isPlaying = expandedPlayPauseBtn.textContent === '⏸';
      expandedPlayPauseBtn.textContent = isPlaying ? '▶' : '⏸';
      playPauseBtn.textContent = isPlaying ? '▶' : '⏸';
    });

    const likeButton = document.getElementById('likeButton');
    const expandedLikeButton = document.getElementById('expandedLikeButton');
    const likedSongs = new Set();
    
    likeButton.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleLike();
    });
    
    expandedLikeButton.addEventListener('click', function() {
      toggleLike();
    });
    
    function toggleLike() {
      const songId = getCurrentSongId();
      
      if (likedSongs.has(songId)) {
        likedSongs.delete(songId);
        likeButton.textContent = '🤍';
        likeButton.classList.remove('active');
        expandedLikeButton.textContent = '🤍';
        expandedLikeButton.classList.remove('active');
      } else {
        likedSongs.add(songId);
        likeButton.textContent = '❤️';
        likeButton.classList.add('active');
        expandedLikeButton.textContent = '❤️';
        expandedLikeButton.classList.add('active');
      }
    }
    
    function getCurrentSongId() {
      const title = document.getElementById('currentSongTitle').textContent;
      const artist = document.getElementById('currentSongArtist').textContent;
      return `${title}-${artist}`;
    }
    
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {

        const img = this.querySelector('img').src;
        const title = this.querySelector('.title').textContent;
        const artist = this.querySelector('.artist').textContent;
        
        document.getElementById('currentSongImg').src = img;
        document.getElementById('currentSongTitle').textContent = title;
        document.getElementById('currentSongArtist').textContent = artist;
        
        document.getElementById('progress').style.width = '0%';
        document.getElementById('currentTime').textContent = '0:00';
        
        if (expandedPlayer && expandedPlayer.classList.contains('show')) {
          document.getElementById('expandedSongImg').src = img;
          document.getElementById('expandedSongTitle').textContent = title;
          document.getElementById('expandedSongArtist').textContent = artist;
          document.getElementById('expandedProgress').style.width = '0%';
          document.getElementById('expandedCurrentTime').textContent = '0:00';
        }
        
        playPauseBtn.textContent = '⏸';
        if (expandedPlayPauseBtn) {
          expandedPlayPauseBtn.textContent = '⏸';
        }

        const songId = `${title}-${artist}`;
        if (likedSongs.has(songId)) {
          likeButton.textContent = '❤️';
          likeButton.classList.add('active');
          expandedLikeButton.textContent = '❤️';
          expandedLikeButton.classList.add('active');
        } else {
          likeButton.textContent = '🤍';
          likeButton.classList.remove('active');
          expandedLikeButton.textContent = '🤍';
          expandedLikeButton.classList.remove('active');
        }
      });
    });
  
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const expandedVolumeSlider = document.getElementById('expandedVolumeSlider');
    const expandedVolumeIcon = document.getElementById('expandedVolumeIcon');
    let currentVolume = 80;
    
    volumeSlider.addEventListener('input', function() {
      updateVolume(this.value);
    });
    
    expandedVolumeSlider.addEventListener('input', function() {
      updateVolume(this.value);
    });
    
    volumeIcon.addEventListener('click', function() {
      toggleMute();
    });
    
    expandedVolumeIcon.addEventListener('click', function() {
      toggleMute();
    });
    
    function updateVolume(value) {

      volumeSlider.value = value;
      expandedVolumeSlider.value = value;
      
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
        expandedVolumeIcon.textContent = '🔇';
      } else if (value < 30) {
        volumeIcon.textContent = '🔈';
        expandedVolumeIcon.textContent = '🔈';
      } else if (value < 70) {
        volumeIcon.textContent = '🔉';
        expandedVolumeIcon.textContent = '🔉';
      } else {
        volumeIcon.textContent = '🔊';
        expandedVolumeIcon.textContent = '🔊';
      }
    }
    
    const createPlaylistBtn = document.getElementById('createPlaylistBtn');
    const playlistsContainer = document.getElementById('playlists-container');
    let playlistCounter = 1;
    
    createPlaylistBtn.addEventListener('click', function() {

      const modal = document.createElement('div');
      modal.className = 'playlist-modal';
      
      modal.innerHTML = `
        <div class="playlist-modal-content">
          <h3>Create a new playlist</h3>
          <div class="playlist-form">
            <div class="playlist-form-group">
              <input type="text" id="playlistName" placeholder="My Playlist" value="My Playlist #${playlistCounter}">
              <label for="playlistName">Playlist name</label>
            </div>
            <div class="playlist-form-actions">
              <button class="btn-cancel" id="cancelPlaylist">Cancel</button>
              <button class="btn-create" id="confirmPlaylist">Create</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      setTimeout(() => {
        const input = document.getElementById('playlistName');
        input.focus();
        input.select();
      }, 100);
      
      document.getElementById('cancelPlaylist').addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      document.getElementById('confirmPlaylist').addEventListener('click', function() {
        const playlistName = document.getElementById('playlistName').value.trim() || `My Playlist #${playlistCounter}`;
        
        const playlistItem = document.createElement('a');
        playlistItem.href = '#';
        playlistItem.className = 'playlist-item';
        playlistItem.innerHTML = `📄 ${playlistName}`;
        
        playlistsContainer.appendChild(playlistItem);
        
        playlistCounter++;
        
        document.body.removeChild(modal);
      });
      
      document.getElementById('playlistName').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          document.getElementById('confirmPlaylist').click();
        }
      });
    });
