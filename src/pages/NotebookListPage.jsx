// src/pages/NotebookListPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Table, Select, Button, message } from 'antd';
import { getNotebooks, getWorkspaces, startNotebook, stopNotebook } from '../services/notebooksService';
import NotebookCreateModal from './NotebookCreateModal';
import config from '../config/default.json';
import { AuthContext } from '../AuthContext'; // 确保路径正确

const { Content, Sider } = Layout;
const { Option } = Select;

const NotebookListPage = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const [workspace, setWorkspace] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const [notebooks, setNotebooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const fetchWorkspaces = async () => {
        try {
            const data = await getWorkspaces();
            setWorkspaces(data);
            // If workspaces exist, set the first one as default
            if (data && data.length > 0) {
                setWorkspace(data[0].name);
            }
        } catch (error) {
            message.error('获取工作空间失败');
        }
    };

    const fetchNotebooks = async (ws) => {
        setLoading(true);
        try {
            const data = await getNotebooks(ws);
            setNotebooks(data);
        } catch (error) {
            message.error(error.response?.data?.message || '获取数据失败');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchWorkspaces();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (workspaces.length > 0) {
            fetchNotebooks(workspace);
        }
    }, [workspace, workspaces]);

    const handleWorkspaceChange = (value) => {
        setWorkspace(value);
    };

    const handleCreate = () => {
        setCreateModalVisible(true);
    };

    const handleStartNotebook = async (namespace, name) => {
        try {
            await startNotebook(namespace, name);
            message.success('启动成功');
            fetchNotebooks(workspace);
        } catch (error) {
            message.error('启动失败');
        }
    };

    const handleStopNotebook = async (namespace, name) => {
        try {
            await stopNotebook(namespace, name);
            message.success('关闭成功');
            fetchNotebooks(workspace);
        } catch (error) {
            message.error('关闭失败');
        }
    };

    // 根据返回数据计算状态
    // 若 metadata.annotations 中包含 "kubeflow-resource-stopped" 字段，则状态为 stopped；
    // 否则若 status.readyReplicas 存在且等于 1，则状态为 running，否则为 pending
    const computeStatus = (record) => {
        if (
            record.metadata.annotations &&
            record.metadata.annotations["kubeflow-resource-stopped"]
        ) {
            return 'stopped';
        }
        if (record.status && record.status.readyReplicas === 1) {
            return 'running';
        }
        return 'pending';
    };

    // 表格列配置
    const columns = [
        {
            title: '名称',
            dataIndex: 'metadata',
            key: 'name',
            render: (metadata) => metadata.name,
        },
        {
            title: '创建时间',
            dataIndex: 'metadata',
            key: 'creationTimestamp',
            render: (metadata) => new Date(metadata.creationTimestamp).toLocaleString(),
        },
        {
            title: '状态',
            key: 'status',
            render: (_, record) => computeStatus(record),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                const status = computeStatus(record);
                const notebookName = record.metadata.name;
                const ns = record.metadata.namespace;
                // 拼接打开链接：{backend}/notebooks/{namespace}/{name}
                const openLink = `${config.backend}/notebooks/${ns}/${notebookName}`;
                if (status === 'running') {
                    return (
                        <>
                            <Button type="link" onClick={() => window.open(openLink, '_blank')}>
                                打开
                            </Button>
                            <Button type="link" onClick={() => handleStopNotebook(ns, notebookName)}>
                                关闭
                            </Button>
                        </>
                    );
                }
                if (status === 'stopped') {
                    return (
                        <Button 
                            type="link" 
                            onClick={() => handleStartNotebook(ns, notebookName)}
                        >
                            启动
                        </Button>
                    );
                }
                return null;
            },
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 顶部导航栏 */}
            <Layout>
                {/* 左侧菜单栏 */}
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['notebooks']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="notebooks">Notebooks</Menu.Item>
                    </Menu>
                </Sider>
                {/* 内容区域 */}
                <Layout style={{ padding: '20px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: 10 }}>选择工作空间:</span>
                            <Select
                                value={workspace}
                                style={{ width: 200 }}
                                onChange={handleWorkspaceChange}
                            >
                                {workspaces.map(ws => (
                                    <Option key={ws.id} value={ws.name}>{ws.name}</Option>
                                ))}
                            </Select>
                            <Button type="primary" style={{ marginLeft: 20 }} onClick={handleCreate}>
                                创建
                            </Button>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={notebooks}
                            loading={loading}
                            rowKey={(record) => record.metadata.uid}
                        />
                    </Content>
                </Layout>
            </Layout>
            <NotebookCreateModal
                visible={createModalVisible}
                onClose={() => setCreateModalVisible(false)}
                workspace={workspace}
                onCreated={() => fetchNotebooks(workspace)}
            />
        </Layout>
    );
};

export default NotebookListPage;