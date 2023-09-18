import type { GlobalThemeOverrides } from 'naive-ui'

export const theme: GlobalThemeOverrides = {
  common: {
    primaryColor: '#DA9A39',
    primaryColorHover: '#E4A647',
    primaryColorPressed: '#AC7C34',
    borderRadius: '10px',
  },
  Button: {
    fontWeightStrong: 'bold',
    borderRadiusLarge: '10px',
    borderRadiusMedium: '10px',
    borderRadiusSmall: '10px',
    borderRadiusTiny: '10px',
    // Default button
    color: '#FFFFFF',
    textColor: '#363949',
    border: '1px solid #363949',
    colorHover: '#F2F1F4',
    textColorHover: '#363949',
    borderHover: '1px solid #363949',
    colorPressed: '#F2F1F4',
    textColorPressed: '#363949',
    borderPressed: '2px solid #363949',
    colorFocus: '#F2F1F4',
    textColorFocus: '#363949',
    borderFocus: '2px solid #363949',
    rippleColor: '#363949',
    // Primary button
    colorFocusPrimary: '#AC7C34',
    borderFocusPrimary: '1px solid #AC7C34',
    // Quaternary button
    colorQuaternaryHover: '#F9E9D2',
    colorQuaternaryPressed: '#F9E9D2',
  },
  Radio: {
    buttonBorderColor: '#DA9A39',
    buttonBorderColorActive: '#AC7C34',
    buttonBorderColorHover: '#F9E9D2',
    buttonTextColorHover: '#F9E9D2',
    buttonTextColor: '#DA9A39',
    buttonTextColorActive: '#AC7C34',
    buttonColorActive: '#F9E9D2',
  },
  Icon: {
    color: '#D29841',
  },
  Tabs: {
    barColor: '#D29841',
    tabTextColorActiveLine: '#D29841',
    tabTextColorHoverLine: '#D29841',
  },
  Tag: {
    color: '#F9E9D2',
    textColor: '#D29841',
    border: '1px solid #D29841',
    closeIconColor: '#D29841',
    closeIconColorHover: '#E4A647',
    borderRadius: '4px',
  },
  Select: {
    peers: {
      InternalSelection: {
        boxShadowActive: '#FFFFFF',
        boxShadowFocus: '#FFFFFF',
        border: '1px solid #BDB8C7',
        borderHover: '1px solid #363949',
        borderActive: '2px solid #363949',
        borderFocus: '2px solid #363949',
        borderError: '1px solid #DD3C57',
      },
    },
  },
  Checkbox: {
    borderRadius: '2px',
    colorChecked: '#363949',
    border: '1px solid #333745',
    borderFocus: '1px solid #333745',
    boxShadowFocus: '#FFFFFF',
    borderChecked: '1px solid #363949',
  },
  Collapse: {
    titleFontSize: '20px',
    titleFontWeight: 'bold',
    titleTextColor: '#DA9A39',
    arrowColor: '#DA9A39',
  },
  Dropdown: {
    optionColorHover: '#F9E9D2',
    optionTextColorHover: '#D29841',
    optionColorActive: '#D29841',
  },
  Form: {
    feedbackFontSizeLarge: '13px',
    feedbackFontSizeMedium: '13px',
    feedbackFontSizeSmall: '13px',
  },
} as const

export const breakpoints = {
  xs: 0,
  s: 640,
  m: 1024,
  l: 1280,
  xl: 1536,
  xxl: 1920,
} as const
