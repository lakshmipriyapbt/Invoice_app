import React from 'react'

const Accounts = () => {
  return (
    <div>
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
        <TopNav/>
        <SideNav/>
        <div className="page-breadcrumb" style={{width:"78%",marginLeft:"280px"}}>
            <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title">Invoices</h4>
                <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                    </nav>
                    
                </div>
                </div>
            </div>
        </div>

        <div className="card" style={{marginLeft:"270px",marginTop:"50px"}}>
            <div className="card-body">
                <h5 className="card-title m-b-0">Static Table With Checkboxes<button type="button" className="btn btn-primary btn-lg" style = {{float:"right"}} >Add Customer</button></h5> 
            </div>
            <div className="table-responsive" style={{display:"flex"}}>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>
                        <label className="customcheckbox m-b-25"style={{marginBottom:"17px"}}>
                        <input type="checkbox" id="mainCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <th scope="col">Invoice Number</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Purcahsing Date</th>
                    <th scope="col">Units</th>
                    <th scope="col">Mail-Id</th>
                    <th scope='col'>Download</th>
                    <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody className="customtable">
                    <tr>
                    <th>
                        <label className="customcheckbox">
                        <input type="checkbox" className="listCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <td>INV0001</td>
                    <td>Internet Explore</td>
                    <td>12/2/2023</td>
                    <td>4</td>
                    <td>example@gmail.com</td>
                    <td><Link><Download size={20}/></Link></td>
                    <td><Link><TrashFill size={20}/> </Link> </td>
                    </tr>
                    <tr>
                    <th>
                        <label className="customcheckbox">
                        <input type="checkbox" className="listCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <td>Trident</td>
                    <td>Internet Explorer 5.0</td>
                    <td>Win 95+</td>
                    <td>5</td>
                    <td>example@gmail.com</td>
                    <td><Link><Download size={20}/></Link></td>
                    <td><Link><TrashFill size={20}/> </Link> </td>
                    </tr>
                    <tr>
                    <th>
                        <label className="customcheckbox">
                        <input type="checkbox" className="listCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <td>Trident</td>
                    <td>Internet Explorer 4.0</td>
                    <td>Win 95+</td>
                    <td>4</td>
                    <td>example@gmail.com</td>
                    <td><Link><Download size={20}/></Link></td>
                    <td><Link><TrashFill size={20}/> </Link> </td>
                    </tr>
                    <tr>
                    <th>
                        <label className="customcheckbox">
                        <input type="checkbox" className="listCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <td>Trident</td>
                    <td>Internet Explorer 5.0</td>
                    <td>Win 95+</td>
                    <td>5</td>
                    <td>example@gmail.com</td>
                    <td><Link><Download size={20}/></Link></td>
                    <td><Link><TrashFill size={20}/> </Link> </td>
                    </tr>
                    <tr>
                    <th>
                        <label className="customcheckbox">
                        <input type="checkbox" className="listCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <td>Trident</td>
                    <td>Internet Explorer 5.5</td>
                    <td>Win 95+</td>
                    <td>5.5</td>
                    <td>example@gmail.com</td>
                    <td> <span className="badge badge-pill badge-primary"><Link><Download size={25} style={{marginLeft:"2px",color:"white"}}/></Link></span></td>
                    <td> <span ><Link><TrashFill size={25} style={{marginLeft:"2px",color:"red"}}/> </Link> </span></td>
                    </tr>
                    <tr>
                    <th>
                        <label className="customcheckbox">
                        <input type="checkbox" className="listCheckbox" />
                        <span className="checkmark" />
                        </label>
                    </th>
                    <td>Trident</td>
                    <td>Internet Explorer 6</td>
                    <td>Win 98+</td>
                    <td>6</td>
                    <td>example@gmail.com</td>
                    <td> <span className="badge badge-pill badge-primary"><Link><Download size={25} style={{paddingLeft:"2px",color:"white"}}/></Link></span></td>
                    <td> <span ><Link><TrashFill size={25} style={{marginLeft:"2px",color:"red"}}/> </Link> </span></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <Footer/>
    </div>
    </div>
  )
}

export default Accounts
{/**const [upload, setUpload] = useState({file:"",});


  const convertBase64=(file)=>{
     return new Promise((resolve,reject)=>{
      const fileReader=new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>{
        resolve(fileReader.result);

      };
      fileReader.onerror=(error)=>{
        reject(error);
      };
     });
  };
  const handleFileChange=async(e)=>{
     const file=e.target.files[0];
     const base64=await convertBase64(file);
     setUpload({...upload, file:base64})
     console.log(upload);
  };
 */}
 {/**
 // ,{
      //   headers: {
      //   'Content-Type': 'multipart/form-data'
      //   }
      // });
 // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   if (key === 'file') {
      //     // For the 'file' field, append file name and file data
      //     formData.append('fileName', fileName);
      //     formData.append('fileData', value[0]);
      //   } else {
      //     // For other fields, append key-value pairs
      //     formData.append(key, value);
      //   }
      // });
*/}