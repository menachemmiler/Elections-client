import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  theme: "light" | "dark";
  language: string;
}

const loadSettings = (): SettingsState => {
  const savedSettings = localStorage.getItem("settings");
  return savedSettings
    ? JSON.parse(savedSettings)
    : { theme: "light", language: "en" };
};

const saveSettings = (settings: SettingsState) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const initialState: SettingsState = loadSettings();

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
      saveSettings(state);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      saveSettings(state);
    },
    resetSettings() {
      const defaultState: SettingsState = { theme: "light", language: "en" };
      saveSettings(defaultState);
      return defaultState;
    },
  },
});

export const { setTheme, setLanguage, resetSettings } = settingsSlice.actions;

export default settingsSlice;
