import { Button, Card, Tag } from "antd";

const ErrorItem = ({ data, activeTab, loading, onUpdate, onDismiss }) => {
  const section = data?.[activeTab];
  const issues = section?.issues || [];

  if (issues.length === 0) {
    return <p className="text-sm text-gray-600">Hiện tại không có lỗi</p>
  }

  return (
    <>
      {issues.map(issue => (
        <Card key={issue.id} className="mb-3">
          <p className="font-medium">{issue.message}</p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Tag color="red">{issue.original}</Tag>
            <span>→</span>
            <Tag color="green">{issue.fix}</Tag>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <Button
              loading = {loading}
              size="small"
              type="primary"
              onClick={() => onUpdate(issue)}
            >
              Update
            </Button>

            <Button
              loading = {loading}
              size="small"
              danger
              onClick={() => onDismiss(issue.id)}
            >
              Dismiss
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ErrorItem