import Calculator from './components/Calculator';

function App() {
  return (
    <>
      <header>
        <h1 className="text-2xl">Let's Breadulate</h1>
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
        <p className="">
          Find me at{' '}
          <a href="https://mikebowman.dev" className="text-blue-800">
            https://mikebowman.dev
          </a>
          !
        </p>
      </footer>
    </>
  );
}

export default App;
