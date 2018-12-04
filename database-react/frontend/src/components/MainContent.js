import React, { Component } from "react";



class MainContent extends Component {
  render() {
    
    
    const allCitizens = this.props.citizens.map((citizen, index) => 
       (
        <tr key={citizen._id} onClick={()=>{this.props.history.push(`/citizens/${citizen._id}`)}}>
          <th scope="col">{index+1}</th>
          <th scope="col" >{citizen.name}</th>
          <th scope="col" >{citizen.cmt}</th>
          <th scope="col" >{citizen.sex}</th>
          <th scope="col" >{citizen.sđt}</th>
          <th scope="col">{citizen.dob}</th>
          <th scope="col" >{citizen.address}</th>
          <th scope="col">{citizen.job}</th>
        </tr>
      )
      // <Citizen citizen={citizen} />
    );
    
    return (

      <div className="container main_content">
        <table className="table table-striped table-bordered table-condensed table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Họ và Tên</th>
              <th scope="col">Chứng Minh Thư</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Ngày Sinh</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Nghề Nghiệp</th>

            </tr>
          </thead>
            
              
          <tbody>
            {allCitizens}
          </tbody>     
          
              
            
        </table>

      </div>


    );
  }
}

export default MainContent;
