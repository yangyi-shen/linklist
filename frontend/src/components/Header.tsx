import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    function handleLogoClick() {
        navigate('/');
    }

    function handlePersonalClick() {
        navigate('/personal');
    }

    function handleSettingsClick() {
        navigate('/settings');
    }

    return (
        <header className="py-4 border-b-1 border-slate-200 flex justify-center">
            <div className="w-3xl flex justify-between">
                <button className="text-xl font-bold" onClick={handleLogoClick}>
                    <span>link</span>
                    <span className="text-slate-500">list</span>
                </button>
                <div className="flex gap-2">
                    <button className="text-slate-500" onClick={handlePersonalClick}>
                        <i className="fa-solid fa-user fa-md"></i>
                    </button>
                    <button className="text-slate-500" onClick={handleSettingsClick}>
                        <i className="fa-solid fa-gear fa-md"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;