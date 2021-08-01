import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Buttons';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;
const UserForm = props => {
    // 设置表单的默认状态
    const [values, setValues] = useState();

    // 当用户在表单中输入内容时更新状态
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };


    return (
        <Wrapper>
            {/* 显示恰当的标题 */}
            {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            {/* 用户提交表单后执行相应的操作 */}
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                {props.formType === 'signup' && (
                    <React.Fragment>
                        <label htmlFor="username">Username:</label>
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            onChange={onChange}
                        />
                    </React.Fragment>
                )}
                <label htmlFor="emial">Email:</label>
                <input
                    required
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}>
                </input>
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}>
                </input>
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};

export default UserForm;
