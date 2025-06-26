import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { CircleCheck, X } from 'lucide-react';
import { signIn } from '../../api/sign-in';

const signInFormSchema = z.object({
	email: z
		.string()
		.email({ message: 'E-mail inválido' })
		.transform((email) => email.toLowerCase()),
	password: z
		.string()
		.min(6, { message: 'Senha precisa ter no mínimo 6 caracteres' }),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const {
		handleSubmit,
		register,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	});

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	});

	async function handleSignIn(data: SignInForm) {
		try {
			const { token, refreshToken } = await authenticate({
				email: data.email,
				password: data.password
			});

			localStorage.setItem('token', token);
			localStorage.setItem('refreshToken', refreshToken);

			navigate('/dashboard');
			toast.success('Login realizado com sucesso!');
		} catch (error) {
			toast.error('Credenciais inválidas!');
			console.error('Erro detalhado:', error);
		}
	}

	return (
		<>
			<title>Login | green.drop</title>
			<div className='p-8'>
				<div className='flex flex-col justify-center gap-6 w-full max-w-[400px]'>
					<div className='flex flex-col gap-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Acessar Painel
						</h1>
						<p className='text-muted-foreground text-sm'>
							Tela de moderação para gerenciar aplicação greenDrop 🤰
						</p>
					</div>
					<form className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
						<div className='space-y-4'>
							<div>
								<div className='space-y-2'>
									<Label htmlFor='email'>Seu e-mail</Label>
									<div className='flex items-center gap-2'>
										<Input
											id='email'
											type='email'
											{...register('email')}
											autoComplete='email'
										/>
										{watch('email') ? (
											errors.email ? (
												<X className='text-destructive stroke-2' />
											) : (
												<CircleCheck className='text-primary stroke-2' />
											)
										) : (
											<div className='w-6' />
										)}
									</div>
								</div>
								{errors.email ? (
									<p className='mt-2 text-sm text-destructive'>
										{errors.email.message}
									</p>
								) : (
									<p className='mt-2 text-sm text-muted-foreground'>
										digite seu e-mail
									</p>
								)}
							</div>
							<div>
								<div className='space-y-2'>
									<Label htmlFor='password'>Senha</Label>
									<div className='flex items-center gap-2'>
										<Input
											id='password'
											type='password'
											{...register('password')}
											autoComplete='current-password'
										/>
										{watch('password') ? (
											errors.password ? (
												<X className='text-destructive stroke-2' />
											) : (
												<CircleCheck className='text-primary stroke-2' />
											)
										) : (
											<div className='w-6' />
										)}
									</div>
								</div>
								{errors.password ? (
									<p className='mt-2 text-sm text-destructive'>
										{errors.password.message}
									</p>
								) : (
									<p className='mt-2 text-sm text-muted-foreground'>
										digite sua senha
									</p>
								)}
							</div>
						</div>
						<Button
							type='submit'
							className='cursor-pointer text-foreground w-[92.5%]'
							disabled={isSubmitting}>
							{isSubmitting ? 'Entrando...' : 'Acessar painel'}
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
