import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

const Layout: React.FC = () => {
    return (
        <div className='text-slate-950 bg-slate-50 min-h-screen min-w-screen'>
            <Header />
            <div className='flex justify-center px-4'>
                <div className='w-3xl py-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;