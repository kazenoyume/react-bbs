import React, { Component } from "react";
import { Comment, Input, Tooltip, Skeleton, Popconfirm } from "antd";
import moment from "moment";


import { MainContext } from "../Main/context";
const { TextArea } = Input;
export class CommentObj extends Component {
  static contextType = MainContext;
  state = {
    editMsg: "",
  };
  
  ondelete      = id => this.context.onDelete &&  this.context.onDelete(id);
  onmodify      = (id, content) => ((this.context.onEdit &&  this.context.onEdit(id)),(this.setState({ editMsg: content }))));
  onsave        = id => this.context.onSave && this.context.onSave(id, this.state.editMsg);
  onTextChange  = ({target:{value}}) => {this.setState({ editMsg: value });};
  displayTime   = time =>`${moment.duration(moment(time) - moment().unix(), "seconds").humanize()} ago`;

  render() {
    const { comment:{ id, author, avatar, onLoading, isEdit, content, time} } = this.props;
    const { editMsg } = this.state;
    return (
      <Comment
        id={id}
        author={author}
        avatar={avatar}
        content={
          onLoading ? (
            <Skeleton active={true} />
          ) : isEdit ? (
            <div className="Input-field">
              <TextArea rows={4} value={editMsg} onChange={this.onTextChange} />
              <br />
              <a onClick={this.onsave.bind(this, id)}>save</a>
            </div>
          ) : (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {content}
              <br />{" "}
              <a onClick={this.onmodify.bind(this, id, content)} >
                modify
              </a>
            </div>
          )
        }
        datetime={
          <div>
            <Tooltip title={time}>
              <span>{this.displayTime(time)}</span>
            </Tooltip>
            <Popconfirm
              title="Are you sure delete this?"
              onConfirm={this.ondelete.bind(this, id)}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        }
        time={time}
      />
    );
  }
}
