import './App.css';

import { Counter } from 'context/counter/Counter';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Counter />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
			</header>
		</div>
	);
}

export default App;
