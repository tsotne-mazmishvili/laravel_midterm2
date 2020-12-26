//The build will inline common dependencies into this file.



requirejs.config({

    baseUrl: './js',

    paths: {

        'jquery': 'vendor/jquery',

        'jqueryui': 'vendor/jqueryui',

        'plugins': 'vendor/plugins',

        'AboutUs': 'vendor/about-us',

        'bootstrap': 'vendor/bootstrap',

        'TweenMax': 'vendor/TweenMax',

        'BxSlider': 'vendor/bxslider',

        'Fancybox': 'vendor/fancybox',

        'wow': 'vendor/wow',

        'sweetAlert': 'vendor/sweetAlert',

        'slick': 'vendor/slick',

        'LazySizes': 'vendor/LazySizes',

        'Imager': 'vendor/Imager.min',

        'RevolutionSlider': 'vendor/revolution',

        'Navigation': 'app/include/navigation',

        'calendar': 'vendor/calendar',

        'jQueryForm': 'vendor/jQueryForm'

    },

    shim: {

        'bootstrap': ['jquery'],

        'LazySizes': ['jquery'],

        'RevolutionSlider': ['jquery'],

        'AboutUs': ['jquery'],

        'BxSlider': ['jquery'],

        'fancybox': ['jquery'],

        'calendar': ['jquery'],

        'jQueryForm': ['jquery']

    },

    map: {

        '*': {

            css: 'vendor/css'

        }

    }

});