import React, { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoplay: false,
    quality: 'HD',
    language: 'English',
    subtitles: true,
    parentalControl: false
  });

  const handleChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const styles = {
    container: {
      marginLeft: '270px',
      marginTop: '80px',
      padding: '20px',
      color: '#fff',
      width: '600px' // Enlarged width
    },
    section: {
      backgroundColor: '#1a1a2e',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    option: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: '1px solid #333'
    },
    select: {
      backgroundColor: '#2a2a3e',
      color: '#fff',
      padding: '8px',
      borderRadius: '4px',
      border: 'none'
    },
    toggle: {
      width: '50px',
      height: '24px',
      backgroundColor: '#666',
      borderRadius: '12px',
      position: 'relative',
      cursor: 'pointer'
    },
    slider: {
      width: '20px',
      height: '20px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      position: 'absolute',
      top: '2px',
      transition: 'left 0.2s',
      left: (value) => value ? '28px' : '2px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: 'gold', marginBottom: '30px' }}>Settings</h1>
      
      <div style={styles.section}>
        <h2>Display</h2>
        <div style={styles.option}>
          <span>Dark Mode</span>
          <div 
            style={styles.toggle} 
            onClick={() => handleChange('darkMode')}
          >
            <div style={{ ...styles.slider, left: settings.darkMode ? '28px' : '2px' }} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Preferences</h2>
        <div style={styles.option}>
          <span>Enable Notifications</span>
          <div 
            style={styles.toggle} 
            onClick={() => handleChange('notifications')}
          >
            <div style={{ ...styles.slider, left: settings.notifications ? '28px' : '2px' }} />
          </div>
        </div>
        <div style={styles.option}>
          <span>Autoplay Next Episode</span>
          <div 
            style={styles.toggle} 
            onClick={() => handleChange('autoplay')}
          >
            <div style={{ ...styles.slider, left: settings.autoplay ? '28px' : '2px' }} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Playback</h2>
        <div style={styles.option}>
          <span>Quality</span>
          <select 
            style={styles.select}
            value={settings.quality}
            onChange={(e) => handleSelectChange('quality', e.target.value)}
          >
            <option value="Auto">Auto</option>
            <option value="HD">HD</option>
            <option value="SD">SD</option>
          </select>
        </div>
        <div style={styles.option}>
          <span>Language</span>
          <select 
            style={styles.select}
            value={settings.language}
            onChange={(e) => handleSelectChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Accessibility</h2>
        <div style={styles.option}>
          <span>Enable Subtitles</span>
          <div 
            style={styles.toggle} 
            onClick={() => handleChange('subtitles')}
          >
            <div style={{ ...styles.slider, left: settings.subtitles ? '28px' : '2px' }} />
          </div>
        </div>
        <div style={styles.option}>
          <span>Parental Control</span>
          <div 
            style={styles.toggle} 
            onClick={() => handleChange('parentalControl')}
          >
            <div style={{ ...styles.slider, left: settings.parentalControl ? '28px' : '2px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
