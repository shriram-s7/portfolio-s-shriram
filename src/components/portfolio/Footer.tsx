const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        {/* Changed justify-between to justify-center to center the copyright text */}
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} S Shriram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;