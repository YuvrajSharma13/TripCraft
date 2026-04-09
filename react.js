const { useState } = React;

function BudgetPlanner({ totalBudget }) {
    const [stay, setStay] = useState(45);
    const [food, setFood] = useState(25);
    const [transit, setTransit] = useState(15);
    const [misc, setMisc] = useState(15);

    const format = (val) => Math.floor(totalBudget * (val / 100)).toLocaleString('en-IN');
    const totalAllocated = Math.floor(totalBudget * ((parseInt(stay) + parseInt(food) + parseInt(transit) + parseInt(misc)) / 100));

    return (
        <div className="react-budget-card">
            <h4 style={{margin: "0 0 15px 0", color: "#334155"}}>📊 React Dynamic Budgeter</h4>
            <div style={{marginBottom: '10px'}}>
                <label style={{fontSize: '0.8rem', fontWeight: 'bold'}}>🏨 Stay ({stay}%): ₹{format(stay)}</label>
                <input type="range" className="budget-slider" value={stay} min="0" max="100" onChange={(e) => setStay(e.target.value)} />
            </div>
            <div style={{marginBottom: '10px'}}>
                <label style={{fontSize: '0.8rem', fontWeight: 'bold'}}>🍱 Meals ({food}%): ₹{format(food)}</label>
                <input type="range" className="budget-slider" value={food} min="0" max="100" onChange={(e) => setFood(e.target.value)} />
            </div>
            <div style={{marginBottom: '10px'}}>
                <label style={{fontSize: '0.8rem', fontWeight: 'bold'}}>🚕 Transit ({transit}%): ₹{format(transit)}</label>
                <input type="range" className="budget-slider" value={transit} min="0" max="100" onChange={(e) => setTransit(e.target.value)} />
            </div>
            <div style={{marginBottom: '10px'}}>
                <label style={{fontSize: '0.8rem', fontWeight: 'bold'}}>🎟️ Misc ({misc}%): ₹{format(misc)}</label>
                <input type="range" className="budget-slider" value={misc} min="0" max="100" onChange={(e) => setMisc(e.target.value)} />
            </div>
            <div className="total-budget-badge">
                Total Allocated: ₹{totalAllocated.toLocaleString('en-IN')}
            </div>
        </div>
    );
}

// Global function to render the React component from main script
window.mountBudgetPlanner = (budget) => {
    const root = ReactDOM.createRoot(document.getElementById('react-budget-root'));
    root.render(<BudgetPlanner totalBudget={budget} />);
};
