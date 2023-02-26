function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="w-full flex items-center justify-center bg-zinc-600 mt-6">
            <p className="text-lg text-white my-5">© {year} All Rights Reserved</p>
        </footer>
    );
}

export default Footer;
