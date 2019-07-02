import React, { Component } from "react";
import { Form, Button, Input } from "antd";

const { TextArea } = Input;
export class Editor extends Component {
  handleChange = e =>  this.props.onChange(e);
  handleChangeName = e => this.props.onChangeName(e);
  handleSubmit = e => this.props.onSubmit(e);
  render() {
    const { submitting, value, name } = this.props;
    return (
      <div className="Input-field">
        <Form.Item>
          <Input
            placeholder="enter your name"
            onChange={this.handleChangeName}
            value={name}
          />
          <TextArea rows={4} onChange={this.handleChange} value={value} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={this.handleSubmit}
            type="primary"
          >
            Add Comment
          </Button>
        </Form.Item>
      </div>
    );
  }
}
