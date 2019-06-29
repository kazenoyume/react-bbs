
import React, { Component } from 'react';
import { Comment, List} from 'antd';


export class CommentList extends Component {
    constructor(props){
        super(props);
    };
    render() {
        let { comments } = this.props;
        return (
          <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props => <Comment {...props} />}
        />
        );
    }
}
