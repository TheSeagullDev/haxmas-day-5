const form = document.getElementById("giftForm");
const giftsContainer = document.getElementById("gifts");

async function loadGifts() {
	const response = await fetch("/gifts");
	const gifts = await response.json();

	giftsContainer.innerHTML = "";

	gifts.forEach(gift => {
		const item = document.createElement("p");
		item.classList.add("text-lg", "bg-blue-400", "p-4", "m-2", "text-blue-50", "hover:scale-110", "transition", "rounded-md")
		item.textContent = `Gift for ${gift.name}: ${gift.gift}`;
		giftsContainer.appendChild(item);
	});
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.elements.name.value;
	const gift = form.elements.gift.value;

	await fetch("/gifts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ name, gift})
	});

	form.reset();
	await loadGifts();
});

loadGifts();