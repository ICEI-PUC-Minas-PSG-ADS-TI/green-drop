import { ClipboardList, LogOut, User } from 'lucide-react';
import { Separator } from '../ui/separator';

import { Themetoggle } from '../theme/theme-toggle';
import { NavLink } from './nav-link';
import miniLogo from '../../assets/mini-log.png';

export function Header() {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center gap-6 px-6'>
				<img src={miniLogo} className='h-6 w-6' alt='' />
				<Separator orientation='vertical' className='h-6' />
				<nav className='flex items-center space-x-4 lg:space-x-6'>
					<NavLink to='/dashboard'>
						<ClipboardList className='h-4 w-4' />
						Reportes
					</NavLink>
					<NavLink to='orders'>
						<User className='h-4 w-4' />
						Usuarios
					</NavLink><NavLink to='/'>
						<LogOut className='h-4 w-4' />
						Logout
					</NavLink>
				</nav>
				<div className='ml-auto flex items-center gap-2'>
					<Themetoggle />
				</div>
			</div>
		</div>
	);
}
