// src/pages/NotebookCreateModal.jsx
import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { saveNotebook } from '../services/notebooksService';

const NotebookCreateModal = ({ visible, onClose, namespace, onCreated }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        // 构造提交数据，默认端口和资源配置，可根据需要扩展表单字段
        const payload = {
            image: values.image,
            name: values.name,
            ports: [
                {
                    containerPort: 8888,
                    name: 'notebook-port',
                    protocol: 'TCP'
                }
            ],
            resources: {
                limits: {
                    cpu: values.cpu || "1",
                    memory: values.memory || "2Gi"
                },
                requests: {
                    cpu: values.requestCpu || "10m",
                    memory: values.requestMemory || "100Mi"
                }
            }
        };

        try {
            await saveNotebook(namespace, payload);
            message.success('Notebook 创建成功');
            form.resetFields();
            onCreated && onCreated(); // 通知父组件刷新列表
            onClose();
        } catch (error) {
            message.error(error.response?.data?.message || '创建失败');
        }
    };

    return (
        <Modal
            title="创建 Notebook"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请输入名称' }]}
                >
                    <Input placeholder="请输入 Notebook 名称" />
                </Form.Item>
                <Form.Item
                    label="镜像"
                    name="image"
                    rules={[{ required: true, message: '请输入镜像地址' }]}
                >
                    <Input placeholder="请输入镜像地址" />
                </Form.Item>
                <Form.Item label="CPU 限制" name="cpu">
                    <Input placeholder="默认为 1" />
                </Form.Item>
                <Form.Item label="内存限制" name="memory">
                    <Input placeholder="默认为 2Gi" />
                </Form.Item>
                <Form.Item label="CPU 请求" name="requestCpu">
                    <Input placeholder="默认为 10m" />
                </Form.Item>
                <Form.Item label="内存请求" name="requestMemory">
                    <Input placeholder="默认为 100Mi" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NotebookCreateModal;