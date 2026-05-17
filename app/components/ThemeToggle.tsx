'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon, Laptop } from '@carbon/icons-react';
import { Dropdown } from '@carbon/react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const items = [
    { id: 'light', text: 'Light', icon: Sun },
    { id: 'dark', text: 'Dark', icon: Moon },
    { id: 'system', text: 'System', icon: Laptop },
  ];

  return (
    <div style={{ width: '150px' }}>
      <Dropdown
        id="theme-toggle"
        titleText="Theme"
        label="Select Theme"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectedItem={items.find((item) => item.id === theme)}
        onChange={({ selectedItem }) => selectedItem && setTheme(selectedItem.id as any)}
      />
    </div>
  );
};
