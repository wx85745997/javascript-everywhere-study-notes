import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Buttons';


const Wrapper = styled.div`
    height:100%;
`

const Form = styled.form`
    height:100%;
`

const TextArea = styled.textarea`
    width:100%;
    height:90%;
`

const NoteForm = props => {
    // 设置表单的默认状态
    const [value, setValue] = useState({ content: props.content || '' });

    // 当用户在表单中输入内容时更新状态
    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Wrapper>
            <Form onSubmit={e => {
                e.preventDefault();
                props.action({
                    variables: {
                        ...value
                    }
                })
            }}>
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note content"
                    value={value.content}
                    onChange={onChange}
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    )
}

export default NoteForm;