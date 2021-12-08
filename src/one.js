import React,{Component} from "react";
import  axious from "axios";
export default class one extends Component{
    render(){
        return(
            <div>
                one组件
            </div>
        )
    }
    componentDidMount(){
        axious.get('/data').then(res=>{
            console.log(res.data)
        })
    }
    // axious.then()
}