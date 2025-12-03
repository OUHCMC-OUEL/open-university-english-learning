import React from 'react'
import { Collapse } from 'antd';

function TextBox({data}){
    const items = [
        {
            key: '1',
            label: 'Grammar',
            children: <p>{data? data.grammar : "No data"}</p>,
        },
        {
            key: '2',
            label: 'Vocabulary',
            children: <p>{data? data.vocabulary : "No data"}</p>,
        },
        {
            key: '3',
            label: 'Coherence & Cohesion',
            children: <p>{data? data.coh : "No data"}</p>,
        },
//         {
//             key: '4',
//             label: 'Issue',
//             children: <p>{data? data.issues : "No data"}</p>,
//         },
    ];
    return (
        <Collapse className='w-100 h-200' accordion items={items}/>
    );
}

export default TextBox
