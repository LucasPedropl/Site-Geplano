import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
	title: 'Geplano - Gestão e Consultoria de Obras',
	description: 'Gerenciamos obras de alto padrão com excelência construtiva.',
	icons: {
 		icon: '/site-icon.png',
 		shortcut: '/site-icon.png',
 		apple: '/site-icon.png',
 	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${montserrat.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
