// Import Hooks
import { useState, useEffect } from "react";

function App() {
	const [advice, setAdvice] = useState("");
	const [copyAdvice, setCopyAdvice] = useState("");

	useEffect(function () {
		async function fetchAdvice() {
			try {
				const res = await fetch("https://api.adviceslip.com/advice");
				const data = await res.json();
				setAdvice(data.slip);
			} catch (err) {
				alert("Something went wrong while fetching advice");
			}
		}
		fetchAdvice();
	}, []);

	function newAdvice() {
		async function fetchAdvice() {
			try {
				const res = await fetch("https://api.adviceslip.com/advice");
				const data = await res.json();
				setAdvice(data.slip);
			} catch (err) {
				alert("Something went wrong");
			}
		}
		fetchAdvice();
	}

	function copyToClipboard() {
		const textToCopy = advice.advice;

		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setCopyAdvice("Advice has been copied!");
				setTimeout(() => {
					setCopyAdvice("");
				}, 3000);
			})
			.catch(err => {
				console.error("Unable to copy text to clipboard", err);
			});
	}

	return (
		<div className="App">
			{copyAdvice && <p className="copy-advice">{copyAdvice}</p>}
			<div className="wrapper">
				<h1>Advice App</h1>
				<div className="card">
					<p className="number">Advice: #{advice.id}</p>
					<h3 className="advice">{advice.advice}</h3>
					<div className="btn-wrapper">
						<button onClick={newAdvice}>Get new advice</button>
						<button onClick={copyToClipboard}>Copy advice</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
