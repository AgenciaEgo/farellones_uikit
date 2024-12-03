import './TestServer.scss';

export interface TestServerProps {
    text: string;
}

export default function TestServer({ text }: TestServerProps) {
    console.log('TestServer');
    return <h1 className='server'>{text}</h1>;
}
