
import React, { Component } from 'react';
import { Comment, List , Input ,Tooltip, Skeleton, Popconfirm} from 'antd';

import { MainContext } from '../Main/context'
const { TextArea } = Input;
const contentObject=()=>{
    
}
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
        onmodify=(id,content)=>{
            const { onEdit } = this.context;
            onEdit && onEdit(id)
            this.setState({
                editMsg: content
            })
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
        let { editMsg } = this.state;
        return (
            <Comment id={content.id} 
            author={content.author}
            avatar = {content.avatar}
            content= {(content.onLoading) ?  <Skeleton active={true} /> 
                     : (content.isEdit) ?
                     <div className='Input-field'>
                        <TextArea rows={4} value ={editMsg} onChange={this.onTextChange} />
                        <br></br><a onClick = {this.onsave.bind(this, content.id)}>save</a>
                    </div> :
                    <div  style={{whiteSpace: 'pre-wrap'}}>
                        {content.content.replace('\r','<br/>')}<br/> <a onClick = {this.onmodify.bind(this, content.id,content.content)}>modify</a>
                     </div>}
            datetime={ <div><Tooltip title={content.time}> <span>{content.datetime}</span> </Tooltip><Popconfirm title="Are you sure delete this?"  onConfirm={this.ondelete.bind(this, content.id)} okText="Yes" cancelText="No"> <a>Delete</a> </Popconfirm></div> } 
            time={content.time} 
            ></Comment>
        );

        
    }
}
