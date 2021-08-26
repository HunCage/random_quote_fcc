import React, { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import "./App.css";
import COLOR_ARRAY from "./colors.js";

const API =
	"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
	
	const [quote, setQuote] = useState("Click for Quote");
	const [randomNumber, setRandomNumber] = useState(0);
	
	const [author, setAuthor] = useState("nobody");
	const [quotesArray, setQuotesArray] = useState(null);
	
	const [currentColor, setCurrentColor] = useState("#BBBB1A");
	
	const fetchQuote = async (url) => {
		
		const res = await fetch(url);
		const parsedQuotes = await res.json();
		setQuotesArray(parsedQuotes.quotes);
	};
	
	useEffect(() => {
		fetchQuote(API);
	}, [API]);
	
	const generateQuotes = () => {
		let randomNum = Math.floor(Math.random() * quotesArray.length);
		setRandomNumber(randomNum);
		setCurrentColor(COLOR_ARRAY[randomNum]);
		setQuote(quotesArray[randomNum].quote);
		setAuthor(quotesArray[randomNum].author);
	};

	return (
		<main style={{ backgroundColor: currentColor, color: currentColor }}>
			<div id="quote-box">
				<Quote quote={quote} author={author} />
			</div>
		</main>
	);

	function Quote() {
		return (
			<div>
				<q id="text">{quote}</q>
				<hr />
				<p id="author"> - {author}</p>
				<ChangeQuoteBtn />
			</div>
		);
	}

	function ChangeQuoteBtn() {
		return (
			<div className="btns">
				<a
					id="tweet-quote"
					href={encodeURI(
						`https://www.twitter.com/intent/tweet?text=${quote} \n\n\t - ${author}`
					)}
					target="_top"
					title="Tweet quote"
				>
					<FaTwitter />
				</a>
				<button
					onClick={() => generateQuotes()}
					id="new-quote"
					type="button"
					style={{ backgroundColor: currentColor, color: "#242424" }}
				>
					Get Quote
				</button>
			</div>
		);
	}
}
export default App;
