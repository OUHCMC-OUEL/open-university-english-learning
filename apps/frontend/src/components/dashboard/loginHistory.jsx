export default function LoginHistoryTable({ history }) {
  if (!history || history.length === 0) return <p className="text-gray-500">Chưa có lịch sử đăng nhập.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-4 font-medium">Thời gian</th>
            <th className="px-6 py-4 font-medium">Mô tả</th>
            <th className="px-6 py-4 font-medium">IP Address</th>
            <th className="px-6 py-4 font-medium">Thiết bị</th> 
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {history.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{new Date(item.login_date).toLocaleString('vi-VN')}</td>
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4">{item.ip_address || "N/A"}</td>
              <td className="px-6 py-4">{item.user_agent || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}