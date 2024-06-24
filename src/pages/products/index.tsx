/** @format */

import { ProductModel } from '@/models/ProductModel';
import { Button, Image, message, Modal, Space, Table, Tooltip } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { ProductAPI } from '../api/productAPI';
import { BiTrash } from 'react-icons/bi';
import Link from 'next/link';

const { confirm } = Modal;

const Products = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<ProductModel[]>([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		const api = `/all`;
		try {
			const res = await ProductAPI(api);
			if (res && res.data) {
				setProducts(res.data);
			}

			setIsLoading(false);
		} catch (error: any) {
			message.error(error.message);
			setIsLoading(false);
		}
	};

	const handleRemoveProduct = async (id: string) => {
		const api = `/remove?id=${id}`;
		try {
			await ProductAPI(api, undefined, 'delete');
			await getProducts();

			message.success('Remove product done');
		} catch (error: any) {
			console.log(error);
			message.error(error.message);
		}
	};

	const columns: ColumnProps<ProductModel>[] = [
		{
			key: 'img',
			dataIndex: 'img',
			render: (url: string) => <Image src={url} style={{ width: 120 }} />,
		},
		{
			key: 'title',
			dataIndex: 'title',
			title: 'Title',
		},
		{
			key: 'price',
			dataIndex: 'price',
			title: 'Price',
			align: 'right',
		},
		{
			key: 'btn',
			dataIndex: '',
			align: 'right',
			render: (item: ProductModel) => (
				<Space>
					<Tooltip title='Remove item'>
						<Button
							onClick={() =>
								confirm({
									title: 'Remove',
									content: 'Bạn muốn xoá sản phẩm này?',
									onOk: () => handleRemoveProduct(item._id),
									okText: 'Xoá',
								})
							}
							icon={<BiTrash color={'red'} size={20} />}
							type='text'
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div>
			<>
				<div className='col text-right mb-3'>
					<Link href={'/products/add-new'} className='btn btn-sm btn-success'>
						Add new
					</Link>
				</div>
			</>
			<Table loading={isLoading} dataSource={products} columns={columns} />
		</div>
	);
};

export default Products;
