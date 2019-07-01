
import React, { Component } from 'react';
import { Comment, List , Input ,Tooltip, Skeleton, Popconfirm} from 'antd';

import { MainContext } from '../Main/context'
const { TextArea } = Input;

export class CommentObj extends Component {
    static contextType = MainContext
    state = {
        editMsg:'',
      }
      
    componentDidMount() {
        // like calling an api
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 3000)
      }

      ondelete =(id)=>{
          const { onDelete } = this.context;
          onDelete && onDelete(id)

      }
        onmodify=(id)=>{

            const { onEdit } = this.context;
            onEdit && onEdit(id)
        }
        onsave=(id)=>{

            const { onSave } = this.context;
            onSave && onSave(id,this.state.editMsg)
        }
        onTextChange =(e)=>{
            const {
                target: { value }
            } = event
            this.setState({
                editMsg: value
            })
        }
    render() {
        let { content } = this.props;
        return (
            <Comment id={content.id} 
            author={content.author}
            avatar = {content.avatar}
            content= {(content.onLoading) ?  <Skeleton active={true} /> 
                     : (content.isEdit) ?
                     <div>
                        <TextArea defaultValue={content.content} autosize onChange={this.onTextChange}  />
                        <br></br><a onClick = {this.onsave.bind(this, content.id)}>save</a>
                    </div> :
                    <div>
                        {content.content}<br></br> <a onClick = {this.onmodify.bind(this, content.id)}>modify</a>
                     </div>}
            datetime={ <div><Tooltip title={content.time}> <span>{content.datetime}</span> </Tooltip><Popconfirm title="Are you sure delete this?"  onConfirm={this.ondelete.bind(this, content.id)} okText="Yes" cancelText="No"> <a>Delete</a> </Popconfirm></div> } 
            time={content.time} 
            ></Comment>
        );

        
    }
}
