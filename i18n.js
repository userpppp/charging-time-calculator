document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-i18n]');
    let lang = document.documentElement.lang || 'zh-cn';

    function loadTranslations(lang) {
        fetch(`/charging-time-calculator/locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                window.translations = window.translations || {};
                window.translations[lang] = translations;
                elements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[key]) {
                        element.textContent = translations[key];
                    }
                });
                if (document.getElementById('result').innerHTML) {
                    calculateChargingTime();
                }
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    function detectLanguage() {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const countryCode = data.country_code;
                if (countryCode === 'CN') {
                    lang = 'zh-cn';
                } else if (['HK', 'MO', 'TW'].includes(countryCode)) {
                    lang = 'zh-tw';
                } else {
                    lang = 'en';
                }
                document.documentElement.lang = lang;
                loadTranslations(lang);
                const languageSelector = document.getElementById('language-selector');
                languageSelector.value = lang;
            })
            .catch(error => {
                console.error('Error detecting language:', error);
                loadTranslations(lang);
            });
    }

    detectLanguage();

    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        document.documentElement.lang = selectedLang;
        loadTranslations(selectedLang);
    });
});
