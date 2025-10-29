import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import React from 'react'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.jsx', { eager: true })
    return pages[`../pages/${name}.jsx`]
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      React.createElement(
        React.Fragment,
        null,
        React.createElement(App, props),
        React.createElement(Toaster, { position: 'top-right', richColors: true })
      )
    )
  },
})
