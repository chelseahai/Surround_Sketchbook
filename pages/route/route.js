

function submitRoute() {
    const route = document.getElementById('routeInput').value;
    if (route.trim()) {
        console.log(`Journey to: ${route}`);
        alert(`Journey to: ${route}\nYour path will illuminate the digital sky.`);
        document.getElementById('routeInput').value = '';
    } else {
        alert('Please enter a destination for your journey.');
    }
}

// Enter key support
// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
}

// Initialize custom cursor
initCustomCursor();

document.getElementById('routeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitRoute();
    }
}); 