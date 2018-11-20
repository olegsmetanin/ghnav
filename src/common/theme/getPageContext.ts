/* eslint-disable no-underscore-dangle */

import { createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'

import { SheetsRegistry } from 'jss'
import blue from '@material-ui/core/colors/blue'
import indigo from '@material-ui/core/colors/indigo'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue
  },
  typography: {
    useNextVariants: true
  }
})

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  }
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  const browser = 'browser'
  if (!process[browser]) {
    return createPageContext()
  }
  const key = '__INIT_MATERIAL_UI__'
  // Reuse context on the client-side.
  if (!global[key]) {
    global[key] = createPageContext()
  }

  return global[key]
}
