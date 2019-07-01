
import React, { Component } from 'react';
import { Comment, List} from 'antd';

import { CommentObj } from '../CommentObj';
import { AppContext } from '../App/context'
export class CommentList extends Component {
    static contextType = AppContext
    constructor(props){
        super(props);
        
        //const { onPeopleCountChange } = this.context
        //onPeopleCountChange && onPeopleCountChange(this.props.comments.length)
    };
    componentWillMount(){
        const { onPeopleCountChange } = this.context
        onPeopleCountChange && onPeopleCountChange(this.props.comments)
    }

    render() {
        let { comments } = this.props;
            
        return (
          <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={content => <CommentObj content = {content} />}
        />
        );
    }
}
