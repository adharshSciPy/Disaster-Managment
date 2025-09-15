import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faLink } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import "../css/Share.css";

const ShareButton = ({ weatherData, floodAlerts = [] }) => {
  const [showOptions, setShowOptions] = useState(false);

  // Generate share text
  const generateShareText = () => {
    const { city, temperature, description, humidity, wind } = weatherData;
    const currentTime = new Date().toLocaleString();

    let shareText = `🌤️ Live Weather Update for ${city}:
📍 Location: ${city}
🌡️ Temperature: ${temperature}°C
🌤️ Conditions: ${description}
💧 Humidity: ${humidity}%
💨 Wind Speed: ${wind} m/s
⏰ Updated: ${currentTime}`;

    if (floodAlerts && floodAlerts.length > 0) {
      shareText += `\n\n🚨 FLOOD ALERTS:`;
      floodAlerts.forEach((alert) => {
        shareText += `\n⚠️ ${alert.location}: Water Level ${alert.currentLevel} (Danger: ${alert.dangerLevel})`;
      });
      shareText += `\n\n📱 Stay Safe! Monitor flood alerts regularly.`;
    } else {
      shareText += `\n\n✅ No flood alerts currently active.`;
    }

    shareText += `\n\n🌊 #FloodPredictor #WeatherAlert #StayAlert`;

    return shareText;
  };

  // Generate share URL
  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const cityParam = encodeURIComponent(weatherData.city);
    return `${baseUrl}?city=${cityParam}`;
  };

  // Social share functions
  const shareToTwitter = () => {
    const text = encodeURIComponent(generateShareText());
    const url = encodeURIComponent(generateShareUrl());
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(generateShareUrl());
    const text = encodeURIComponent(generateShareText());
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(generateShareText());
    const url = encodeURIComponent(generateShareUrl());
    window.open(
      `https://t.me/share/url?url=${url}&text=${text}`,
      '_blank'
    );
  };

  const copyToClipboard = async () => {
    try {
      const fullText = `${generateShareText()}\n\n${generateShareUrl()}`;
      await navigator.clipboard.writeText(fullText);
      alert('Weather update copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Close share options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.querySelector('.share-container');
      if (container && !container.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasAlerts = floodAlerts && floodAlerts.length > 0;

  return (
    <div className="share-container">
      <button
        className={`btn share-main-button ${hasAlerts ? 'alert-active' : ''}`}
        onClick={() => setShowOptions((prev) => !prev)}
        title="Share weather update"
      >
        <FontAwesomeIcon icon={faShare} />
        {hasAlerts ? ' Share Alert' : ' Share Update'}
        {hasAlerts && <span className="alert-badge">{floodAlerts.length}</span>}
      </button>

      <div className={`share-options ${showOptions ? 'visible' : 'hidden'}`}>
        <div className="share-header">
          <small>Share to:</small>
        </div>
        <div className="share-buttons-grid">
          <button className="btn share-btn twitter" onClick={shareToTwitter} title="Share to Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </button>
          <button className="btn share-btn facebook" onClick={shareToFacebook} title="Share to Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button className="btn share-btn whatsapp" onClick={shareToWhatsApp} title="Share to WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} />
          </button>
          <button className="btn share-btn telegram" onClick={shareToTelegram} title="Share to Telegram">
            <FontAwesomeIcon icon={faTelegram} />
          </button>
          <button className="btn share-btn copy" onClick={copyToClipboard} title="Copy to clipboard">
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButton;