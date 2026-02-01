import { Input, Button } from 'antd'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
import {handleSubmitWriting} from "../../services/WritingApp/serviceGetResult"
const { TextArea } = Input
const MAX_LENGTH = 10000

function InputText({ setData, setLoading, loading, set, present, undo, redo, canRedo, canUndo}) {
    const handleSubmit = async() => {
        try{
            setLoading(true)
            setData("")
            
            const res = await handleSubmitWriting(present) 
            setData(res)
        }
        catch(ex){
            console.log(ex)
        
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col gap-7 w-full h-full">
            <div className="flex flex-col items-center gap-8 p-10 h-full">
                <div className="w-full">
                    <div className=" rounded-xl border border-gray-300 bg-white shadow-sm">
                        <TextArea
                            className="w-full h-full resize-none"
                            rows={20}
                            placeholder="Please text here"
                            maxLength={MAX_LENGTH}
                            value={present}
                            onChange={(e) => set(e.target.value)}
                        />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">

                    <div className="flex items-center gap-2">
                        <Button icon={<UndoOutlined />} onClick={undo} disabled={!canUndo}>
                            Undo
                        </Button>

                        <Button icon={<RedoOutlined />} onClick={redo} disabled={!canRedo}>
                            Redo
                        </Button>
                    </div>

                    <span className={`font-medium ${present?.length >= MAX_LENGTH ? "text-red-500" : "text-gray-500"}`}>
                        {present?.length || 0}/{MAX_LENGTH} characters
                    </span>

                    </div>

                </div>

                <Button
                    type="primary"
                    size="large"
                    className="w-full py-4 text-lg"
                    disabled={!present?.trim() || present?.length>=MAX_LENGTH}
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Check Grammar
                </Button>
            </div>
        </div>
    );
}

export default InputText