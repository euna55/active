import type { ReactNode } from 'react';
import './PhoneFrame.css';

interface Props {
  children: ReactNode;
}

export default function PhoneFrame({ children }: Props) {
  return (
    <div className="phone-frame">
      <div className="phone-scroll">{children}</div>
    </div>
  );
}
