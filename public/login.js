const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(loginForm);
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		const response = await fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			// throw new Error("Ошибка при входе: " + response.statusText);
			console.log(
				"Ошибка при входе: " + response.statusText
			);
			loginForm.reset();
		}

		if (response.redirected) {
			window.location.href = response.url;
		}
	} catch (error) {
		console.error("Произошла ошибка при запросе на сервер:", error.message);
	}
});
