// 1. AUTHENTICATION
function checkAuth() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u === "Yuvraj" && p === "Project") {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
    } else {
        document.getElementById('login-err').style.display = 'block';
    }
}

// 2. DATA SOURCE
const locations = {
    "goa": {
        img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600",
        spots: ["Calangute Beach", "Fort Aguada", "Dudhsagar Falls", "Panjim Market", "Baga Beach Cabanas", "Old Goa Churches"]
    },
    "manali": {
        img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600",
        spots: ["Solang Valley", "Rohtang Pass", "Hadimba Devi Temple", "Old Manali Cafes", "Mall Road", "Beas River Point"]
    },
    "paris": {
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600",
        spots: ["Eiffel Tower", "Louvre Museum", "Seine River", "Montmartre", "Arc de Triomphe", "Champs-Élysées"]
    },
    "default": {
        img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600",
        spots: ["City Square", "Main Museum", "Central Park", "Local Food Street", "Historic Landmark", "Viewpoint Hill"]
    }
};

// 3. GENERATOR LOGIC
function generateTrip() {
    const destName = document.getElementById('dest').value;
    const days = parseInt(document.getElementById('days').value);
    const budget = parseInt(document.getElementById('budget').value) || 0;
    const vibe = document.getElementById('vibe').value;

    if(!destName) { alert("Please enter a destination!"); return; }

    const key = destName.toLowerCase();
    const cityData = locations[key] || locations["default"];

    // Update UI
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${cityData.img}')`;
    document.body.style.backgroundSize = "cover";
    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('display-title').innerText = `${destName} Itinerary`;
    
    // Budget Math
    let daily = Math.floor(budget / days);
    document.getElementById('budget-info').innerText = `${vibe} Mode • Daily: ₹${daily.toLocaleString('en-IN')}`;

    // Itinerary List
    const list = document.getElementById('itinerary-list');
    list.innerHTML = "";
    for(let i = 1; i <= days; i++) {
        const s1 = cityData.spots[Math.floor(Math.random() * cityData.spots.length)];
        const s2 = cityData.spots[Math.floor(Math.random() * cityData.spots.length)];
        const div = document.createElement('div');
        div.className = 'day-block';
        div.innerHTML = `<div class="day-title">DAY ${i}</div><div>🚩 Morning: ${s1}</div><div>📍 Afternoon: ${s2}</div>`;
        list.appendChild(div);
    }

    // Breakdown Algorithm
    document.getElementById('breakdown-text').innerHTML = `
        • 🏨 Stay: ₹${Math.floor(budget * 0.45).toLocaleString('en-IN')}<br>
        • 🍱 Meals: ₹${Math.floor(budget * 0.25).toLocaleString('en-IN')}<br>
        • 🚕 Transit: ₹${Math.floor(budget * 0.15).toLocaleString('en-IN')}<br>
        • 🎟️ Misc/Fees: ₹${Math.floor(budget * 0.15).toLocaleString('en-IN')}
    `;
}

function resetPage() {
    document.getElementById('input-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${locations.default.img}')`;
}