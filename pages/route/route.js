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
document.getElementById('routeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        submitRoute();
    }
}); 