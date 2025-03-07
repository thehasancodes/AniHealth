// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Header Interactivity
    const emergencyBtn = document.getElementById("emergency-btn");
    const loginBtn = document.getElementById("login-btn");

    emergencyBtn.addEventListener("click", () => {
        alert("Emergency services are being contacted. Please wait for assistance.");
    });

    loginBtn.addEventListener("click", () => {
        alert("Login functionality will be implemented in the full version.");
    });

    // Dashboard Quick Actions
    const addAnimalBtn = document.getElementById("add-animal-btn");
    const scanTagBtn = document.getElementById("scan-tag-btn");
    const chatAiBtn = document.getElementById("chat-ai-btn");
    const viewAllAlertsBtn = document.querySelector(".stat-card .view-all-btn");

    addAnimalBtn.addEventListener("click", () => {
        alert("You clicked on Add Animal. This action will be implemented in the full version.");
    });

    scanTagBtn.addEventListener("click", () => {
        alert("You clicked on Scan Tag. This action will be implemented in the full version.");
    });

    chatAiBtn.addEventListener("click", () => {
        alert("Opening AI Chat. Redirecting to chatbot interface.");
        document.querySelector(".tab-btn[data-tab='chatbot']").click();
    });

    viewAllAlertsBtn.addEventListener("click", () => {
        alert("View all alerts feature will be implemented in the full version.");
    });

    // Health Monitoring - Animal Details with Chart
    const animalCards = document.querySelectorAll(".animal-card");
    const animalDetailsPanel = document.querySelector(".animal-details");
    const selectPrompt = document.querySelector(".select-prompt");
    let vitalChart = null;

    const dummyAnimalData = {
        "COW-001": {
            name: "Lakshmi",
            type: "Holstein Cow",
            gender: "Female",
            age: "4 years",
            tag: "IoT-34765",
            vitals: { temp: "38.6°C", heartRate: "72 BPM", activity: "Normal" },
            history: [
                { date: "12 Feb 2025", event: "Vaccination - FMD" },
                { date: "24 Jan 2025", event: "Deworming" },
            ],
            chartData: {
                labels: ["00:00", "06:00", "12:00", "18:00", "23:59"],
                temp: [37.5, 38.0, 38.6, 38.4, 38.6],
                heartRate: [60, 65, 72, 70, 72],
            },
        },
        "GT-042": {
            name: "Ramu",
            type: "Black Bengal Goat",
            gender: "Male",
            age: "2 years",
            tag: "IoT-89234",
            vitals: { temp: "40.1°C", heartRate: "92 BPM", activity: "Lethargic" },
            history: [
                { date: "15 Feb 2025", event: "Fever Treatment" },
                { date: "01 Jan 2025", event: "Vaccination" },
            ],
            chartData: {
                labels: ["00:00", "06:00", "12:00", "18:00", "23:59"],
                temp: [39.0, 39.5, 40.1, 40.0, 40.1],
                heartRate: [80, 85, 92, 90, 92],
            },
        },
    };

    animalCards.forEach(card => {
        card.addEventListener("click", () => {
            const animalId = card.querySelector("p").textContent.split("ID: ")[1];
            const data = dummyAnimalData[animalId];

            // Update animal details
            document.querySelector(".detail-header h3").textContent = data.name;
            document.querySelector(".detail-header p:nth-child(2)").textContent = `${data.type} • ${data.gender} • ${data.age}`;
            document.querySelector(".detail-header p:nth-child(3)").textContent = `ID: ${animalId} • Tag: ${data.tag}`;
            document.querySelector(".detail-card:nth-child(1) ul").innerHTML = `
                <li><span>Temperature:</span> ${data.vitals.temp}</li>
                <li><span>Heart Rate:</span> ${data.vitals.heartRate}</li>
                <li><span>Activity Level:</span> ${data.vitals.activity}</li>
            `;
            document.querySelector(".detail-card:nth-child(2) ul").innerHTML = data.history
                .map(h => `<li><span class="date">${h.date}</span><span class="event">${h.event}</span></li>`)
                .join("");

            // Show panel
            selectPrompt.classList.add("hidden");
            animalDetailsPanel.classList.remove("hidden");

            // Destroy existing chart if it exists
            if (vitalChart) vitalChart.destroy();

            // Create new chart
            const ctx = document.getElementById("vitalsChart").getContext("2d");
            vitalChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: data.chartData.labels,
                    datasets: [
                        {
                            label: "Temperature (°C)",
                            data: data.chartData.temp,
                            borderColor: "#4caf50",
                            fill: false,
                        },
                        {
                            label: "Heart Rate (BPM)",
                            data: data.chartData.heartRate,
                            borderColor: "#d32f2f",
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: false },
                    },
                },
            });
        });
    });

    // Medical Help - Tab Switching and Symptom Checker
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");

            // Remove active class from all tabs and panes
            tabButtons.forEach(btn => btn.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

            // Add active class to clicked tab and corresponding pane
            button.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        });
    });

    const analyzeSymptomsBtn = document.getElementById("analyze-symptoms");
    analyzeSymptomsBtn.addEventListener("click", () => {
        const symptoms = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
            .map(input => input.parentElement.textContent.trim());
        const animalType = document.getElementById("animal-type").value;
        const animalId = document.querySelector(".animal-selector input").value;

        let diagnosis = "Dummy Diagnosis: ";
        if (symptoms.length > 0) {
            diagnosis += `The ${animalType}${animalId ? ` (ID: ${animalId})` : ""} might have ${symptoms.join(" and ")}. Please consult a vet.`;
        } else {
            diagnosis += "No symptoms selected. Please select at least one symptom for analysis.";
        }
        alert(diagnosis);
    });

    // Tele-Vet Buttons
    document.querySelectorAll(".vet-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.querySelector("span").textContent;
            alert(`${type} will be implemented in the full version.`);
        });
    });

    // Emergency Options
    document.querySelectorAll(".emergency-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.querySelector("span").textContent;
            alert(`${action} initiated. Please wait for assistance.`);
        });
    });

    // Chatbot Functionality
    const chatInput = document.querySelector(".chat-input input");
    const sendBtn = document.querySelector(".send-btn");
    const chatMessages = document.querySelector(".chat-messages");

    const dummyResponses = [
        "I'm here to help! What can I do for you?",
        "Could you describe the symptoms your animal is showing?",
        "I recommend consulting a vet for a detailed checkup.",
        "Stay calm, help is on the way!",
    ];

    sendBtn.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement("div");
            userMessage.classList.add("message");
            userMessage.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">Now</div>
            `;
            chatMessages.appendChild(userMessage);

            // Add bot response
            const botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot");
            const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
            botMessage.innerHTML = `
                <div class="message-content">${randomResponse}</div>
                <div class="message-time">Now</div>
            `;
            chatMessages.appendChild(botMessage);

            // Clear input and scroll to bottom
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    // Resources - Tab Switching and Cart Functionality
    const resourceTabButtons = document.querySelectorAll(".resources-tabs .tab-btn");
    resourceTabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");

            resourceTabButtons.forEach(btn => btn.classList.remove("active"));
            document.querySelectorAll(".resources-tabs .tab-pane").forEach(pane => pane.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        });
    });

    let cart = [];
    const cartItems = document.querySelector(".cart-items");
    const cartTotals = document.querySelector(".cart-totals");
    const checkoutBtn = document.querySelector(".checkout-btn");

    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const productCard = btn.closest(".product-card");
            const name = productCard.querySelector("h4").textContent;
            const priceStr = productCard.querySelector(".price").textContent.split(" ")[0];
            const price = parseFloat(priceStr.replace("₹", ""));

            cart.push({ name, price });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = cart.length === 0
            ? '<p class="empty-cart">Your cart is empty</p>'
            : cart.map(item => `<p>${item.name} - ₹${item.price.toFixed(2)}</p>`).join("");

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotals.innerHTML = `<div class="total-row"><span>Total:</span><span>₹${total.toFixed(2)}</span></div>`;

        checkoutBtn.classList.toggle("disabled", cart.length === 0);
        checkoutBtn.addEventListener("click", () => {
            if (cart.length > 0) {
                alert("Proceeding to checkout with total: ₹" + total.toFixed(2));
            }
        });
    }

    // Training - Enroll Button
    document.querySelectorAll(".enroll-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const course = btn.closest(".course-card") ? btn.closest(".course-card").querySelector("h4").textContent : "Courses";
            alert(`You have enrolled in ${course || "the training program"}! This feature will be fully implemented later.`);
        });
    });

    // Government Schemes - Apply Button
    document.querySelectorAll(".apply-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const scheme = btn.closest(".scheme-card").querySelector("h4").textContent;
            alert(`Applying for ${scheme}. This feature will be implemented in the full version.`);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.split("/").pop() || "index.html";

    // Header Interactivity (All Pages)
    const emergencyBtn = document.getElementById("emergency-btn");
    const loginBtn = document.getElementById("login-btn");

    emergencyBtn.addEventListener("click", () => {
        alert("Emergency services are being contacted. Please wait for assistance.");
    });

    loginBtn.addEventListener("click", () => {
        alert("Login functionality will be implemented in the full version.");
    });

    // Page-Specific Logic
    if (path === "index.html") {
        // Dashboard
        const addAnimalBtn = document.getElementById("add-animal-btn");
        const scanTagBtn = document.getElementById("scan-tag-btn");
        const chatAiBtn = document.getElementById("chat-ai-btn");
        const viewAllAlertsBtn = document.querySelector(".stat-card .view-all-btn");

        addAnimalBtn.addEventListener("click", () => alert("Add Animal clicked."));
        scanTagBtn.addEventListener("click", () => alert("Scan Tag clicked."));
        chatAiBtn.addEventListener("click", () => window.location.href = "medical.html#chatbot");
        viewAllAlertsBtn.addEventListener("click", () => alert("View all alerts clicked."));
    }

    if (path === "monitoring.html") {
        // Health Monitoring
        const animalCards = document.querySelectorAll(".animal-card");
        const animalDetailsPanel = document.querySelector(".animal-details");
        const selectPrompt = document.querySelector(".select-prompt");
        let vitalChart = null;

        const dummyAnimalData = {
            "COW-001": {
                name: "Lakshmi",
                type: "Holstein Cow",
                gender: "Female",
                age: "4 years",
                tag: "IoT-34765",
                vitals: { temp: "38.6°C", heartRate: "72 BPM", activity: "Normal" },
                history: [
                    { date: "12 Feb 2025", event: "Vaccination - FMD" },
                    { date: "24 Jan 2025", event: "Deworming" },
                ],
                chartData: {
                    labels: ["00:00", "06:00", "12:00", "18:00", "23:59"],
                    temp: [37.5, 38.0, 38.6, 38.4, 38.6],
                    heartRate: [60, 65, 72, 70, 72],
                },
            },
            "GT-042": {
                name: "Ramu",
                type: "Black Bengal Goat",
                gender: "Male",
                age: "2 years",
                tag: "IoT-89234",
                vitals: { temp: "40.1°C", heartRate: "92 BPM", activity: "Lethargic" },
                history: [
                    { date: "15 Feb 2025", event: "Fever Treatment" },
                    { date: "01 Jan 2025", event: "Vaccination" },
                ],
                chartData: {
                    labels: ["00:00", "06:00", "12:00", "18:00", "23:59"],
                    temp: [39.0, 39.5, 40.1, 40.0, 40.1],
                    heartRate: [80, 85, 92, 90, 92],
                },
            },
        };

        animalCards.forEach(card => {
            card.addEventListener("click", () => {
                const animalId = card.querySelector("p").textContent.split("ID: ")[1];
                const data = dummyAnimalData[animalId];

                document.querySelector(".detail-header h3").textContent = data.name;
                document.querySelector(".detail-header p:nth-child(2)").textContent = `${data.type} • ${data.gender} • ${data.age}`;
                document.querySelector(".detail-header p:nth-child(3)").textContent = `ID: ${animalId} • Tag: ${data.tag}`;
                document.querySelector(".detail-card:nth-child(1) ul").innerHTML = `
                    <li><span>Temperature:</span> ${data.vitals.temp}</li>
                    <li><span>Heart Rate:</span> ${data.vitals.heartRate}</li>
                    <li><span>Activity Level:</span> ${data.vitals.activity}</li>
                `;
                document.querySelector(".detail-card:nth-child(2) ul").innerHTML = data.history
                    .map(h => `<li><span class="date">${h.date}</span><span class="event">${h.event}</span></li>`)
                    .join("");

                selectPrompt.classList.add("hidden");
                animalDetailsPanel.classList.remove("hidden");

                if (vitalChart) vitalChart.destroy();

                const ctx = document.getElementById("vitalsChart").getContext("2d");
                vitalChart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: data.chartData.labels,
                        datasets: [
                            { label: "Temperature (°C)", data: data.chartData.temp, borderColor: "#4caf50", fill: false },
                            { label: "Heart Rate (BPM)", data: data.chartData.heartRate, borderColor: "#d32f2f", fill: false },
                        ],
                    },
                    options: { responsive: true, scales: { y: { beginAtZero: false } } },
                });
            });
        });
    }

    if (path === "medical.html") {
        // Medical Help
        const tabButtons = document.querySelectorAll(".tab-btn");
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabId = button.getAttribute("data-tab");
                tabButtons.forEach(btn => btn.classList.remove("active"));
                document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
                button.classList.add("active");
                document.getElementById(tabId).classList.add("active");
            });
        });

        const analyzeSymptomsBtn = document.getElementById("analyze-symptoms");
        analyzeSymptomsBtn.addEventListener("click", () => {
            const symptoms = Array.from(document.querySelectorAll(".checkbox-group input:checked"))
                .map(input => input.parentElement.textContent.trim());
            const animalType = document.getElementById("animal-type").value;
            let diagnosis = "Dummy Diagnosis: ";
            diagnosis += symptoms.length > 0 ? `The ${animalType} might have ${symptoms.join(" and ")}. Consult a vet.` : "No symptoms selected.";
            alert(diagnosis);
        });

        const chatInput = document.querySelector(".chat-input input");
        const sendBtn = document.querySelector(".send-btn");
        const chatMessages = document.querySelector(".chat-messages");
        const dummyResponses = [
            "I'm here to help! What can I do for you?",
            "Could you describe the symptoms?",
            "I recommend consulting a vet.",
        ];

        sendBtn.addEventListener("click", () => {
            const message = chatInput.value.trim();
            if (message) {
                const userMessage = document.createElement("div");
                userMessage.classList.add("message");
                userMessage.innerHTML = `<div class="message-content">${message}</div><div class="message-time">Now</div>`;
                chatMessages.appendChild(userMessage);

                const botMessage = document.createElement("div");
                botMessage.classList.add("message", "bot");
                const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
                botMessage.innerHTML = `<div class="message-content">${randomResponse}</div><div class="message-time">Now</div>`;
                chatMessages.appendChild(botMessage);

                chatInput.value = "";
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }

    if (path === "resources.html") {
        // Resources
        const tabButtons = document.querySelectorAll(".resources-tabs .tab-btn");
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabId = button.getAttribute("data-tab");
                tabButtons.forEach(btn => btn.classList.remove("active"));
                document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
                button.classList.add("active");
                document.getElementById(tabId).classList.add("active");
            });
        });

        let cart = [];
        const cartItems = document.querySelector(".cart-items");
        const cartTotals = document.querySelector(".cart-totals");
        const checkoutBtn = document.querySelector(".checkout-btn");

        document.querySelectorAll(".add-to-cart").forEach(btn => {
            btn.addEventListener("click", () => {
                const productCard = btn.closest(".product-card");
                const name = productCard.querySelector("h4").textContent;
                const price = parseFloat(productCard.querySelector(".price").textContent.replace("₹", "").split(" ")[0]);
                cart.push({ name, price });
                updateCart();
            });
        });

        function updateCart() {
            cartItems.innerHTML = cart.length === 0
                ? '<p class="empty-cart">Your cart is empty</p>'
                : cart.map(item => `<p>${item.name} - ₹${item.price.toFixed(2)}</p>`).join("");
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotals.innerHTML = `<div class="total-row"><span>Total:</span><span>₹${total.toFixed(2)}</span></div>`;
            checkoutBtn.classList.toggle("disabled", cart.length === 0);
            checkoutBtn.addEventListener("click", () => {
                if (cart.length > 0) alert(`Proceeding to checkout with total: ₹${total.toFixed(2)}`);
            });
        }
    }

    if (path === "training.html") {
        // Training
        document.querySelectorAll(".enroll-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const course = btn.closest(".course-card") ? btn.closest(".course-card").querySelector("h4").textContent : "Courses";
                alert(`You have enrolled in ${course}!`);
            });
        });
    }

    if (path === "schemes.html") {
        // Government Schemes
        document.querySelectorAll(".apply-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const scheme = btn.closest(".scheme-card").querySelector("h4").textContent;
                alert(`Applying for ${scheme}.`);
            });
        });
    }
});