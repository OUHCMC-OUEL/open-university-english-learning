import QuestionIcon from './components/Icon';
import Input from './components/DataEntry';
import { Flex } from 'antd'
import { Details, Output } from './components/DataDisplay'
import Button_Start from './components/button';
import { useState, useEffect } from 'react';
import correctWriting from "./services"
// import ThemeProvider from './components/ThemeProvider';

function WritingApp() {

  useEffect(() => {
    document.body.style.backgroundColor = '#edf6f9';
    document.body.style.margin = 0;
  }, []);

  //Xử lý useState nạp dữ liệu 
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handle = async () => {
    setLoading(true);
    setOutput(null);

    try {
      const result = await correctWriting(input);
      setOutput(result)
    }
    catch (err) {
      setOutput({ error: err.message });
    }
    finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div className='flex h-screen flex-row items-center justify-center font-geist'>
        <div className='flex w-[60%] flex-col justify-center p-8'>
          <Flex vertical gap={36}>
            <Input value={input} onChange={setInput} />
            <Button_Start onClick={handle} loading={loading} />
            <Output text={output?.result.output} error={output?.result.error} />
          </Flex>
          {/* <ThemeProvider /> */}
        </div>
        <div className='flex w-[40%] flex-col items-right justify-center p-4'>
          < Details
            vocabulary={output?.result.vocabulary}
            grammar={output?.result.grammar}
            coherence={output?.result.coherence}
          />
        </div>
      </div>
      <QuestionIcon />
    </>
  );
}

export default WritingApp;
