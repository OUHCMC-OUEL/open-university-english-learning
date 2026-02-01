import { useState } from 'react';
import FixMenu, { Options, AIOptions } from "../../components/WritingApp/FixMenu";
import { Alert, Modal } from 'antd';
import InputText from '../../components/WritingApp/InputText';
import useUndoRedo from '../../hooks/WritingApp/useUndoRedo';
import warning from 'antd/es/_util/warning';

function WritingApp() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null)
  const [currentOption, setCurrentOption] = useState("review");
  const [childOption, setChildOption] = useState("correctness");

  const {present, set, undo, redo, canUndo, canRedo } = useUndoRedo("");

  const handleUpdate = (issue) => {
    Modal.confirm({
      title: "Áp dụng chỉnh sửa?",
      content: "Nội dung sẽ được cập nhật",
      onOk: () => {
        set(
          present.slice(0, issue.start) +
          issue.fix +
          present.slice(issue.end)
        );

        handleDismiss(issue.id);
      }
    });
  };

  const handleDismiss = (issueId) => {
    setData(prev => {
      const section = prev[childOption];

      return {
        ...prev,
        [childOption]: {
          ...section,
          issues: section.issues.filter(i => i.id !== issueId)
        }
      };
    });
  };

  const handleApply = (result) => {
    if (!result) return;
  
    if (result === present) {
      Modal.info({
        title: "Thông báo",
        content: "Gợi ý này giống với nội dung hiện tại.",
        closable: true
      })
      return
    }
    Modal.confirm({
        title: "Cảnh báo",
        content: "Nội dung sẽ được thay đổi theo gợi ý.",
        okText: "Áp dụng",
        cancelText: "Huỷ",
        onOk : ()=> {
          set(result)
          setData(prev => {
            if (!prev || !prev[childOption]) return prev;
            return {
              ...prev,
              [childOption]: {
                ...prev[childOption],
                issues: []
              }
            };
          });
        }
      })
  }
  return (
    <div className="w-full py-8">
      <h3 className="text-center py-8 text-2xl font-bold text-gray-800">
        ENHANCE YOUR WRITING SKILL
      </h3>
      
      <div className="mx-auto px-5">
        <div className="flex gap-6">

          {/* PHẦN VIẾT */}
          <div className="flex-[7]">
            <InputText 
              setData={setData}
              setLoading={setLoading} 
              loading={loading}
              present={present}
              set={set}
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          </div>

          {/* PHẦN SỬA LỖI */}
          <div className="flex-[3] border-l border-gray-300 pl-6">
          <Options onChange={setCurrentOption} />

          {/* REVIEW */}
          {currentOption === "review" && (
            <>
              {data?.error ? (
                <Alert
                  title="Lỗi"
                  description={data?.error}
                  type="error"
                  showIcon
                />
              ) : (
                <FixMenu
                  data={data}
                  activeTab={childOption}
                  onChange={setChildOption}
                  loading={loading}
                  onUpdate={handleUpdate}
                  onDismiss={handleDismiss}
                  onApply={handleApply}
                />
              )}
            </>
          )}

          {/* AI */}
          {currentOption === "ai" && (
            <AIOptions />
          )}

        </div>
        </div>
      </div>
    </div>
)
}

export default WritingApp;