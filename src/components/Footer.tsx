import type { FC } from 'react';

const Footer: FC = () => (
  <footer className="footer">
    <span>&copy; {new Date().getFullYear()} CodeBlackwell. All rights reserved.</span>
  </footer>
);

export default Footer;
