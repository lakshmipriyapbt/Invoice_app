import React,{useState,useEffect} from 'react'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from '../Pages/Footer'
import { Link,useNavigate} from 'react-router-dom'
import {XSquareFill, PencilSquare } from 'react-bootstrap-icons'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { Slide, toast } from 'react-toastify';


const Usersview = () => {
    const [APIData, setAPIData] = useState([]);
    const [filterData,setFilteredData]=useState([])
    const[search,setSearch]=useState('')
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const Navigate=useNavigate();
  const getUser=()=>{
    axios.get("http://122.175.43.71:8001/api/viewusers")
    .then((response) =>{
        console.log(response.data.data);
        setAPIData(response.data.data);
        setFilteredData(response.data.data);
    })
  } 
 useEffect(()=>{
      getUser();
    },[])
    const getData=(id)=>{
        Navigate(`/UserRegistration`,{state:{id}})  //deleteuser/
     }
     const  onDelete=async(id)=> {
      try {
         // Make a DELETE request to the API with the given ID
          await axios.delete('http://122.175.43.71:8001/api/deleteuser/' +id)
         .then((response)=>{
             getUser();
             toast.error(response.data.data, {  //Notification status
              position: 'top-right',
              transition:Slide,
              hideProgressBar:true,
              theme:"colored",
              autoClose: 1000, // Close the toast after 1 seconds
            }); 
          console.log(response);
         console.log(response.data.data);
         })
       } catch (error) {
         // Log any errors that occur
         console.error(error.response);
         if (error.response && error.response.data) {
          console.error('Server Error Message:', error.response.data);
        }
      }
   }
   const paginationComponentOptions={
    noRowsPerPage:true,
 }
    const columns=[
        // {
        //     name:"Sno",
        //     Cell: (row) => {
        //       return <div>{Number(row.row.id) + 1}</div>;
        //     },
        // },
        {
            name:"User-ID",
            selector:(row)=>{
              return(<div className='text-right'>{row.user_id}</div>)
            },
        },
        {
            name:"User Name",
            selector:(row)=>row.username,
        },
        {
            name:"User Email",
            selector:(row)=>{
              return(<div style={{float:"left"}}>{row.email}</div>)
            },
        },
        {
            name:"Role",
            selector:(row)=>{
              return(<div style={{float:"right"}}>{row.role}</div>)
            },
        },
        {
          name:"Status",
          selector:(row)=>{
            return(<div style={{float:"right"}}>{row.status}</div>)
          },
      },
        {
            name:"Action",
            cell:(row)=><div> <button className="btn btn-sm mr-2" style={{backgroundColor:"transparent"}} onClick={()=>getData(row.user_id)}><PencilSquare size={22} color='#2255a4'/></button>
            <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>onDelete(row.user_id)}><XSquareFill size={22} color='#da542e'/></button>
            </div>

        }
    ]
   useEffect(()=>{
    const result=APIData.filter((data)=>{
        return data.username.toLowerCase().match(search.toLowerCase())
      
    });
    setFilteredData(result);
   },[search])
   const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        justifyContent: 'left',
      },
    },
  }
    
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
        <TopNav/>
        <SideNav/>
        <div className="page-breadcrumb" style={{width:"78%",marginLeft:"280px",marginTop:"28px"}}>
            <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title">Users Details</h4>
                <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/main'}>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Users</li>
                    </ol>
                    </nav>
                </div>
                </div>
            </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className="card" style={{marginLeft:"270px",marginTop:"50px"}}>
                <div className="card-body"> 
                     <Link to={'/UserRegistration'}> <button type="button" className="btn btn-primary btn-lg mb-3" style = {{float:"left"}} >Add Users</button> </Link>
                     <input
                    className="form-control col-md-3"
                    style={{border:"1px soild black",borderRadius:"8px",float:"right",marginBottom:"10px" }}
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                    <div className="table-responsive">
                      <DataTable
                      customStyles={tableCustomStyles}
                       columns={columns}
                       data={filterData}
                       pagination
                       paginationComponentOptions={paginationComponentOptions}
                       sortActive={true}
                      />
                  </div>   
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Usersview;
