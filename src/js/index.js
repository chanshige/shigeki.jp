try {
    window.Popper = require('popper.js').default
    window.$ = window.jQuery = require('jquery')

    require('bootstrap')
} catch (e) {
    console.error('jquery load error.')
}

/** FONTS */
import '@mdi/font/fonts/materialdesignicons-webfont.eot'
import '@mdi/font/fonts/materialdesignicons-webfont.ttf'
import '@mdi/font/fonts/materialdesignicons-webfont.woff'
import '@mdi/font/fonts/materialdesignicons-webfont.woff2'
