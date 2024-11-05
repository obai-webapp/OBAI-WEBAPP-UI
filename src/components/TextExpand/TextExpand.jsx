import { useState } from 'react';

const TextExpand = ({ value }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: expanded ? 'normal' : 'nowrap',
                cursor: 'pointer'
            }}
            onClick={toggleExpand}
        >
            {value}
        </div>
    );
};

export default TextExpand;
