import Calculator from './components/Calculator';

function App() {
  return (
    <>
      <header>
        <h1 className="text-2xl">Breadulator</h1>
        <p>Easily convert to and from baker's percentages.</p>
        <p>Scale recipes up and down with a click.</p>
        <p>Make delicious bread.</p>
        <p>Win friends and conquer your enemies.</p>
      </header>
      <main>
        <Calculator />
      </main>
      <footer className="text-center">
        <p>&copy; Mike Bowman - 2022</p>
      </footer>
    </>
  );
}

export default App;
