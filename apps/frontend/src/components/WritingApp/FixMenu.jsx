import React, { useState } from 'react'
import { Button, Card, Empty, Menu, Spin, Tabs } from 'antd';
import {CheckCircleOutlined, RobotOutlined,
    EditOutlined, BulbOutlined, SmileOutlined, SendOutlined, FileSearchOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import ErrorItem from './ErrorItem';

function FixMenu({data, activeTab, onChange, loading, onUpdate, onDismiss, onApply}) {

  function ReviewPanel({ section }) {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Spin indicator={<LoadingOutlined spin />} />
            </div>
        );
    }

    if (!section) {
        return (
            <Empty description="Nhập nội dung để bắt đầu kiểm tra" />
        );
    }

    const { result, explanation, issues } = section;
    return (
        <div className="flex flex-col gap-4">
            {/* RESULT */}
            <Card>
            <h4 className="font-semibold text-sm mb-2">
                Correct result
            </h4>
            <div className="text-gray-700">
                {result || "Không có kết quả"}
            </div>
            <Button
                type="primary"
                className='m-3 float-end'
                loading={loading}
                disabled={!result || (issues && issues.length === 0)}
                onClick = {()=>{onApply(result)}}
            >
                Áp dụng
            </Button>
            </Card>

            {/* EXPLANATION */}
            <Card>
            <h4 className="font-semibold text-sm mb-2">
                Explanation
            </h4>
            <div className="text-gray-600">
                {explanation ? explanation : "Không có giải thích"}
            </div>
            </Card>

            {/* ISSUES */}
            <Card>
            <h4 className="font-semibold text-sm mb-2">
                Issues
            </h4>

            <ErrorItem
                data={data}
                activeTab={activeTab}
                loading={loading}
                onUpdate={onUpdate}
                onDismiss={onDismiss}
            />
            </Card>
        </div>
        );
  }

  const items = [
    {
      key: "correctness",
      label: (<span><CheckCircleOutlined /> Correctness </span>),
      children: <ReviewPanel section={data?.correctness} />
    },
    {
      key: "clarity",
      label: (<span><BulbOutlined /> Clarity </span>),
      children: <ReviewPanel section={data?.clarity} />
    },
    {
      key: "engagement",
      label: (<span><SmileOutlined /> Engagement </span>),
      children: <ReviewPanel section={data?.engagement} />
    },
    {
      key: "delivery",
      label: (<span><SendOutlined /> Delivery </span>),
      children: <ReviewPanel section={data?.delivery} />
    }
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={onChange}
      items={items}
    />
  );
}

const optionItem = [
        {
            label: 'Review suggestions',
            key: 'review',
            icon: <FileSearchOutlined />,
        },
        {
            label: 'Write with generative AI',
            key: 'ai',
            icon: <RobotOutlined />,
        },
    ];

    const Options = ({ onChange }) => {
        const onClick = (e) => {
            onChange(e.key);
        };

        return (
            <div className="bg-white px-4 py-2 mb-4">
                <Menu
                    onClick={onClick}
                    defaultSelectedKeys={['review']}
                    mode="horizontal"
                    items={optionItem}
                />
            </div>
        );
    };
    const optionAIItem = [
        { key: '1', icon: <EditOutlined />, label: 'Improve', children: 'Improve' },
        { key: '2', icon: <BulbOutlined />, label: 'More ideas', children: 'More ideas' },
    ];

    const AIOptions = () => {
        return (
            <div className="p-4 mt-4">
                <Tabs
                    items={optionAIItem}
                />
                <Button type="primary" className="w-full mt-4 rounded-lg h-10 font-semibold" >Start</Button>
            </div>
        );
    };

export default FixMenu
export { AIOptions, Options };