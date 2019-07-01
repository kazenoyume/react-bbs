import React, { Component } from "react";
import { Comment, Input, Tooltip, Skeleton, Popconfirm } from "antd";

import { MainContext } from "../Main/context";
const { TextArea } = Input;

export class CommentObj extends Component {
  static contextType = MainContext;
  state = {
    editMsg: ""
  };

  ondelete = id => {
    const { onDelete } = this.context;
    onDelete && onDelete(id);
  };
  onmodify = (id, content) => {
    const { onEdit } = this.context;
    onEdit && onEdit(id);
    this.setState({
      editMsg: content
    });
  };
  onsave = id => {
    const { onSave } = this.context;
    onSave && onSave(id, this.state.editMsg);
  };
  onTextChange = e => {
    const {
      target: { value }
    } = event;
    this.setState({
      editMsg: value
    });
  };
  render() {
    let { comment } = this.props;
    let { editMsg } = this.state;
    return (
      <Comment
        id={comment.id}
        author={comment.author}
        avatar={comment.avatar}
        content={
          comment.onLoading ? (
            <Skeleton active={true} />
          ) : comment.isEdit ? (
            <div className="Input-field">
              <TextArea rows={4} value={editMsg} onChange={this.onTextChange} />
              <br />
              <a onClick={this.onsave.bind(this, comment.id)}>save</a>
            </div>
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {comment.content}
              <br />{" "}
              <a
                onClick={this.onmodify.bind(this, comment.id, comment.content)}
              >
                modify
              </a>
            </div>
          )
        }
        datetime={
          <div>
            <Tooltip title={comment.time}>
              {" "}
              <span>{comment.datetime}</span>{" "}
            </Tooltip>
            <Popconfirm
              title="Are you sure delete this?"
              onConfirm={this.ondelete.bind(this, comment.id)}
              okText="Yes"
              cancelText="No"
            >
              {" "}
              <a>Delete</a>{" "}
            </Popconfirm>
          </div>
        }
        time={comment.time}
      />
    );
  }
}
