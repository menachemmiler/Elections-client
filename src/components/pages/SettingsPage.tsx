import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTheme, setLanguage, resetSettings } from '../../redux/slices/setingsSlice';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { theme, language } = useSelector((state: RootState) => state.settings);

  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(theme);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value as 'light' | 'dark';
    setSelectedTheme(newTheme);
    dispatch(setTheme(newTheme));
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  const handleReset = () => {
    dispatch(resetSettings());
    setSelectedTheme('light');
    setSelectedLanguage('en');
  };

  return (
    <div className="settings-page">
      <h1>Settings Page</h1>

      <div className="setting-item">
        <label htmlFor="theme-select">Theme:</label>
        <select
          id="theme-select"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="setting-item">
        <label htmlFor="language-select">Language:</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="reset-section">
        <button className="reset-btn" onClick={handleReset}>
          Reset to Default Settings
        </button>
      </div>

      <div className="current-settings">
        <h2>Current Settings:</h2>
        <p>Theme: {theme}</p>
        <p>Language: {language}</p>
      </div>
    </div>
  );
};

export default SettingsPage;
