'use client';

import './TestClient.scss';

export interface TestClientProps {
    text: string;
    handleClick: () => void;
}

export default function TestClient({ text, handleClick }: TestClientProps) {    
    return (
        <div className='client'>
            <h1>{text}</h1>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}
