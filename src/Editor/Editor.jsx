import React, { Component } from "react";
import { Form, Button, Input } from "antd";

const { TextArea } = Input;

export const Editor =({onChange,onChangeName,onSubmit,submitting, value, name})=>(
  <div className="Input-field">
        <Form.Item>
          <Input
            placeholder="enter your name"
            onChange={onChangeName}
            value={name}
          />
          <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            Add Comment
          </Button>
        </Form.Item>
      </div>
);
