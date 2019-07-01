
import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Upload, Icon, Tooltip} from 'antd';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import './styles/Main.css';
import { Editor } from '../Editor';
import { CommentList } from '../CommentList';
import { AppContext } from '../App/context'
import { MainContext } from './context'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const contentObj =(id,author, avatar, content, datetime, time,isEdit)=>{
    return   {
        id:id,
        author: author,
        avatar: avatar,
        content: content,
        datetime: datetime,
        isEdit:isEdit||false,
        time: time
    }
    
}
   


let storage=window.localStorage;
export class Main extends Component {
      static contextType = AppContext
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
                this.state.comments.push(contentObj(obj.id,obj.author,obj.avatar,obj.content,du,obj.time,false))
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
                contentObj(obj.id,obj.author,obj.avatar,obj.content,du,obj.time,obj.isEdit)
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
               contentObj(uuidv1(),this.state.name, this.state.imageUrl,this.state.value,moment().fromNow(),moment().format("YYYY-MM-DD HH:mm:SS"), false),
              ...this.state.comments,
            ],
          });
          storage.setItem('comments',JSON.stringify(this.state.comments))
          const { onPeopleCountChange } = this.context
          onPeopleCountChange && onPeopleCountChange(this.state.comments)
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

      handleDelete = id => {
        let commentList = this.state.comments

        
        let newArray =[]
        this.state.comments.forEach(obj=>{ 
          if(obj.id != id){
            newArray.push(
              obj
            )
          }
          
         
        });
        this.setState({
          comments: newArray,
        });
       
        const { onPeopleCountChange } = this.context
        onPeopleCountChange && onPeopleCountChange(newArray)
      };

      handleEdit = id => {
        let commentList = this.state.comments

        this.state.comments.forEach(obj=>{ 
          if(obj.id == id){
            obj.isEdit =true;
          }else{
            obj.isEdit =false;
          }
        });
        this.setState({
          comments: this.state.comments,
        });

      };

      handleSave = (id,editMsg) => {
        let commentList = this.state.comments

        this.state.comments.forEach(obj=>{ 
          if(obj.id == id){
            obj.content = editMsg;
            obj.isEdit =false;
          }
        });
        this.setState({
          comments: this.state.comments,
        });

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
            <MainContext.Provider
              value={{
                onEdit: this.handleEdit,
                onDelete: this.handleDelete,
                onSave :this.handleSave
              }}
            >
            {comments.length > 0 && <CommentList comments={comments} />}
            </MainContext.Provider>
          </div>
        );
      }
}
