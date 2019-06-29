
import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Upload, Icon, Tooltip} from 'antd';
import moment from 'moment';

import './styles/Main.css';
import { Editor } from '../Editor';
import { CommentList } from '../CommentList';


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
            name:(storage.getItem('name')) ? storage.getItem('name') : 'guest',
            loading: false,
            imageUrl:(storage.getItem('imageUrl')) ? storage.getItem('imageUrl'):'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        };
        if(storage.getItem('comments')){
            let comment =JSON.parse(storage.getItem('comments'))
            comment.forEach(obj=>{
                const du = moment.duration(moment(obj.time) - moment(), 'ms').humanize() + ' ago';
                this.state.comments.push(contentObj(obj.author,obj.avatar,obj.content.props.children,du,obj.time))
            });
        }
        setInterval(this.func,60000);
      };

      func = () =>{
        let comment =JSON.parse(storage.getItem('comments'))
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
          storage.setItem('comments',JSON.stringify(this.state.comments))
        }, 1000);
        
      };
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };

      handleChangeName = e => {
        storage.setItem('name',e.target.value)
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
            storage.setItem('imageUrl',imageUrl)
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
