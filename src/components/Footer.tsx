import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ textAlign: 'center', padding: 16, borderTop: '1px solid #333', marginTop: 32 }}>
    <span>9 {new Date().getFullYear()} CodeBlackwell. All rights reserved.</span>
  </footer>
);

export default Footer;
