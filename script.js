document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.querySelector('.map-container');
  const locationMarkers = document.querySelectorAll('.location-marker');
  
  mapContainer.addEventListener('mouseenter', () => {
      mapContainer.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.3)';
  });

  mapContainer.addEventListener('mouseleave', () => {
      mapContainer.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
  });

  locationMarkers.forEach(marker => {
      const tooltip = marker.querySelector('.tooltip');
      
      marker.addEventListener('mouseenter', () => {
          
          marker.style.transform = 'translate(-50%, -50%) scale(1.5)';
          marker.style.zIndex = '10';
          
          marker.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
          
          if (tooltip) {
              tooltip.style.opacity = '1';
              tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
          }

          
          playHoverSound();
      });

      marker.addEventListener('mouseleave', () => {
         
          marker.style.transform = 'translate(-50%, -50%) scale(1)';
          marker.style.zIndex = '1';
          marker.style.boxShadow = 'none';
          
          if (tooltip) {
              tooltip.style.opacity = '0';
              tooltip.style.transform = 'translate(-50%, -100%) scale(0.9)';
          }
      });

      marker.addEventListener('click', () => {
          const locationName = marker.getAttribute('data-location');
          showLocationInfo(locationName);
      });
  });

  function showLocationInfo(locationName) {
      const locationDetails = {
          'Tower Mountains': {
              title: 'Tower Mountains',
              description: 'Home to ancient dragons and magical creatures. These towering peaks hide countless treasures and dangers.',
          },
          'Ebon Cave': {
              title: 'Ebon Cave',
              description: 'A dark and treacherous cavern system where the Demon King resides. Few who enter return to tell the tale.',
          },
          'Towling Jungles': {
              title: 'Towling Jungles',
              description: 'A dense, mysterious forest filled with ancient ruins and magical creatures. The trees themselves seem alive.',
          },
          'Castle': {
              title: 'Royal Castle',
              description: 'The magnificent seat of power in the realm. Its mighty walls have withstood countless sieges.',
          },
          'Flock Caves': {
              title: 'Flock Caves',
              description: 'A network of crystalline caves where rare magical artifacts are said to be hidden.',
          }
      };

      const location = locationDetails[locationName];
      if (location) {
          let modal = document.querySelector('.location-modal');
          if (!modal) {
              modal = document.createElement('div');
              modal.className = 'location-modal';
              document.body.appendChild(modal);
          }

          modal.innerHTML = `
              <div class="modal-content">
                  <h3>${location.title}</h3>
                  <p>${location.description}</p>
                  <button class="close-modal">Close</button>
              </div>
          `;

          modal.style.display = 'flex';
          setTimeout(() => {
              modal.style.opacity = '1';
              modal.querySelector('.modal-content').style.transform = 'scale(1)';
          }, 10);

          modal.querySelector('.close-modal').addEventListener('click', () => {
              modal.style.opacity = '0';
              modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
              setTimeout(() => {
                  modal.style.display = 'none';
              }, 300);
          });
      }
  }

  function playHoverSound() {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  function initMapAnimations() {
      locationMarkers.forEach((marker, index) => {
          marker.style.animation = `float 3s infinite ${index * 0.2}s`;
      });

      const mapWrapper = document.querySelector('.map-wrapper');
      if (mapWrapper) {
          mapWrapper.style.animation = 'subtle-pulse 5s infinite';
      }
  }

  initMapAnimations();

  const style = document.createElement('style');
  style.textContent = `
      @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
      }

      @keyframes subtle-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
      }

      .location-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: none;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1000;
      }

      .modal-content {
          background: #2a2a2a;
          padding: 2rem;
          border-radius: 10px;
          max-width: 500px;
          width: 90%;
          color: #fff;
          transform: scale(0.9);
          transition: transform 0.3s ease;
          border: 2px solid #ffd700;
      }

      .modal-content h3 {
          color: #ffd700;
          margin-bottom: 1rem;
      }

      .close-modal {
          background: #ffd700;
          border: none;
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
      }

      .close-modal:hover {
          background: #fff;
          color: #2a2a2a;
          transform: translateY(-2px);
      }
  `;
  document.head.appendChild(style);
});

const musicIcon = document.querySelector('.music-icon');
const backgroundMusic = document.getElementById('background-music');
let isPlaying = true; 

musicIcon.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    isPlaying = !isPlaying;
});


