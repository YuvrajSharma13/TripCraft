/* ============================================================
   1. AUTH & SESSION
============================================================ */
window.onload = function() {
    // Persistent session check from tt9.html logic
    if (localStorage.getItem('tripcraft_loggedIn') === 'true') {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
    }
};

function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    // Hardcoded credentials as per your file requirement
    if (u === "Yuvraj" && p === "Project") {
        localStorage.setItem('tripcraft_loggedIn', 'true');
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
    } else { 
        document.getElementById('login-err').style.display = 'block'; 
    }
}

function logout() { 
    localStorage.removeItem('tripcraft_loggedIn'); 
    window.location.reload(); 
}

const WEATHER_API_KEY = "991278af71eaf29bfe6553d9bab208a9";

/* ============================================================
   2. DESTINATION KNOWLEDGE BASE (Full Data from your file)
============================================================ */
const locations = {
    "goa": { img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600", spots: ["Calangute Beach","Fort Aguada","Dudhsagar Falls","Panjim Market","Baga Beach Cabanas","Old Goa Churches"], coords: [15.2993, 74.1240], spotCoords: [[15.5440,73.7521],[15.4867,73.7742],[15.3148,74.3177],[15.4989,73.8278],[15.5526,73.7517],[15.5008,73.9087]], weatherCity: "Goa,IN",
        answers: { "local foods": "Goa is famous for **Fish Recheado** and **Prawn Balchão**. Try authentic **Bebinca** for dessert! 🍛", "packing": "Pack light cottons, swimwear, and high SPF sunscreen. 🎒", "safety": "Always wear a helmet while riding scooties. Stick to well-lit areas at night. 🛡️", "money": "Rent a bike instead of cabs. Eat at local shacks to save money. 💰", "time": "Nov to Feb is perfect weather. 📅", "gems": "Take a ferry to **Divar Island** for a peaceful, old-world vibe. 💎" }
    },
    "manali": { img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600", spots: ["Solang Valley","Rohtang Pass","Hadimba Devi Temple","Old Manali Cafes","Mall Road","Beas River Point"], coords: [32.2396, 77.1887], spotCoords: [[32.3133,77.1534],[32.3747,77.2519],[32.2447,77.1729],[32.2526,77.1786],[32.2354,77.1907],[32.2254,77.2041]], weatherCity: "Manali,IN",
        answers: { "local foods": "Try **Siddu** with ghee and **Trout Fish** from the Beas River. 🍛", "packing": "Heavy woolens are a must even in summer evenings. 🎒", "safety": "Check weather updates before going to Rohtang Pass due to potential snow. 🛡️", "money": "Use local buses to travel between towns like Kullu and Manali. 💰", "time": "March to June is pleasant. Dec to Jan for snow. 📅", "gems": "Hike to **Jogini Waterfalls** for incredible views. 💎" }
    },
    "paris": { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600", spots: ["Eiffel Tower","Louvre Museum","Seine River","Montmartre","Arc de Triomphe","Champs-Élysées"], coords: [48.8566, 2.3522], spotCoords: [[48.8584,2.2945],[48.8606,2.3376],[48.8566,2.3522],[48.8867,2.3431],[48.8738,2.2950],[48.8698,2.3078]], weatherCity: "Paris,FR",
        answers: { "local foods": "Grab a fresh **Croissant** or try **Steak Frites**. 🍛", "packing": "Think 'Parisian Chic'—smart casuals and good walking shoes. 🎒", "safety": "Be aware of pickpockets in crowded tourist spots like the Louvre. 🛡️", "money": "Buy a 'Navigo' pass for the Metro and drink free tap water. 💰", "time": "Spring (April-June) is magical. 📅", "gems": "Visit the **Catacombs** for a unique underground history. 💎" }
    },
    "london": { img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600", spots: ["Big Ben","London Eye","Tower of London","British Museum","Buckingham Palace","The Shard"], coords: [51.5074, -0.1278], spotCoords: [[51.5007,-0.1246],[51.5033,-0.1195],[51.5081,-0.0759],[51.5194,-0.1270],[51.5014,-0.1419],[51.5045,-0.0865]], weatherCity: "London,GB",
        answers: { "local foods": "Don't miss authentic **Fish and Chips** and **English Afternoon Tea**. 🍛", "packing": "The weather is moody; always carry a compact umbrella. 🎒", "safety": "Watch out for phone-snatchers on bikes in busy areas. 🛡️", "money": "Many museums like the British Museum are free to enter! 💰", "time": "Summer (June-August) has the best sunshine. 📅", "gems": "Explore **Camden Market** for alternative culture. 💎" }
    },
    "tokyo": { img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600", spots: ["Shibuya Crossing","Tokyo Tower","Senso-ji Temple","Meiji Jingu","Akihabara Electric Town","TeamLab Borderless"], coords: [35.6762, 139.6503], spotCoords: [[35.6595,139.7005],[35.6586,139.7454],[35.7148,139.7967],[35.6764,139.6993],[35.6997,139.7712],[35.6264,139.7792]], weatherCity: "Tokyo,JP",
        answers: { "local foods": "Try authentic **Ramen** and fresh **Sushi** in Shinjuku. 🍛", "packing": "Pack comfortable socks as you'll be taking shoes off often. 🎒", "safety": "Extremely safe city. Just follow local etiquette. 🛡️", "money": "Eat at 'Konbini' (Convenience stores) for high-quality cheap food. 💰", "time": "April for Cherry Blossoms or Nov for fall colors. 📅", "gems": "Visit **Shimokitazawa** for unique vintage shops. 💎" }
    },
    "rome": { img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600", spots: ["Colosseum","Trevi Fountain","Pantheon","Vatican Museums","Piazza Navona","Roman Forum"], coords: [41.9028, 12.4964], spotCoords: [[41.8902,12.4922],[41.9009,12.4833],[41.8986,12.4769],[41.9065,12.4548],[41.8992,12.4731],[41.8925,12.4853]], weatherCity: "Rome,IT",
        answers: { "local foods": "Eat real **Pasta Carbonara** and street **Supplì**. 🍛", "packing": "Modest clothes for churches (shoulders/knees covered). 🎒", "safety": "Avoid 'gladiator' scammers near the Colosseum. 🛡️", "money": "Book Colosseum tickets online weeks in advance. 💰", "time": "April-May or Sept-Oct. 📅", "gems": "Walk through **Trastevere** at night for the best vibe. 💎" }
    },
    "new york": { img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600", spots: ["Times Square","Central Park","Statue of Liberty","Empire State Building","Brooklyn Bridge","Met Museum"], coords: [40.7128, -74.0060], spotCoords: [[40.7580,-73.9855],[40.7812,-73.9665],[40.6892,-74.0445],[40.7484,-73.9857],[40.7061,-73.9969],[40.7794,-73.9632]], weatherCity: "New York,US",
        answers: { "local foods": "Grab a **$1 Pizza Slice** or a bagel for breakfast. 🍛", "packing": "Layers are key; NYC can be hot outside and freezing with AC. 🎒", "safety": "Subway is safe, but stay in well-populated areas at night. 🛡️", "money": "Walk as much as you can—it's the best way to see the city. 💰", "time": "Dec for lights or Sept for perfect weather. 📅", "gems": "Walk the **High Line**, an elevated park trail. 💎" }
    },
    "dubai": { img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600", spots: ["Burj Khalifa","Dubai Mall","Palm Jumeirah","Desert Safari","Dubai Marina","Gold Souk"], coords: [25.2048, 55.2708], spotCoords: [[25.1972,55.2744],[25.1985,55.2796],[25.1124,55.1390],[25.2769,55.2962],[25.0819,55.1367],[25.2736,55.2975]], weatherCity: "Dubai,AE",
        answers: { "local foods": "Try **Shawarma** and local dates from the Old Souks. 🍛", "packing": "Light breathable fabrics. Bring a shawl for malls. 🎒", "safety": "Extremely safe. Just respect local customs in malls. 🛡️", "money": "Use the Metro; it's high-tech and affordable. 💰", "time": "Nov to March. Avoid summer heat. 📅", "gems": "Take an **Abra ride** across Dubai Creek for 1 Dirham. 💎" }
    },
    "default": { img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600", spots: ["City Square","Main Museum","Central Park","Local Food Street"], coords: [20.5937, 78.9629], spotCoords: [[20.60,79.00],[20.61,78.99],[20.59,79.01],[20.58,78.98]], weatherCity: "New Delhi,IN",
        answers: { "local foods": "Try the street food! 🍛", "packing": "Pack versatile clothes. 🎒", "safety": "Be aware of surroundings. 🛡️", "money": "Use public transport. 💰", "time": "Avoid rainy seasons. 📅", "gems": "Ask locals! 💎" }
    }
};

/* ============================================================
   3. CORE APP LOGIC
============================================================ */
let currentTrip = {};
let leafletMap = null;
let mapInited = false;

function generateTrip() {
    const destName = document.getElementById('dest').value;
    const days = parseInt(document.getElementById('days').value);
    const budget = parseInt(document.getElementById('budget').value) || 0;
    const vibe = document.getElementById('vibe').value;
    if (!destName) { alert("Please enter a destination!"); return; }

    const key = destName.toLowerCase();
    const cityData = locations[key] || locations["default"];
    currentTrip = { destName, days, budget, vibe, cityData, key };

    document.body.style.background = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('${cityData.img}')`;
    document.body.style.backgroundSize = "cover";
    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('display-title').innerText = `${destName} Itinerary`;
    document.getElementById('budget-info').innerText = `${vibe} Mode • Daily: ₹${Math.floor(budget/days).toLocaleString('en-IN')}`;

    const list = document.getElementById('itinerary-list');
    list.innerHTML = "";
    for (let i = 1; i <= days; i++) {
        const s1 = cityData.spots[Math.floor(Math.random() * cityData.spots.length)];
        const s2 = cityData.spots[Math.floor(Math.random() * cityData.spots.length)];
        const div = document.createElement('div');
        div.className = 'day-block';
        div.innerHTML = `<div class="day-title">DAY ${i}</div><div>🚩 Morning: ${s1}</div><div>📍 Afternoon: ${s2}</div>`;
        list.appendChild(div);
    }

    if (window.mountBudgetPlanner) window.mountBudgetPlanner(budget);
    mapInited = false;
    switchTab('itinerary');
    loadWeather(cityData.weatherCity);
    loadMap(cityData);
    initAIChat(destName);
}

function resetPage() {
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('${locations.default.img}')`;
    if (leafletMap) { leafletMap.remove(); leafletMap = null; }
}

function switchTab(name) {
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', ['itinerary','weather','map','ai'][i] === name));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    
    if (name === 'map' && !mapInited && currentTrip.cityData) {
        mapInited = true;
        setTimeout(() => initLeafletMap(currentTrip.cityData), 150);
    } else if (name === 'map' && leafletMap) {
        setTimeout(() => leafletMap.invalidateSize(), 100);
    }
}

/* ============================================================
   4. WEATHER (Detailed Forecast)
============================================================ */
const weatherIconsMap = { "Clear": "☀️", "Clouds": "⛅", "Rain": "🌧️", "Drizzle": "🌦️", "Thunderstorm": "⛈️", "Snow": "❄️", "Mist": "🌫️" };

async function loadWeather(cityLabel) {
    const container = document.getElementById('weather-content');
    container.innerHTML = `<div style="text-align:center;padding:30px;"><span class="spinner"></span> Loading detailed weather...</div>`;
    try {
        const curRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityLabel)}&units=metric&appid=${WEATHER_API_KEY}`);
        const curData = await curRes.json();
        
        const fRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityLabel)}&units=metric&appid=${WEATHER_API_KEY}`);
        const fData = await fRes.json();

        const dailyMap = {};
        fData.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyMap[date]) dailyMap[date] = item;
        });
        const forecastDays = Object.values(dailyMap).slice(0, 3);

        container.innerHTML = `
            <div class="weather-widget">
                <div class="wlabel">Current Weather in ${curData.name}</div>
                <div class="wval">${weatherIconsMap[curData.weather[0].main] || "🌡️"} ${Math.round(curData.main.temp)}°C</div>
                <div class="wrow">
                    <div class="witem"><div class="wlabel">Humidity</div>${curData.main.humidity}%</div>
                    <div class="witem"><div class="wlabel">Wind</div>${curData.wind.speed}m/s</div>
                </div>
            </div>
            <div class="forecast-row">
                ${forecastDays.map(f => `
                    <div class="forecast-card">
                        <div class="fday">${new Date(f.dt_txt).toLocaleDateString('en-IN',{weekday:'short'})}</div>
                        <div class="ficon">${weatherIconsMap[f.weather[0].main] || "🌡️"}</div>
                        <div class="ftemp">${Math.round(f.main.temp)}°C</div>
                    </div>`).join('')}
            </div>`;
    } catch (err) { container.innerHTML = "Weather data unavailable."; }
}

/* ============================================================
   5. MAP, CHAT, & STORAGE
============================================================ */
function initLeafletMap(cityData) {
    if (leafletMap) leafletMap.remove();
    leafletMap = L.map('trip-map').setView(cityData.coords, 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' }).addTo(leafletMap);
    cityData.spots.forEach((spot, i) => { L.marker(cityData.spotCoords[i]).addTo(leafletMap).bindPopup(spot); });
}

function loadMap(cityData) {
    const spotList = document.getElementById('spot-list');
    spotList.innerHTML = cityData.spots.map((s, i) => `<div class="spot-item" onclick="focusMap(${i})"><div class="spot-num">${i+1}</div><div class="spot-name">${s}</div></div>`).join('');
}

function focusMap(i) { if(leafletMap) leafletMap.setView(currentTrip.cityData.spotCoords[i], 15, {animate:true}); }

const SUGGESTIONS = [
    { label: "Local Foods 🍛", key: "local foods" }, { label: "Packing Tips 🎒", key: "packing" }, { label: "Safety Tips 🛡️", key: "safety" },
    { label: "Save Money 💰", key: "money" }, { label: "Best Time 📅", key: "time" }, { label: "Hidden Gems 💎", key: "gems" }
];

function initAIChat(dest) {
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('quick-tips').innerHTML = SUGGESTIONS.map(s => `<span class="tip-chip" onclick="askAI('${s.key}', '${s.label}')">${s.label}</span>`).join('');
    addMsg('ai', `Welcome to **${dest}**! How can I help?`);
}

function askAI(key, label) {
    addMsg('user', label);
    addTyping();
    setTimeout(() => { removeTyping(); addMsg('ai', currentTrip.cityData.answers[key]); }, 800);
}

function sendChat() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim().toLowerCase();
    if (!text) return;
    input.value = ''; addMsg('user', text); addTyping();
    setTimeout(() => {
        removeTyping();
        let found = false;
        for (let s of SUGGESTIONS) { if (text.includes(s.key.split(' ')[0])) { addMsg('ai', currentTrip.cityData.answers[s.key]); found = true; break; } }
        if (!found) addMsg('ai', `I'm a specialist for **${currentTrip.destName}**. Try one of the suggested questions!`);
    }, 1000);
}

function addMsg(role, html) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerHTML = `<div class="msg-sender">${role==='ai' ? '🤖 TripCraft AI' : '👤 You'}</div>${html}`;
    box.appendChild(div); box.scrollTop = box.scrollHeight;
}

function addTyping() { const box = document.getElementById('chat-messages'); const div = document.createElement('div'); div.className = 'msg ai'; div.id = 'typing-indicator'; div.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span>`; box.appendChild(div); }
function removeTyping() { const el = document.getElementById('typing-indicator'); if (el) el.remove(); }

function saveTrip() {
    const { destName, days, budget, vibe } = currentTrip;
    const savedTrips = JSON.parse(localStorage.getItem('tripcraft_trips') || '[]');
    savedTrips.unshift({ id: Date.now(), destName, days, budget, vibe, savedAt: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short' }) });
    localStorage.setItem('tripcraft_trips', JSON.stringify(savedTrips));
    showToast('✅ Trip saved to My Trips!');
}

function openSavedOverlay() {
    const trips = JSON.parse(localStorage.getItem('tripcraft_trips') || '[]');
    const container = document.getElementById('saved-trips-list');
    container.innerHTML = trips.length === 0 ? "No trips." : trips.map(t => `<div class="saved-trip-card"><div class="st-header"><div><div class="st-dest">📍 ${t.destName}</div><div style="font-size:0.7rem; color:#94a3b8;">${t.savedAt}</div></div><span class="st-delete" onclick="deleteTrip(${t.id})">Delete</span></div><div class="st-meta"><span class="saved-badge">${t.days} Days</span><span class="saved-badge">₹${t.budget}</span><span class="saved-badge">${t.vibe}</span></div></div>`).join('');
    document.getElementById('saved-overlay').classList.add('open');
}

function deleteTrip(id) { const trips = JSON.parse(localStorage.getItem('tripcraft_trips') || '[]'); localStorage.setItem('tripcraft_trips', JSON.stringify(trips.filter(t => t.id !== id))); openSavedOverlay(); }
function closeSavedOverlay() { document.getElementById('saved-overlay').classList.remove('open'); }
function showToast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }
