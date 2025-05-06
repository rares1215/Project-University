
// ////////////// PENTRU TAB URI/////////////////
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab');
    const iframe = document.getElementById('iframe-display');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Resetează toate taburile
            tabs.forEach(t => t.classList.remove('active'));

            // Adaugă clasa activă tabului selectat
            this.classList.add('active');

            // Schimbă sursa iframe-ului
            const video = this.getAttribute('data-video');
            if (video === 'video1') {
                iframe.src = "https://www.youtube.com/embed/NieQHjCHnxg"; // Pâine cu maia
            } else if (video === 'video2') {
                iframe.src = "https://www.youtube.com/embed/vIIKR9LOvZ4"; // Fursecuri fără zahăr
            }
        });
    });
});

// //////////////////////// PENTRU MENIU "BURGER"//////////////////

document.getElementById('burger').addEventListener('click', function () {
    this.classList.toggle('active');
});


