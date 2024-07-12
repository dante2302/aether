import { Component } from "react";
import ErrorPage from "./ErrorPage";
export default class GlobalErrorBoundary extends Component {

  constructor(props){
    super()
    this.state = {
      hasError : false
    }
  }

  static getDerivedStateFromError(error){
    console.log(error)
    return {
      hasError: true
    }
  }


  render(){
    if(this.state.hasError){
      return <ErrorPage />
    }
    return this.props.children
  }
} 