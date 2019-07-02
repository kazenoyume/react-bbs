import React, { Component } from "react";
import { List } from "antd";

import { CommentObj } from "../CommentObj";
import { AppContext } from "../App/context";
export class CommentList extends Component {
  static contextType = AppContext;
    render() {
        let { comments } = this.props;

        return (
            <List
            dataSource={comments}
            header={`${comments.length} ${
                comments.length > 1 ? "replies" : "reply"
            }`}
            itemLayout="horizontal"
            renderItem={obj => <CommentObj comment={obj} />}
            />
        );
    }
}
