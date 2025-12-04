

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-blac py-4 text-center z-50">
      <p className="text-sm">
        © {new Date().getFullYear()} Your Website — All rights reserved.
      </p>
    </footer>
  );
}
