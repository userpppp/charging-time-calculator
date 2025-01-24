function calculateChargingTime() {
    const startTimeInput = document.getElementById('start-time').value;
    const startChargeInput = document.getElementById('start-charge').value;
    const currentChargeInput = document.getElementById('current-charge').value;

    if (!startTimeInput || !startChargeInput || !currentChargeInput) {
        alert(getTranslation('fill-all-fields'));
        return;
    }

    const startTime = new Date();
    const [hours, minutes] = startTimeInput.split(':').map(Number);
    startTime.setHours(hours);
    startTime.setMinutes(minutes);

    const startCharge = parseInt(startChargeInput);
    const currentCharge = parseInt(currentChargeInput);
    
    if (isNaN(startCharge) || isNaN(currentCharge) || startCharge < 0 || startCharge > 100 || currentCharge < 0 || currentCharge > 100) {
        alert(getTranslation('charge-range'));
        return;
    }

    const chargeNeeded = 100 - currentCharge;
    const chargingRate = (new Date() - startTime) / (currentCharge - startCharge) / 60000;
    
    const timeToFullCharge = chargeNeeded * chargingRate;

    const fullChargeTime = new Date(new Date().getTime() + timeToFullCharge * 60000);
    
    const fullChargeHours = fullChargeTime.getHours().toString().padStart(2, '0');
    const fullChargeMinutes = fullChargeTime.getMinutes().toString().padStart(2, '0');

    document.getElementById('result').innerHTML = `
        ${getTranslation('full-charge-time')}: ${fullChargeHours}:${fullChargeMinutes} <br>
        ${getTranslation('charging-rate')}: ${chargingRate.toFixed(2)} ${getTranslation('minutes-per-percent')}
    `;
}

function getTranslation(key) {
    const translations = window.translations || {};
    const lang = document.documentElement.lang || 'zh-cn';
    return translations[lang][key] || key;
}

document.getElementById('calculate-btn').addEventListener('click', calculateChargingTime);