import React, {MouseEventHandler} from 'react';

interface MyCheckBoxProps {
    id: string;
    onClick?: MouseEventHandler<HTMLInputElement>;
    checked?: boolean;
}
const MyCheckBox: React.FC<MyCheckBoxProps> = (props) => {
    const {id, onClick, checked} = props;
    return (
        <input type="checkbox" id={id} onClick={onClick} checked={checked} />
    );
};

export default MyCheckBox;
