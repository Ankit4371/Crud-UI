import React from 'react';
import empService from '../service/emp.service';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function EmployeesTable() {

  const [empList, setEmpList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(11);

  useEffect(() => {
    init();
  }, []);


  const init = () => {
    empService.getAllEmployeesByPage(currentPage, pageSize).then((res) => {
      console.log(res.data.content);
      setEmpList(res.data.content);
      setTotalPages(res.data.totalPages);
      setPageSize(res.data.size);
    })
      .catch((error) => {
        console.log(error);
      });
  }
  const [msg, setMsg] = useState("");

  const deleteEmp = (id) => {
    empService.delete(id).then((res) => {
      setMsg("deleted");
      init();
    }).catch((error) => {
      console.log(error);
    })
  };
  // pagination
  const firstPage = () => {
    let firstPage = 0;
    if (currentPage > 0) {
      empService.getAllEmployeesByPage(firstPage, pageSize).then((res) => {
        setEmpList(res.data.content);
        setCurrentPage(firstPage);
      }).catch((error) => {
        console.log(error);
      })
    }
  };
  const nextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage < totalPages) {
      empService.getAllEmployeesByPage(nextPage, pageSize).then((res) => {
        setEmpList(res.data.content);
        setCurrentPage(nextPage);
        console.log(nextPage);
      }).catch((error) => {
        console.log(error);
      })
    }
  };
  const prevPage = () => {
    let prevPage = currentPage - 1;
    if (currentPage > 0) {
      empService.getAllEmployeesByPage(prevPage, pageSize).then((res) => {
        setEmpList(res.data.content);
        setCurrentPage(prevPage);
      }).catch((error) => {
        console.log(error);
      })
    }
  };

  const lastPage = () => {
    let lastPage = totalPages - 1;
    if (currentPage < lastPage) {
      empService.getAllEmployeesByPage(lastPage, pageSize).then((res) => {
        setEmpList(res.data.content);
        setCurrentPage(lastPage);
      }).catch((error) => {
        console.log(error);
      })
    }
  };

  const changePageSize = (e) => {
    if (isNaN(e.target.value)) {
      setPageSize(11);
      return;
    }
    let size = Number(e.target.value);
    if (size == 0) return;
    setPageSize(size);
    empService.getAllEmployeesByPage(currentPage, size).then((res) => {
      setEmpList(res.data.content);
      setCurrentPage(0);
      setTotalPages(res.data.totalPages);
    }).catch((error) => {
      console.log(error);
    })
  };
  const goToPage = (e) => {
    let pageNo = Number(e.target.value) - 1;
    if (pageNo >= totalPages ){
      setCurrentPage(currentPage);
      return;
    }
    empService.getAllEmployeesByPage(pageNo, pageSize).then((res) => {
      setEmpList(res.data.content);
      setCurrentPage(pageNo);
    }).catch((error) => {
      console.log(error);
    })
  };
  return (
    <div className='container mt-5'>


      <div className="input-group ">
        <span className="input-group-text" id="addon-wrapping">Custom PageSize</span>
        <input type="text" onChange={(e) => changePageSize(e)} value={pageSize} className="form-control" placeholder="Custom PageSize" aria-label="Custom PageSize" aria-describedby="addon-wrapping" />
        <span className="input-group-text" id="addon-wrapping">Go To Page No.</span>
        <input type="text" onChange={(e) => goToPage(e)} value={currentPage + 1} className="form-control" placeholder="Go to Page" aria-label="Go to Page" aria-describedby="addon-wrapping" />
      </div>
      <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th className="th-sm" scope="col">Employee ID</th>
            <th className="th-sm" scope="col">FirstName</th>
            <th className="th-sm" scope="col">LastName</th>
            <th className="th-sm" scope="col">Email Address</th>
            <th className="th-sm" scope="col">Actions</th>

          </tr>
        </thead>
        <tbody>
          {empList.map((e, num) => (
            <tr>
              <th scope="row">{e.id}</th>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.emailId}</td>
              <td>
                <Link to={"/editEmp/" + e.id} className="btn btn-sm btn-primary">Edit</Link>
                <a onClick={() => deleteEmp(e.id)} className="btn btn-sm btn-danger ms-2">Delete</a>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <p>Showing Page {currentPage + 1} of {totalPages}</p>


      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center" >
          <li className="page-item"><span className="page-link" onClick={() => firstPage()} >First</span></li>
          <li className="page-item"><span className="page-link" onClick={() => prevPage()} >Previous</span></li>
          <li className="page-item"><span className="page-link" onClick={() => nextPage()} >Next</span></li>
          <li className="page-item"><span className="page-link" onClick={() => lastPage()} >Last</span></li>
        </ul>
      </nav>

      {msg && <div class="alert alert-danger" role="alert">
        {msg}
      </div>}

    </div>
  )
}

export default EmployeesTable