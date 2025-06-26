import { Link } from 'react-router';

export function NotFound() {
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-2'>
			<h1 className='text-4xl font-bold'>Página não encontrada</h1>
			<p className='text-accent-foreground'>
				voltar para o{' '}
				<Link to='/' className='text-primary dark:text-primary'>
					Home
				</Link>
			</p>
		</div>
	);
}
