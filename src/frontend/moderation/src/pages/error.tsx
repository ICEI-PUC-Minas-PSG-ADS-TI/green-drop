import { Link, useRouteError } from 'react-router';

export function Error() {
	const error = useRouteError() as Error;
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-2'>
			<h1 className='text-4xl font-bold'>Whoops, algo deu errado...</h1>
			<p className='text-accent-foreground'>
				Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:
			</p>
			<pre>{error?.message || JSON.stringify(error)}</pre>
			<p className='text-accent-foreground'>
				voltar para o{' '}
				<Link to='/' className='text-primary dark:text-primary'>
					Home
				</Link>
			</p>
		</div>
	);
}
