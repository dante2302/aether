
import { Component } from "react";
import UilRefresh from '@iconscout/react-unicons/icons/uil-refresh'

import styles from './styles/GlobalErrorBoundary.module.css'
export default class GlobalErrorBoundary extends Component {

  constructor(props){
    super()
    this.state = {
      hasError : false
    }
  }

  static getDerivedStateFromError(error){
    return {
      hasError: true
    }
  }


  render(){
    if(this.state.hasError){
      return (
        <div className={styles['container']}>
          <img src='/images/went_wrong.svg' />
          <h1> Something went wrong...</h1>
          <h3>We are working on fixing the problem.</h3>
          <a href="/"><UilRefresh size={15}/> Refresh Page</a>
        </div>
      )
    }
    return this.props.children
  }
  
} 
