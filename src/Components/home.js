import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import API from '../API';

class Home extends Component {
  constructor(props){
    super(props);
    this.state={topFive:[]}
  }
  componentDidMount(){
    var _this = this
    API.getRequest('/books/top').then(function(data){
      _this.setState({topFive:data});
    })
  }
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500,
      arrows: false,
      useCSS: true,
      dots:true
    };
    return (
      <div>
        <h1>Top sellers</h1>
        <Slider {...settings}>
          {this.state.topFive.map((book,i)=>
            <div key={i}>
              <img style={styles.imgStyle} src={book.imageSrc} onClick={()=>API.changePath("/books/" + book.id,{})}alt="cover" className="book_cover"/>
            </div>)}
        </Slider>
      </div>
    );
  }
}
var styles ={
  imgStyle:{
    width:"65%",
    marginLeft: "auto",
    marginRight: "auto"
  },
}
export default Home;
