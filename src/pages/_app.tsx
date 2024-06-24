/** @format */

import SiderComponen from '@/components/SiderComponen';
import { Layout } from 'antd';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const { Header, Sider, Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Header></Header>
			<Layout>
				<SiderComponen />
				<Content>
					<div className='container mt-4  p-2'>
						<Component {...pageProps} />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}
