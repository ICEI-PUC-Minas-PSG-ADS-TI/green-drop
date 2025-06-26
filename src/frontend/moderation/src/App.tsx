import './global.css';
import { ThemeProvider } from './components/theme/theme-provider';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

function App() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='greendrop-theme'>
			<Toaster richColors />
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
