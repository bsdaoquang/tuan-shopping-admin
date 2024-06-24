/** @format */

import { Button, Card, Form, Input, Select, Space, message, Image } from 'antd';
import React, { useRef, useState } from 'react';
import { ProductAPI } from '../api/productAPI';

const AddNewProduct = () => {
	const [files, setFiles] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);

	const [form] = Form.useForm();

	const handleAddNewProduct = async (values: any) => {
		const data = { ...values };
		const api = `/add`;
		if (files) {
		}

		try {
			await ProductAPI(api, data, 'post');

			setIsLoading(false);
			message.success('Add new product done!!!!');
			form.resetFields();
			window.history.back();
		} catch (error: any) {
			console.log(error);
			message.error(error.message);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className='col-8 offset-2'>
				<Card title='Add new product'>
					<div className='mb-4'>
						{files && (
							<Image
								className='mb-2'
								src={URL.createObjectURL(files[0])}
								style={{
									width: 150,
									height: 100,
								}}
							/>
						)}

						<Input
							type='file'
							accept='image/*'
							onChange={(val) => setFiles(val.target.files)}
						/>
					</div>
					<Form
						disabled={isLoading}
						form={form}
						size='large'
						layout='vertical'
						onFinish={handleAddNewProduct}>
						<Form.Item
							name={'title'}
							rules={[
								{
									required: true,
									message: 'What is title?',
								},
							]}>
							<Input placeholder='Title' allowClear />
						</Form.Item>
						<Form.Item name={'description'}>
							<Input.TextArea
								rows={3}
								placeholder='Content'
								allowClear
								maxLength={150}
								showCount
							/>
						</Form.Item>
						<Form.Item name={'price'}>
							<Input placeholder='Price' allowClear type='number' />
						</Form.Item>
						<Form.Item name={'sizes'}>
							<Select
								placeholder='Sizes'
								allowClear
								mode='multiple'
								options={[
									{
										label: 'S',
										value: 'S',
									},
									{
										label: 'M',
										value: 'M',
									},
									{
										label: 'L',
										value: 'L',
									},
									{
										label: 'X',
										value: 'X',
									},
									{
										label: 'XL',
										value: 'XL',
									},
									{
										label: 'XXL',
										value: 'XXL',
									},
									{
										label: 'XXXL',
										value: 'XXXL',
									},
								]}
							/>
						</Form.Item>
						<Form.Item name={'quantity'}>
							<Input placeholder='0' allowClear type='number' />
						</Form.Item>
					</Form>
					<div className='text-right mt-4 '>
						<Space>
							<Button
								disabled={isLoading}
								type='primary'
								ghost
								onClick={() => form.resetFields()}>
								Reset Fields
							</Button>
							<Button
								disabled={isLoading}
								type='primary'
								style={{
									padding: '10px 40px',
								}}
								onClick={() => form.submit()}>
								Publish
							</Button>
						</Space>
					</div>
				</Card>
			</div>

			{/* <div className='d-none'>
				<input type='file' name='' id='inpFile' />
			</div> */}
		</div>
	);
};

export default AddNewProduct;
