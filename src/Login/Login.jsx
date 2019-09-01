import React, { useState } from 'react'
import { Form, Input, Button, notification } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import {Cookies} from 'react-cookie';

import styles from './styles/Login.module.scss'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}
const instance = axios.create({
  baseURL : 'localhost:8888',
  timeout: 30000,
  responseType: 'json',
  headers: {
      'Content-Type': 'application/json'
  }
});

const Login = props=>{
  console.log(12345)
  const [loading, setLoading] = useState(false)
  const { getFieldDecorator } = props.form
  const onSubmit = event => {
    const {
      form: { validateFieldsAndScroll },
      history
    } = props
    event.preventDefault()
    setLoading(true)
    validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        setLoading(true)
        return
      }
      setLoading(true)
      await axios.post(`http://localhost:8888/login`)
      .then(res => {
        console.log(res);
        const cookies = new Cookies();
          cookies.set('userID', '1234', { path: '/' });
          setTimeout(() => {
            history.push('/') // = <Redirect to="/" />'
            setLoading(false)
          }, 1000)
      }).catch ((error) =>{
        console.log(error)
      }).finally(()=> {
        
      })
    })
  }
  return (
    <div className={styles.login}>
      <Form
        className={styles.form}
        {...formItemLayout}
        onSubmit={onSubmit}
      >
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                type: 'email',
                message: 'Invalid email format'
              }
            ]
          })(<Input placeholder="Please input your email" />)}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                type: 'string',
                min: 8,
                max: 12,
                message: 'The range of password is between 8 to 12 characters'
              }
            ]
          })(<Input.Password placeholder="Please input your password" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" block htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create({})(Login)