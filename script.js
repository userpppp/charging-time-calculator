function calculateChargingTime() {
    const startTimeInput = document.getElementById('start-time').value;
    const startChargeInput = document.getElementById('start-charge').value;
    const currentChargeInput = document.getElementById('current-charge').value;

    if (!startTimeInput || !startChargeInput || !currentChargeInput) {
        alert('请填写所有字段');
        return;
    }

    const startTime = new Date();
    const [hours, minutes] = startTimeInput.split(':').map(Number);
    startTime.setHours(hours);
    startTime.setMinutes(minutes);

    const startCharge = parseInt(startChargeInput);
    const currentCharge = parseInt(currentChargeInput);
    
    if (isNaN(startCharge) || isNaN(currentCharge) || startCharge < 0 || startCharge > 100 || currentCharge < 0 || currentCharge > 100) {
        alert('电量必须在0到100之间');
        return;
    }

    const chargeNeeded = 100 - currentCharge;
    const chargingRate = (new Date() - startTime) / (currentCharge-startCharge) / 60000;
    
    const timeToFullCharge = chargeNeeded * chargingRate;

    const fullChargeTime = new Date(new Date().getTime() + timeToFullCharge * 60000);
    
    const fullChargeHours = fullChargeTime.getHours().toString().padStart(2, '0');
    const fullChargeMinutes = fullChargeTime.getMinutes().toString().padStart(2, '0');

    document.getElementById('result').innerHTML = `
        充满电时间: ${fullChargeHours}:${fullChargeMinutes} <br>
        充电速度: ${chargingRate.toFixed(2)}分钟/%
    `;
}

document.getElementById('calculate-btn').addEventListener('click', calculateChargingTime);