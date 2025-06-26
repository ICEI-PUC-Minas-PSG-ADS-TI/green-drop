import { Outlet } from 'react-router';
import Logo from '../../assets/logo.png';
export function AuthLayout() {
	return (
		<div className='grid min-h-screen grid-cols-2 antialiased'>
			<div className='border-foreground/5 border-foi bg-muted text-muted-foreground flex h-full flex-col justify-between p-10'>
				<div className='flex items-center justify-center'>
					<img src={Logo} alt='' className='w-180 h-180' />
				</div>
				<footer className='text-sm'>
					Paineldo &copy; GreenDrop moderate - {new Date().getFullYear()}
				</footer>
			</div>
			<div className='relative flex flex-col items-center justify-center'>
				<Outlet />
			</div>
		</div>
	);
}
