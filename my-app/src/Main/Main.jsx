
import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Upload, Icon, Tooltip} from 'antd';
import moment from 'moment';

import './styles/Main.css';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
const Editor = ({ onChange,onChangeName, onSubmit, submitting, value, name }) => (
<div className='Input-field'>
    <Form.Item>
    <Input placeholder="enter your name"  onChange={onChangeName} value={name} />
    <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
    </Button>
    </Form.Item>
</div>
);

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
const contentObj =(author, avatar, content, datetime, time)=>{
    console.log(time)
    return   {
        author: author,
        avatar: avatar,
        content: <p>{content}</p>,
        datetime: 
        <Tooltip title={time}>
            <span>{datetime}</span>
        </Tooltip>,
        time: time
    }

}
   


let storage=window.localStorage;
export class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
            name:(storage.name) ? storage.name : 'guest',
            loading: false,
            imageUrl:(storage.imageUrl) ? storage.imageUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        };
        if(storage.comments){
            let comment =JSON.parse(storage.comments)
            comment.forEach(obj=>{
                const du = moment.duration(moment(obj.time) - moment(), 'ms').humanize() + ' ago';
                this.state.comments.push(contentObj(obj.author,obj.avatar,obj.content.props.children,du,obj.time))
            });
        }
        setInterval(this.func,60000);
    };

      func = () =>{
        let comment =JSON.parse(storage.comments)
        let newArray =[];
        comment.forEach(obj=>{ 
            const du = moment.duration(moment(obj.time) - moment(), 'ms').humanize() + ' ago';
            newArray.push(
                contentObj(obj.author,obj.avatar,obj.content.props.children,du,obj.time)
            )
        });
        this.setState({
            comments:newArray
        });
        
    };
      

      handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
        if (!this.state.name) {
            this.setState({
                name: 'guest'
            });
        }
        this.setState({
          submitting: true,
        });
        
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
               contentObj(this.state.name, this.state.imageUrl,this.state.value,moment().fromNow(),moment().format("YYYY-MM-DD HH:mm:SS")),
              ...this.state.comments,
            ],
          });
          storage.comments=JSON.stringify(this.state.comments)
        }, 1000);
        
      };
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };

      handleChangeName = e => {
        storage.name=e.target.value;
        this.setState({
            name: e.target.value,
        });
      };

      handleChangeImg = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>{
            storage.imageUrl=imageUrl;
            this.setState({
                imageUrl,
                loading: false,
              });
          }
            
          );
        }
      };
    
      render() {
        let { comments, submitting, value ,name, imageUrl} = this.state;
        return (
          <div className='Main'>
         
   
              <Comment
              avatar={
                <Upload
                    name="avatar"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5185415ba171ea3a00704eed"
                    onChange={this.handleChangeImg}
                >
                {this.state.loading ? <Icon type='loading'/>:
                <Avatar
                  src={imageUrl}
                  alt="Han Solo"
                />}
                </Upload>
              }
              
              content={
                <Editor  
                  onChange={this.handleChange}
                  onChangeName={this.handleChangeName}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                  name={name}
                />
              }
            />
            {comments.length > 0 && <CommentList comments={comments} />}
            
          </div>
        );
      }
}