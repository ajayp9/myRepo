const cards = document.querySelectorAll('.learn-card');
let maxHeight = 0;

cards.forEach(card => {
    const height = card.offsetHeight;
    if (height > maxHeight) {
        maxHeight = height;
    }
});

cards.forEach(card => {
    card.style.height = `${maxHeight}px`;
});
window.onload = function () {
    const cardData = [
        { id: 1, name: "Abhimanyu", profession: "Excellent app with a fantastic UI! 🤩 Eventhough the app is still in progressive mode,I must say it is getting better every day.It has an amazing user interface." },
        { id: 2, name: "Aadarsh", profession: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sapiente maiores accusamus praesentium magni, eius natus eaque at dolorum iste " },
        { id: 3, name: "Rohan", profession: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sapiente maiores accusamus praesentium magni, eius natus eaque at dolorum iste " },
        { id: 4, name: "Sarthak", profession: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sapiente maiores accusamus praesentium magni, eius natus eaque at dolorum iste " },
        { id: 5, name: "Sakshi", profession: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sapiente maiores accusamus praesentium magni, eius natus eaque at dolorum iste " },
        { id: 6, name: "Ayush", profession: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sapiente maiores accusamus praesentium magni, eius natus eaque at dolorum iste " },
        { id: 7, name: "Shubhi", profession: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat sapiente maiores accusamus praesentium magni, eius natus eaque at dolorum iste " },
    ];

    function generateCards() {
        const cardContainer = document.getElementById("cardContainer");
        cardData.forEach(data => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("swiper-slide", "card_swipe");
            cardElement.id = `card_${data.id}`;

            cardElement.innerHTML = `
                <div class="card-content">
                    <div class="media-icons">
                        <i class="fa-solid fa-quote-right"></i>
                    </div>
                    <div class="name-profession">
                        <span class="name">${data.name}</span>
                        <span class="profession">${data.profession}</span>
                    </div>
                </div>
            `;

            cardContainer.appendChild(cardElement);
        });

        let swiperOptions = {
            loop: true,
            loopFillGroupWithBlank: false,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }
        };

        const swiper = new Swiper(".mySwiper", swiperOptions);

        // Function to update swiper options based on screen size
        function updateSwiperOptions(event) {
            if (event.matches) {
                if (event.media === "(max-width: 575px)") {
                    swiper.params.slidesPerView = 1;
                    swiper.params.slidesPerGroup = 1;
                    swiper.params.spaceBetween = 10;
                } else if (event.media === "(min-width: 576px) and (max-width: 767px)") {
                    swiper.params.slidesPerView = 2;
                    swiper.params.slidesPerGroup = 2;
                    swiper.params.spaceBetween = 20;
                } else {
                    swiper.params.slidesPerView = 3;
                    swiper.params.slidesPerGroup = 3;
                    swiper.params.spaceBetween = 30;
                }
                swiper.update();
            }
        }

        const mediaQuery575 = window.matchMedia('(max-width: 575px)');
        const mediaQuery576_767 = window.matchMedia('(min-width: 576px) and (max-width: 767px)');
        const mediaQueryAbove767 = window.matchMedia('(min-width: 768px)');

        updateSwiperOptions(mediaQuery575); // Initial call to set swiper options
        updateSwiperOptions(mediaQuery576_767); // Initial call to set swiper options
        updateSwiperOptions(mediaQueryAbove767); // Initial call to set swiper options

        mediaQuery575.addEventListener('change', updateSwiperOptions); // Listen for changes in media query
        mediaQuery576_767.addEventListener('change', updateSwiperOptions); // Listen for changes in media query
        mediaQueryAbove767.addEventListener('change', updateSwiperOptions);

    }

    generateCards();

    // Reusable function to toggle underline class for buttons
    function toggleButtonUnderline(clickedButton, otherButtons) {
        clickedButton.classList.add('underline');
        otherButtons.forEach(button => {
            if (button !== clickedButton) {
                button.classList.remove('underline');
            }
        });
    }

    // Event listeners for High/Low buttons
    document.querySelectorAll('.high-low-buttons button').forEach(button => {
        button.addEventListener('click', function () {
            toggleButtonUnderline(this, document.querySelectorAll('.high-low-buttons button'));
        });
    });

    // Event listeners for Gainer/Loser buttons
    document.querySelectorAll('.gainer-loser-buttons button').forEach(button => {
        button.addEventListener('click', function () {
            toggleButtonUnderline(this, document.querySelectorAll('.gainer-loser-buttons button'));
        });
    });

    const table1 = document.getElementById('table1');
    const table2 = document.getElementById('table2');
    const showMoreBtn1 = document.getElementById('showMoreBtn1');
    const showMoreBtn2 = document.getElementById('showMoreBtn2');

    showMoreBtn1.addEventListener('click', function () {
        toggleRowsVisibility(table1, showMoreBtn1);
    });

    showMoreBtn2.addEventListener('click', function () {
        toggleRowsVisibility(table2, showMoreBtn2);
    });

    // Function to toggle rows visibility
    function toggleRowsVisibility(table, button) {
        const rows = table.getElementsByTagName('tr');
        for (let i = 15; i < rows.length; i++) {
            rows[i].classList.toggle('hidden');
        }
        if (table === table1)
            button.textContent = rows[15].classList.contains('hidden') ? 'View Less' : 'View All 52 Week High';
        else if (table === table2)
            button.textContent = rows[15].classList.contains('hidden') ? 'View Less' : 'View All 52 Week Low';
    }

    // Function to add data dynamically
    function addDataToTable(table) {
        const tbody = table.querySelector('tbody');
        for (let i = 1; i <= 52; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>Row ${i}</td><td>Data ${i}</td> <td><div class="column3-cell">+12%</div></td>`;
            tbody.appendChild(row);
            if (i > 15) {
                row.classList.add('hidden');
            }
        }
    }
    // Add data to tables
    addDataToTable(table1);
    addDataToTable(table2);

    const table2Rows = document.querySelectorAll('#table2 tbody tr');
    table2Rows.forEach(row => {
        const column3Cell = row.querySelector('.column3-cell');
        const column3Value = parseFloat(column3Cell.textContent);
        if (!isNaN(column3Value)) {
            if (column3Value > 0) {
                column3Cell.classList.add('positive-value');
            } else if (column3Value < 0) {
                column3Cell.classList.add('negative-value');
            }
        }
    });
};