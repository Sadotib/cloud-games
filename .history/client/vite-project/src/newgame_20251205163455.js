export function startNewGame(element) {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", async () => {
        console.log("Starting game...");

        try {
            const response = await fetch("http://localhost:8080/game/create", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("Game created:", data);

            alert(`Game created with ID: ${data.gameId}`);
        } catch (error) {
            console.error("Error creating game:", error);
        }
    });

}

